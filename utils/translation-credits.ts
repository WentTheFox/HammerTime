import { config as dotenvConfig } from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import localeConfig from '../public/locales/config.json';
import { AvailableLanguage, LANGUAGES, LatestLanguageConfigType } from '../src/config';
import { IndexedReportData, ReportUserData } from '../src/util/crowdin';
import { getTranslatorIds, normalizeCredit, NormalizedCredits } from '../src/util/translation';
import { ProjectData, ProjectListResponse, ProjectReportDataResponse, ProjectTranslationProgressResponse } from './crowdin-api-types';
import { crowdinApiRequest } from './helpers/crowdin-api-request';
import { getCrowdinReportData } from './helpers/get-crowdin-report-data';
import { mapCrowdinLanguageToAvailableLanguage } from './helpers/map-crowdin-language-to-available-language';
import { migrateLanguageConfig } from './helpers/migrate-language-config';

dotenvConfig();

const markerString = '### Credits';
const readmeFolder = path.join(__dirname, '..');
const readmePath = path.join(readmeFolder, 'README.md');
const REMOVED_USER_USERNAME = 'REMOVED_USER';

const mapCreditToString = (credit: NormalizedCredits) => {
  const escapedDisplayName = credit.displayName.replace(/(^_|_$|_\s)/g, '\\$1');
  return `[${escapedDisplayName}](${credit.url})`;
};

/* eslint-disable no-console */

