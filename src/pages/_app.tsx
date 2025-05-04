import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterTransition } from 'components/app/RouterTransition';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { SITE_TITLE } from 'src/config';
import 'src/fontawesome';
import { assembleSeoUrl, canonicalUrlForLanguage, getDirAttribute, useLocale } from 'src/util/common';
import { getEmotionCache, themeOverride } from 'src/util/styling';
import '../app.scss';
import '../dayjs';
import '../moment-locales';

const App: AppComponent = ({ Component, pageProps }) => {
  const { asPath, defaultLocale, locale, locales } = useRouter();

  const canonicalUrl = useMemo(() => canonicalUrlForLanguage(asPath, locale, defaultLocale), [asPath, defaultLocale, locale]);
  const languageAlternates = useMemo(
    () => [
      ...(locales?.map((hrefLang) => ({
        hrefLang,
        href: canonicalUrlForLanguage(asPath, hrefLang, defaultLocale),
      })) ?? []),
      {
        hrefLang: 'x-default',
        href: canonicalUrlForLanguage(asPath, defaultLocale, defaultLocale),
      },
    ],
    [asPath, defaultLocale, locales],
  );

  const { t } = useTranslation();

  const ltrOptions = useMemo(() => {
    const dir = getDirAttribute(locale);
    const emotionCache = getEmotionCache(dir);
    return {
      dir,
      emotionCache,
    };
  }, [locale]);
  useEffect(() => {
    document.documentElement.setAttribute('dir', ltrOptions.dir);
  }, [ltrOptions.dir]);

  const momentLocale = useLocale(locale);

  const theme = useMemo(() => ({ dir: ltrOptions.dir, ...themeOverride }), [ltrOptions.dir]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{SITE_TITLE}</title>
      </Head>
      <DefaultSeo
        title={SITE_TITLE}
        description={t('common:seoDescription') ?? undefined}
        openGraph={{
          type: 'website',
          locale,
          site_name: SITE_TITLE,
          url: assembleSeoUrl(asPath),
          images: [
            {
              alt: '<t:1626299131:R> ⬇ 5 hours ago',
              url: assembleSeoUrl(`/social/preview/${momentLocale}.png`),
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@WentTheFox',
        }}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'discord,chat,formatting,timestamps,date,markdown',
          },
        ]}
      />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme} emotionCache={ltrOptions.emotionCache}>
        <RouterTransition />
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
