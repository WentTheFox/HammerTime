import moment from 'moment-timezone';
import { useTranslations } from 'next-intl';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { SITE_TITLE } from 'src/config';
import { assembleSeoUrl, canonicalUrlForLanguage, getDirAttribute, useLocale } from 'src/util/common';
import { getEmotionCache } from 'src/util/styling';

const appCreationTimestamp = 1626299131;

export const AppSeo = () => {
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

  const t = useTranslations();

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

  return (
    <DefaultSeo
      title={SITE_TITLE}
      description={t('seoDescription') ?? undefined}
      openGraph={{
        type: 'website',
        locale,
        site_name: SITE_TITLE,
        url: assembleSeoUrl(asPath),
        images: [
          {
            alt: `<t:${appCreationTimestamp}:R> ⬇ ${moment.unix(appCreationTimestamp).locale(momentLocale).fromNow()}`,
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
  );
};
