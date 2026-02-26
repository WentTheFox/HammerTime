import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Aside, Flex, Navbar, ScrollArea, Space, Text, Title } from '@mantine/core';
import { ExternalLink } from 'components/ExternalLink';
import { LanguageSelector } from 'components/i18n/LanguageSelector';
import { InputSettings } from 'components/InputSettings';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { REPOSITORY_URL } from 'src/config';
import { DeveloperCredit } from 'components/app/DeveloperCredit';
import { ExternalLibrariesCredit } from 'components/app/ExternalLibrariesCredit';
import { TranslatorCredit } from 'components/app/TranslatorCredit';
import styles from 'modules/AppSidebar.module.scss';

export const AppSidebar: FC<{ opened: boolean; Component: typeof Aside | typeof Navbar }> = ({ opened, Component }) => {
  const t = useTranslations();
  return (
    <Component
      p="md"
      hiddenBreakpoint="md"
      hidden={!opened}
      width={{
        md: 300,
        xl: 400,
      }}
    >
      <Component.Section grow component={ScrollArea} mx="-xs" px="xs" pb="md">
        <Title align="center" order={3} mb={10}>
          <FontAwesomeIcon icon="cog" /> {t('input.settings.label')}
        </Title>

        <InputSettings />
        <Space h="md" />
        <Title align="center" order={3} mb={10}>
          <FontAwesomeIcon icon="info" fixedWidth /> {t('credits.title')}
        </Title>
        <Flex wrap="nowrap">
          <Text mb="sm">
            <FontAwesomeIcon icon="user" className={styles['text-icon']} />
          </Text>
          <Text mb="sm" transform="uppercase">
            {/* eslint-disable-next-line @typescript-eslint/naming-convention,react/no-unstable-nested-components */}
            {t.rich('credits.developedBy', { one: () => <DeveloperCredit /> })}
          </Text>
        </Flex>
        <Flex wrap="nowrap">
          <Text mb="sm">
            <FontAwesomeIcon icon="code" className={styles['text-icon']} />
          </Text>
          <Text mb="sm" transform="uppercase">
            {/* eslint-disable-next-line react/no-unstable-nested-components,@typescript-eslint/naming-convention */}
            {t.rich('credits.externalLibraries', { one: () => <ExternalLibrariesCredit /> })}
          </Text>
        </Flex>
        <TranslatorCredit />
        <Text mb="sm" color="#3da639" transform="uppercase">
          <FontAwesomeIcon icon={['fab', 'osi']} className={styles['text-icon']} />
          {t('credits.openSource')}
        </Text>
        <Text mb="sm" transform="uppercase">
          <ExternalLink href={REPOSITORY_URL}>
            <FontAwesomeIcon icon={['fab', 'github']} className={styles['text-icon']} />
            {t('viewSource')}
          </ExternalLink>
        </Text>
        <Text size="sm">
          <FontAwesomeIcon icon="ban" className={styles['text-icon']} />
          {t('notAffiliated')}
        </Text>
      </Component.Section>
      <Component.Section>
        <LanguageSelector />
      </Component.Section>
    </Component>
  );
};
