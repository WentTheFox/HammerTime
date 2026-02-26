import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, AppShell, Aside, Burger, Center, Header, MediaQuery, Navbar, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AppSidebar } from 'components/app/AppSidebar';
import { useLocalSettings } from 'components/contexts/LocalSettingsProvider';
import { CustomIcon } from 'components/CustomIcon';
import styles from 'modules/AppContainer.module.scss';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC, PropsWithChildren, useCallback, useState } from 'react';
import { SITE_TITLE } from 'src/config';

const headerHeight = 52;
const toggleButtonSpacing = 8;

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();
  const theme = useMantineTheme();
  const { sidebarOnRight, sidebarOffDesktop, toggleSidebarOnRight, toggleSidebarOffDesktop } = useLocalSettings();
  const [opened, setOpened] = useState(false);
  const toggleOpen = useCallback(() => setOpened((o) => !o), []);
  const effectiveSidebarOnRight = theme.dir === 'rtl' ? !sidebarOnRight : sidebarOnRight;
  const aboveMdMediaQuery = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const forceHideSidebar = !!sidebarOffDesktop && aboveMdMediaQuery;
  return (
    <AppShell
      padding="md"
      header={
        <Header fixed height={headerHeight} p="xs">
          <Burger
            opened={aboveMdMediaQuery ? !sidebarOffDesktop : opened}
            onClick={aboveMdMediaQuery ? toggleSidebarOffDesktop : toggleOpen}
            size="sm"
            color={theme.colors.gray[6]}
            pos="absolute"
            left={sidebarOnRight ? undefined : toggleButtonSpacing}
            right={sidebarOnRight ? toggleButtonSpacing : undefined}
          />
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <UnstyledButton
              pos="absolute"
              top={toggleButtonSpacing}
              left={sidebarOnRight ? toggleButtonSpacing : undefined}
              right={sidebarOnRight ? undefined : toggleButtonSpacing}
              p="xs"
              onClick={toggleSidebarOnRight}
              aria-label={t('a11y.toggleSidebarPosition')}
              hidden={forceHideSidebar}
            >
              <FontAwesomeIcon icon={effectiveSidebarOnRight ? 'chevron-left' : 'chevron-right'} fixedWidth />
            </UnstyledButton>
          </MediaQuery>
          <Center>
            <Anchor component={Link} size="xl" weight={700} color="dimmed" underline={false} href="/">
              <CustomIcon src="/logos/app.svg" alt="" />
              {` ${SITE_TITLE}`}
            </Anchor>
          </Center>
        </Header>
      }
      aside={sidebarOnRight && !forceHideSidebar ? <AppSidebar opened={opened} Component={Aside} /> : undefined}
      navbar={sidebarOnRight || forceHideSidebar ? undefined : <AppSidebar opened={opened} Component={Navbar} />}
      className={styles.shell}
      fixed
    >
      <div className={styles['shell-contents']}>{children}</div>
    </AppShell>
  );
};