void (async () => {
  const crowdinApiKey = process.env.CROWDIN_API_KEY as string;
  if (!crowdinApiKey) {
    console.warn('Missing Crowdin API key, skipping translation credits generation.');
    return;
  }

  const crowdinProjectIdentifier = process.env.CROWDIN_PROJECT_IDENTIFIER;
  if (!crowdinProjectIdentifier) {
    console.warn('Missing Crowdin project identifier, skipping translation credits generation.');
    return;
  }

  const crowdinDeveloperId = process.env.CROWDIN_DEVELOPER_ID;
  if (crowdinDeveloperId) {
    console.info(`Crowdin ID for site developer is set, user ${crowdinDeveloperId} will be excluded from reports`);
  }

  console.info('Reading README file…');
  const readmeText = await fs.readFile(readmePath, 'utf8');

  console.info('Finding marker text…');
  const markerIndex = readmeText.indexOf(markerString);
  if (markerIndex === -1) {
    throw new Error(`Marker "${markerString}" not found in ${readmePath}`);
  }
  const readmeTextBeforeMarker = readmeText.substring(0, markerIndex);

  const rawReportDataCachePath = path.join(readmeFolder, 'crowdin_report.json5');
  const useCache = process.env.CROWDIN_REPORT_CACHE === 'true';
  const cacheDurationHours = 1;

  const cachedDataExists = useCache
    ? await fs
        .stat(rawReportDataCachePath)
        .then((stats) => {
          const cacheExpiresAtMs = stats.mtimeMs + cacheDurationHours * 60 * 60e3;
          const currentTimeMs = new Date().getTime();
          const cacheValid = currentTimeMs < cacheExpiresAtMs;
          if (cacheValid) {
            const cacheExpiresInMs = cacheExpiresAtMs - currentTimeMs;
            console.info(`Cache expires in ${Math.round(cacheExpiresInMs / 1000)}s`);
          } else {
            const cacheExpiredAgoMs = currentTimeMs - cacheExpiresAtMs;
            console.info(`Cache expired ${Math.round(cacheExpiredAgoMs / 1000)}s ago and will be refreshed`);
          }
          return cacheValid;
        })
        .catch((e) => {
          if (e instanceof Error && e.message.includes('ENOENT')) {
            console.info(`Cache file ${rawReportDataCachePath} missing and will be generated`);
          } else {
            console.warn(`Failed to access cache at ${rawReportDataCachePath}`);
            console.warn(e);
          }
          return false;
        })
    : false;

  console.info('Getting project information from Crowdin…');
  const projectList = await fetch('https://api.crowdin.com/api/v2/projects?hasManagerAccess=1', {
    headers: {
      Authorization: `Bearer ${crowdinApiKey}`,
    },
  }).then((r) => r.json() as Promise<ProjectListResponse>);

  const projectIdentifierToIdMap = (projectList.data as ProjectData[]).reduce(
    (acc: Record<string, { id: number }>, p) => ({
      ...acc,
      [p.data.identifier]: { id: p.data.id },
    }),
    {},
  );

  console.info(`Found projects:`);
  console.table(projectIdentifierToIdMap);

  console.info(`Checking for project with identifier ${crowdinProjectIdentifier}…`);
  const crowdinProjectInfo = projectIdentifierToIdMap[crowdinProjectIdentifier];
  if (!crowdinProjectInfo) {
    throw new Error(`Could not find Crowdin project with identifier "${crowdinProjectIdentifier}"`);
  }

  const crowdinProjectId = crowdinProjectInfo.id;
  const rawReportData: ProjectReportDataResponse = await getCrowdinReportData({
    crowdinApiKey,
    cachedDataExists,
    useCache,
    crowdinProjectId,
    rawReportDataCachePath,
  });

  console.info(`Reading translation progress for project ${crowdinProjectIdentifier}…`);
  const translationProgressResponse = await crowdinApiRequest<ProjectTranslationProgressResponse>({
    // Multiplier accounts for languages which have not been set up for use in the app yet
    path: `/projects/${crowdinProjectId}/languages/progress?limit=${Math.ceil(Object.keys(LANGUAGES).length * 1.25)}`,
    crowdinApiKey,
  });

  console.info(`Creating assembled report data…`);
  const indexedReportData: IndexedReportData = {
    users: {},
    languages: {},
  };
  translationProgressResponse.data.sort((a, b) => a.data.languageId.localeCompare(b.data.languageId));
  translationProgressResponse.data.forEach(({ data: languageProgress }) => {
    const availableLanguageCode = mapCrowdinLanguageToAvailableLanguage(languageProgress.language);
    if (!availableLanguageCode) {
      return;
    }
    indexedReportData.languages[availableLanguageCode] = {
      translatorIds: [],
      progress: {
        approval: languageProgress.approvalProgress,
        translation: languageProgress.translationProgress,
      },
    };
  });
  rawReportData.data.forEach((reportDataItem) => {
    if (
      reportDataItem.user.username === REMOVED_USER_USERNAME ||
      (reportDataItem.winning === 0 && reportDataItem.translated === 0 && reportDataItem.voted === 0)
    ) {
      // Skip removed users & users with no activity
      return;
    }
    if (reportDataItem.user.id === crowdinDeveloperId) {
      // Skip developer
      return;
    }
    const id = parseInt(reportDataItem.user.id, 10);
    const username = reportDataItem.user.username;
    let fullName = reportDataItem.user.fullName;
    if (fullName === username) {
      fullName = '';
    } else {
      const usernameSuffix = ` (${username})`;
      if (fullName.endsWith(usernameSuffix)) {
        // Removing username at the end of the full name
        fullName = fullName.substring(0, fullName.length - usernameSuffix.length);
      }
    }
    const reportUserData: ReportUserData = {
      username,
      avatarUrl: reportDataItem.user.avatarUrl,
    };
    if (fullName) {
      reportUserData.fullName = fullName;
    }
    if (reportDataItem.languages.length > 0) {
      const userLanguages = reportDataItem.languages.reduce((acc: AvailableLanguage[], language) => {
        const mappedLanguage = mapCrowdinLanguageToAvailableLanguage(language);
        if (!mappedLanguage) {
          return acc;
        }
        return [...acc, mappedLanguage];
      }, []);

      userLanguages.forEach((langCode) => {
        const existingIds = indexedReportData.languages[langCode]?.translatorIds || [];
        if (!existingIds) {
          console.warn(`No existing translator IDs found for language ${langCode} at user ${username} (id: ${id})`);
          return;
        }
        if (!indexedReportData.languages[langCode]) {
          console.warn(`No indexed report data found for language ${langCode} at user ${username} (id: ${id})`);
          return;
        }
        indexedReportData.languages[langCode]!.translatorIds = Array.from(new Set([...existingIds, String(id)]));
      });
    }

    indexedReportData.users[id] = reportUserData;
  });
  const assembledReportDataOutputPath = path.join(readmeFolder, 'public', 'locales', 'crowdin.json');
  console.info(`Writing assembled report data to ${assembledReportDataOutputPath}…`);
  const assembledReportDataString = JSON.stringify(indexedReportData, null, 2);
  await fs.writeFile(assembledReportDataOutputPath, assembledReportDataString);

  await migrateLanguageConfig(readmeFolder);

  console.info('Generating credits text…');
  const creditsText = [markerString, ''];
  const sortedConfigs = (Object.entries(localeConfig.languages) as [AvailableLanguage, LatestLanguageConfigType][]).sort(
    ([, { name: c1Name }], [, { name: c2Name }]) => c1Name.localeCompare(c2Name),
  );
  sortedConfigs.forEach(([locale, config]) => {
    const localeReportData = indexedReportData.languages[locale];
    const languageString = `- ${config.emoji ? `${config.emoji} ` : ''}${config.name}`;
    const translatorIds = getTranslatorIds(config, localeReportData);
    if (translatorIds.length > 0) {
      const sortedCredits = translatorIds
        .map((crowdinId) => normalizeCredit(crowdinId, config.creditOverrides, indexedReportData))
        .filter((credit): credit is NormalizedCredits => credit !== null)
        .sort((cr1, cr2) => cr1.displayName.localeCompare(cr2.displayName));
      const creditCount = sortedCredits.length;
      switch (creditCount) {
        case 0:
          // No credits, omit language from README (primarily for included languages)
          break;
        case 1:
          creditsText.push(`${languageString}: ${mapCreditToString(sortedCredits[0])}`);
          break;
        default: {
          creditsText.push(languageString);

          sortedCredits.forEach((credit) => {
            creditsText.push(`  - ${mapCreditToString(credit)}`);
          });
        }
      }
    }
  });
  const finalReadme = `${readmeTextBeforeMarker + creditsText.join('\n')}\n`;

  console.info('Writing updated README file…');
  await fs.writeFile(readmePath, finalReadme, 'utf8');

  console.info('README file updated');
})();
