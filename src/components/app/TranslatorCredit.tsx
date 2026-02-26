import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { AvailableLanguage, LANGUAGES } from 'src/config';
import { getTranslatorIds, normalizeCredit, NormalizedCredits } from 'src/util/translation';
import { TranslationCredits } from 'components/i18n/TranslationCredits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'modules/AppSidebar.module.scss';
import { Flex, Text } from '@mantine/core';
import { reportData } from 'src/util/crowdin';

export const TranslatorCredit: FC = () => {
  const t = useTranslations();
  const { locale: language } = useRouter();

  const currentLocaleConfig = useMemo(
    () => (language && language in LANGUAGES ? LANGUAGES[language as AvailableLanguage] : undefined),
    [language],
  );
  const currentLocaleReportData = useMemo(
    () => (language && language in reportData.languages ? reportData.languages[language] : undefined),
    [language],
  );
  const translatorIds = useMemo(
    () => getTranslatorIds(currentLocaleConfig, currentLocaleReportData),
    [currentLocaleConfig, currentLocaleReportData],
  );

  const translationCredits = useMemo(
    () =>
      translatorIds.length === 0
        ? []
        : translatorIds
            .map((crowdinId) => normalizeCredit(crowdinId, currentLocaleConfig?.creditOverrides, reportData))
            .filter((credit): credit is NormalizedCredits => credit !== null)
            .sort((cr1, cr2) => cr1.displayName.localeCompare(cr2.displayName)),
    [currentLocaleConfig?.creditOverrides, translatorIds],
  );

  if (translationCredits.length === 0) return null;

  return (
    <Flex wrap="nowrap">
      <Text mb="sm">
        <FontAwesomeIcon icon="language" className={styles['text-icon']} />
      </Text>
      <Text mb="sm" transform="uppercase">
        {/* eslint-disable-next-line @typescript-eslint/naming-convention,react/no-unstable-nested-components */}
        {t.rich('credits.translationsBy', { one: () => <TranslationCredits credits={translationCredits} /> })}
      </Text>
    </Flex>
  );
};
