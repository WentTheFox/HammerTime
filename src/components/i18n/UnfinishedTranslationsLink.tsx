import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from '@mantine/core';
import { ExternalLink } from 'components/ExternalLink';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { CROWDIN_URL } from 'src/config';
import { getIsTranslationComplete } from 'src/util/crowdin';
import { MantineGradient } from '@mantine/styles';

const incompleteButtonGradient: MantineGradient = { from: 'blue', to: 'lime', deg: 135 };

export const UnfinishedTranslationsLink: FC<{
  crowdinLocale: string;
  percent?: number;
}> = ({ crowdinLocale, percent }) => {
  const t = useTranslations();

  const label = t('credits.contributeTranslations');
  const isComplete = getIsTranslationComplete(percent);
  return (
    <Tooltip label={label}>
      <Button
        color={isComplete ? 'light' : undefined}
        variant={isComplete ? 'subtle' : 'gradient'}
        gradient={isComplete ? undefined : incompleteButtonGradient}
        size="sm"
        component={ExternalLink}
        href={`${CROWDIN_URL}/${crowdinLocale}`}
        aria-label={label}
        sx={{ flex: 0 }}
      >
        <FontAwesomeIcon icon="life-ring" />
      </Button>
    </Tooltip>
  );
};
