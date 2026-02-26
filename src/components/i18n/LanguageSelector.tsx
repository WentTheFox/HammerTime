import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Group, Popover, Progress, rem, Text, useMantineTheme } from '@mantine/core';
import { LanguageFlag } from 'components/i18n/LanguageFlag';
import { UnfinishedTranslationsLink } from 'components/i18n/UnfinishedTranslationsLink';
import toPairs from 'lodash/toPairs';
import styles from 'modules/LanguageSelector.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import { AvailableLanguage, LANGUAGES } from 'src/config';
import { getDirAttribute } from 'src/util/common';
import { getIsTranslationComplete, getTranslationCompletePercent, getTranslationCompletionData } from 'src/util/crowdin';

const flagIconSize = 32;
const noTranslationsNeededLocales = new Set(['en', 'en-GB', 'hu']);

export const LanguageSelector: FC = () => {
  const router = useRouter();
  const language = router.locale;
  const t = useTranslations();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const toggleOpened = useCallback(() => {
    setOpened((o) => !o);
  }, []);
  const sortedLanguages = useMemo(() => toPairs(LANGUAGES).sort(([, a], [, b]) => a.nativeName.localeCompare(b.nativeName)), []);

  const currentLanguage = useMemo(
    () => (language && language in LANGUAGES ? LANGUAGES[language as AvailableLanguage] : undefined),
    [language],
  );

  const completionData = getTranslationCompletionData(language);
  const languagePercent = getTranslationCompletePercent(completionData);
  const isTranslationComplete = getIsTranslationComplete(languagePercent);
  const crowdinLocale = currentLanguage?.crowdinLocale || language || '';
  const isTranslationNeeded = !noTranslationsNeededLocales.has(crowdinLocale);

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <Group>
        <Box sx={{ flex: 1 }}>
          <Group>
            {currentLanguage ? (
              <LanguageFlag language={currentLanguage} size={flagIconSize} />
            ) : (
              <FontAwesomeIcon icon="globe" fontSize={flagIconSize} />
            )}
            <Text weight="bold" size="lg">
              {currentLanguage?.nativeName}
            </Text>
          </Group>
          {!isTranslationComplete && isTranslationNeeded && (
            <>
              <Text color="#6dc271">{t('credits.incompleteTranslations')}</Text>
              <Progress color="#6dc271" value={languagePercent} radius="xs" />
            </>
          )}
        </Box>
      </Group>
      <Popover opened={opened} onClose={() => setOpened(false)} position="top" withArrow shadow="xl" width="target">
        <Popover.Target>
          <Group mt="sm" sx={{ justifyContent: 'space-between' }}>
            <Button
              variant="subtle"
              size="sm"
              onClick={toggleOpened}
              rightIcon={<FontAwesomeIcon icon={opened ? 'caret-down' : 'caret-up'} />}
              sx={{ flex: 1 }}
            >
              <Text>{t('changeLanguage')}</Text>
            </Button>
            {isTranslationNeeded && <UnfinishedTranslationsLink percent={languagePercent} crowdinLocale={crowdinLocale} />}
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <div className={styles['language-selector']}>
            {sortedLanguages.map(([key, value]) => {
              const isCurrentLanguage = language === key;
              const languageCompletionData = getTranslationCompletionData(key);
              const dropdownItemJsx = (
                <Button
                  key={isCurrentLanguage ? key : undefined}
                  variant="subtle"
                  className={styles.item}
                  dir={getDirAttribute(key as AvailableLanguage)}
                  leftIcon={<LanguageFlag language={value} />}
                  rightIcon={
                    !getIsTranslationComplete(languageCompletionData) && !noTranslationsNeededLocales.has(key) ? (
                      <Text color="green">
                        <FontAwesomeIcon icon="life-ring" />
                      </Text>
                    ) : undefined
                  }
                  disabled={isCurrentLanguage}
                >
                  <span className={styles['native-name']}>{value.nativeName}</span>
                </Button>
              );
              return (
                <Link
                  key={key}
                  href={{
                    pathname: router.pathname,
                    query: router.query,
                  }}
                  locale={key}
                  passHref
                  shallow={false}
                  className={styles.itemLink}
                  aria-current={isCurrentLanguage ? 'true' : undefined}
                >
                  {dropdownItemJsx}
                </Link>
              );
            })}
          </div>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};
