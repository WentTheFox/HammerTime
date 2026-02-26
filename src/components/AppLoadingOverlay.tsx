import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, LoadingOverlay, useMantineTheme } from '@mantine/core';
import { LoadingIndicator } from 'components/app/LoadingIndicator';
import { useLocalSettings } from 'components/contexts/LocalSettingsProvider';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { CSSProperties, FC } from 'react';

const centerAlignedStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  minHeight: '100vh',
  minWidth: '100vw',
  zIndex: 10,
};

const transitionDuration = 500;

export const AppLoadingOverlay: FC = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const t = useTranslations();
  const { sidebarOnRight, sidebarOffDesktop, customInputEnabled, combinedInputsEnabled } = useLocalSettings();

  const visible = [sidebarOnRight, sidebarOffDesktop, customInputEnabled, combinedInputsEnabled, router.isReady ? true : null].some(
    (value) => value === null,
  );

  return (
    <LoadingOverlay
      visible={visible}
      overlayOpacity={0.98}
      overlayColor={theme.colors.dark[9]}
      transitionDuration={transitionDuration}
      exitTransitionDuration={transitionDuration}
      loader={
        <>
          <div style={centerAlignedStyle}>
            <LoadingIndicator size={64} color="#9a57f2" />
          </div>

          <noscript>
            <Alert title={t('jsDisabled.title')} icon={<FontAwesomeIcon icon="exclamation-triangle" fixedWidth />} color="red">
              {t('jsDisabled.body')}
            </Alert>
          </noscript>
        </>
      }
    />
  );
};
