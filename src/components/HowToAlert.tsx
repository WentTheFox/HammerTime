import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import moment from 'moment-timezone';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocale } from 'src/util/common';

const howToCookieName = 'how-to-dismiss';
const howToCookieValue = 'how-to-dismiss';

export const HowToAlert: FC = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const locale = useLocale(language);
  const [showHowTo, setShowHowTo] = useState(false);
  const handleHowToClose = () => {
    void setCookie(howToCookieName, howToCookieValue, {
      expires: moment().add(2, 'years').toDate(),
    });
    setShowHowTo(false);
  };

  const syntaxColName = useMemo(() => {
    const originalText = t('common:table.syntax');
    // Lowercase column name in text only for this language
    if (locale === 'pt-br') {
      return originalText.toLowerCase();
    }
    return originalText;
  }, [locale, t]);

  useEffect(() => {
    setShowHowTo(getCookie(howToCookieName) !== howToCookieValue);
  }, []);

  if (!showHowTo) return null;

  return (
    <Alert
      title={t('common:seoDescription')}
      icon={<FontAwesomeIcon icon="info" fixedWidth />}
      color="dark"
      withCloseButton
      onClose={handleHowToClose}
    >
      {t('common:howTo', { syntaxColName })}
    </Alert>
  );
};
