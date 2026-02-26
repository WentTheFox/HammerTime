import vercelConfig from './vercel.json' with { type: 'json' };
import localesConfig from './public/locales/config.json' with { type: 'json' };

/**
 * @type {import('next').NextConfig}
 */
export default {
  i18n: {
    locales: Object.keys(localesConfig.languages),
    defaultLocale: 'en',
  },
  redirects: async () => vercelConfig.redirects,
};
