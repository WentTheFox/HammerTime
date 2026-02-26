import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notifications } from '@mantine/notifications';
import { TFunction } from 'src/config';
import moment from 'moment-timezone';
import { useEffect } from 'react';

// This should stay 5 minutes as this is the value used in localization files
const fiveMinutesInMs = 300e3;
const notificationId = 'serverTimeSync';

export const useServerTimeSync = (t: TFunction) => {
  useEffect(() => {
    let mounted = true;
    notifications.show({
      id: notificationId,
      message: t('timeSync.syncing'),
      withCloseButton: false,
      loading: true,
    });
    void fetch('/timecheck.txt', { cache: 'no-cache' }).then((r) => {
      if (!mounted) return;
      const dateHeader = r.headers.get('date');
      const serverDate = moment.utc(dateHeader).toDate();
      const clientDate = new Date();

      const deltaTimeMs = serverDate.getTime() - clientDate.getTime();
      if (Math.abs(deltaTimeMs) > fiveMinutesInMs) {
        notifications.update({
          id: notificationId,
          message: t('timeSync.outOfSync', { deltaTimeMs }),
          withCloseButton: true,
          icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
          color: 'yellow',
        });
      } else {
        notifications.update({
          id: notificationId,
          message: t('timeSync.inSync', { deltaTimeMs }),
          withCloseButton: true,
          autoClose: 2e3,
          icon: <FontAwesomeIcon icon={faCheck} />,
          color: 'green',
        });
      }
    });

    return () => {
      mounted = false;
    };
  }, [t]);
};
