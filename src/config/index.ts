import { LanguageConfigV2 } from 'src/model/language-config';
import localeConfig from '../../public/locales/config.json';

export const SITE_TITLE = 'HammerTime';
export const CANONICAL_URL = 'https://hammertime.cyou';
export const REPOSITORY_URL = 'https://github.com/WentTheFox/HammerTime';
export const CROWDIN_URL = 'https://crowdin.com/project/hammertime';
export const FONTAWESOME_FREE_LICENSE_URL = 'https://fontawesome.com/license/free';
export const DEVELOPER_NAME = 'WentTheFox';
export const DEVELOPER_URL = 'https://went.tf';
export const DEVELOPER_AVATAR_URL = 'https://gravatar.com/avatar/f341ebe7cfc73b35ff4ec66897b5c30d?size=64';
export const MANTINE_URL = 'https://mantine.dev';

export const IS_CLIENT_SIDE = typeof window !== 'undefined';

export type AvailableLanguage = keyof typeof localeConfig.languages;

export type LatestLanguageConfigType = LanguageConfigV2;

type LanguagesConfig = Record<AvailableLanguage, LatestLanguageConfigType>;

export const LANGUAGES: LanguagesConfig = localeConfig.languages;

export const DEFAULT_I18N_NAMESPACES = ['common'];

export const isAvailableLanguage = (language: string): language is AvailableLanguage => language in LANGUAGES;

const DEV_MODE = process.env.NODE_ENV === 'development';

export const CSP_HEADER = [
  `default-src 'self'`,
  `script-src ${DEV_MODE ? `* 'unsafe-inline' 'unsafe-hashes' ` : ''}'self' 'unsafe-eval'`,
  `style-src 'self' 'unsafe-inline' fonts.googleapis.com`,
  `img-src 'self' data: cdn.jsdelivr.net crowdin-static.downloads.crowdin.com crowdin-static.cf-downloads.crowdin.com avatars.githubusercontent.com gravatar.com`,
  'font-src fonts.gstatic.com',
  `connect-src 'self' vitals.vercel-insights.com',
  'media-src 'self'`,
  `object-src 'none'`,
  `child-src 'none'`,
  `frame-src 'none'`,
  `worker-src 'self'`,
  `form-action 'none'`,
  DEV_MODE ? null : `upgrade-insecure-requests`,
  `block-all-mixed-content`,
]
  .filter(Boolean)
  .join('; ');
