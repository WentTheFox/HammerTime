import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { RouterTransition } from 'components/app/RouterTransition';
import { AppSeo } from 'components/AppSeo';
import { NextIntlClientProvider } from 'next-intl';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { SITE_TITLE } from 'src/config';
import 'src/fontawesome';
import { getDirAttribute } from 'src/util/common';
import { getEmotionCache, themeOverride } from 'src/util/styling';
import '../app.scss';
import '../dayjs';
import '../moment-locales';

const App: AppComponent = ({ Component, pageProps }) => {
  const { locale } = useRouter();

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

  const theme = useMemo(() => ({ dir: ltrOptions.dir, ...themeOverride }), [ltrOptions.dir]);

  return (
    <NextIntlClientProvider locale={locale} messages={(pageProps as Record<string, never>).messages}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{SITE_TITLE}</title>
      </Head>
      <AppSeo />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme} emotionCache={ltrOptions.emotionCache}>
        <RouterTransition />
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </NextIntlClientProvider>
  );
};

export default App;
