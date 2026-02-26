import { Switch, Text } from '@mantine/core';
import { useLocalSettings } from 'components/contexts/LocalSettingsProvider';
import styles from 'modules/InputSettings.module.scss';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const InputSettings: FC = () => {
  const t = useTranslations();
  const { customInputEnabled, combinedInputsEnabled, toggleCustomInput, toggleSeparateInputs } = useLocalSettings();

  return (
    <div className={styles.wrapper}>
      <div>
        <Switch label={t('input.settings.customInputs.label')} checked={!!customInputEnabled} onChange={toggleCustomInput} />
        <Text size="xs">{t('input.settings.customInputs.explanation')}</Text>
      </div>

      <div>
        <Switch label={t('input.settings.separateInputs.label')} checked={!combinedInputsEnabled} onChange={toggleSeparateInputs} />
        <Text size="xs">{t('input.settings.separateInputs.explanation')}</Text>
      </div>
    </div>
  );
};
