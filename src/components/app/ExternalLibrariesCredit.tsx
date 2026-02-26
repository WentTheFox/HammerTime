import { ExternalLink } from 'components/ExternalLink';
import styles from 'modules/ExternalLibrariesCredit.module.scss';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FONTAWESOME_FREE_LICENSE_URL, MANTINE_URL } from 'src/config';

export const ExternalLibrariesCredit: FC = () => {
  const t = useTranslations();
  return (
    <ul className={styles['external-libraries-credit']}>
      <li>
        <ExternalLink href={FONTAWESOME_FREE_LICENSE_URL}>{t('credits.fontAwesomeFree')}</ExternalLink>
      </li>
      <li>
        <ExternalLink href={MANTINE_URL}>{t('credits.mantine')}</ExternalLink>
      </li>
    </ul>
  );
};
