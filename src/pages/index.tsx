import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, MantineSize, Paper, Text, Tooltip } from '@mantine/core';
import { DatesProvider, DayOfWeek } from '@mantine/dates';
import { DatesProviderSettings } from '@mantine/dates/lib/components/DatesProvider/DatesProvider';
import { AppContainer } from 'components/app/AppContainer';
import { Layout } from 'components/app/Layout';
import { HowToAlert } from 'components/HowToAlert';
import { LockButton } from 'components/LockButton';
import { TimestampPicker } from 'components/TimestampPicker';
import { TimestampsTable } from 'components/TimestampsTable';
import { UsefulLinks } from 'components/UsefulLinks';
import { parseInt, throttle } from 'lodash';
import moment, { Moment } from 'moment-timezone';
import { GetStaticProps, NextPage } from 'next';
import { SSRConfig, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { AvailableLanguage, LANGUAGES } from 'src/config';
import { useServerTimeSync } from 'src/hooks/useServerTimeSync';
import { addSecondsToTimeString, useLocale } from 'src/util/common';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import {
  getSortedNormalizedTimezoneNames,
  isoFormattingDateFormat,
  isoParsingDateFormat,
  isoTimeFormat,
  momentToInputValue,
} from 'src/util/timezone';

interface IndexPageProps {
  tzNames: string[];
}

const TS_QUERY_PARAM = 't';
const TZ_QUERY_PARAM = 'tz';

export const IndexPage: NextPage<IndexPageProps> = ({ tzNames }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const locale = useLocale(language);
  const defaultTimezone = useMemo<string>(
    // Get local time zone
    () => moment.tz.guess(),
    [],
  );
  const router = useRouter();
  const timestampQuery = useMemo(() => {
    const queryParam = router.query[TS_QUERY_PARAM];
    return typeof queryParam === 'string' ? queryParam : undefined;
  }, [router.query]);
  const timezoneQuery = useMemo(() => {
    const queryParam = router.query[TZ_QUERY_PARAM];
    return typeof queryParam === 'string' ? queryParam : undefined;
  }, [router.query]);
  const setTimezone = useCallback(
    (timezoneName?: string) => {
      if (!router.isReady) return;

      if (timezoneQuery === timezoneName) {
        return;
      }

      const query: ParsedUrlQuery = {};
      if (timestampQuery) {
        query[TS_QUERY_PARAM] = timestampQuery;
      }
      if (timezoneName) {
        query[TZ_QUERY_PARAM] = timezoneName;
      }
      void router.replace({ query }, undefined, {
        shallow: true,
        scroll: false,
      });
    },
    [router, timestampQuery, timezoneQuery],
  );
  const safeTimezone = useMemo(() => timezoneQuery ?? defaultTimezone, [defaultTimezone, timezoneQuery]);
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');
  const initialTimestamp = useMemo<number | null>(() => {
    if (typeof timestampQuery === 'string') {
      const timestampNumber = parseInt(timestampQuery, 10);
      if (!isNaN(timestampNumber) && isFinite(timestampNumber)) {
        try {
          // Make sure timestamp value can be parsed by Date constructor before accepting it
          return Math.round(new Date(timestampNumber * 1e3).getTime() / 1e3);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return null;
  }, [timestampQuery]);
  const [timestamp, setTimestamp] = useState<Moment | null>(null);
  const timestampInSecondsString = useMemo(() => (timestamp ? timestamp?.unix().toString() : '0'), [timestamp]);

  const handleTimezoneChange = useMemo(
    () =>
      throttle((value: null | string) => {
        const newTimeZone = value === null ? undefined : value;
        setTimezone(newTimeZone);
      }, 200),
    [setTimezone],
  );
  const setDateTimeString = useCallback((value: string) => {
    const [dateStr, timeStr] = value.split(/[T ]/);
    setTimeString(addSecondsToTimeString(timeStr));
    setDateString(dateStr);
  }, []);
  const handleDateChange = useMemo(
    () =>
      throttle((value: null | string) => {
        setDateString(value || momentToInputValue(moment(), isoFormattingDateFormat));
      }, 200),
    [],
  );
  const handleTimeChange = useMemo(
    () =>
      throttle((value: null | string) => {
        setTimeString(addSecondsToTimeString(value) || momentToInputValue(moment(), isoTimeFormat));
      }, 200),
    [],
  );
  const handleDateTimeChange = useMemo(
    () =>
      throttle((value: string) => {
        setDateTimeString(value || momentToInputValue(moment(), `${isoFormattingDateFormat} ${isoTimeFormat}`));
      }, 50),
    [setDateTimeString],
  );
  const setTimeNow = useCallback(() => {
    // Get local time zone
    const guessed = moment.tz.guess();
    // Create a timestamp in local timezone and convert it to selected timezone
    const value = moment.tz(guessed).tz(safeTimezone);
    setDateTimeString(momentToInputValue(value));
  }, [safeTimezone, setDateTimeString]);

  useEffect(() => {
    // Setting initial values only
    if (dateString !== '' && timeString !== '') return;

    let clientMoment: Moment | undefined;
    let clientTimezone: string | null = null;
    if (!router.isReady) {
      // Router still initializing, wait for next execution before setting
      return;
    }
    if (typeof initialTimestamp === 'number') {
      const initialDate = moment.unix(initialTimestamp).utc(false);
      if (initialDate.isValid()) {
        clientTimezone = 'Etc/GMT';
        clientMoment = initialDate;
      }
    }
    if (!clientMoment) clientMoment = moment().seconds(0).milliseconds(0);
    const formatted = momentToInputValue(clientMoment);
    handleDateTimeChange(formatted);
    if (clientTimezone) handleTimezoneChange(clientTimezone);
  }, [dateString, handleDateTimeChange, handleTimezoneChange, initialTimestamp, router.isReady, timeString]);

  useEffect(() => {
    if (!dateString || !timeString) return;
    setTimestamp(moment.tz(`${dateString}T${timeString}`, `${isoParsingDateFormat}T${isoTimeFormat}`, safeTimezone));
  }, [dateString, safeTimezone, timeString, timezoneQuery]);

  const fixedTimestamp = initialTimestamp !== null;
  const { lockButtonTooltipText, setTimeButtonTooltipText, leadText } = useMemo(() => {
    const options = {
      defaultValue: false,
      fallbackLng: [],
    };
    return {
      lockButtonTooltipText: t(fixedTimestamp ? 'common:buttons.unlock' : 'common:buttons.lock', options) as string | null,
      setTimeButtonTooltipText: t('common:buttons.setCurrentTime', options) as string | null,
      leadText: t('common:usefulLinks.lead', options) as string | null,
    };
  }, [fixedTimestamp, t]);

  const ButtonsComponent = useMemo(
    (): FC<PropsWithChildren<{ size: MantineSize }>> =>
      // eslint-disable-next-line react/no-unstable-nested-components -- It's memoized, should be fine (?)
      ({ size, children }) =>
        (
          <>
            <Tooltip label={setTimeButtonTooltipText}>
              <Button size={size} color="gray" onClick={setTimeNow} disabled={fixedTimestamp}>
                <FontAwesomeIcon icon="clock-rotate-left" />
              </Button>
            </Tooltip>{' '}
            <LockButton
              href={fixedTimestamp ? '/' : `/?${TS_QUERY_PARAM}=${timestampInSecondsString}`}
              size={size}
              lockButtonTooltipText={lockButtonTooltipText}
              fixedTimestamp={fixedTimestamp}
            />
            {children}
          </>
        ),
    [fixedTimestamp, lockButtonTooltipText, setTimeButtonTooltipText, setTimeNow, timestampInSecondsString],
  );

  const dateProviderSettings: DatesProviderSettings = useMemo(() => {
    const languageConfig = LANGUAGES[locale as AvailableLanguage];
    return {
      locale,
      firstDayOfWeek: (languageConfig?.firstDayOfWeek ?? moment.localeData(locale).firstDayOfWeek()) as DayOfWeek,
      weekendDays: (languageConfig?.weekendDays ?? []) as DayOfWeek[],
    };
  }, [locale]);

  useServerTimeSync(t);

  return (
    <Layout>
      <DatesProvider settings={dateProviderSettings}>
        <AppContainer>
          <HowToAlert />

          <Paper p="lg">
            <TimestampPicker
              t={t}
              locale={locale}
              language={language}
              dateString={dateString}
              timeString={timeString}
              changeTimezone={handleTimezoneChange}
              handleDateChange={handleDateChange}
              handleTimeChange={handleTimeChange}
              handleDateTimeChange={handleDateTimeChange}
              timezone={timezoneQuery}
              defaultTimezone={defaultTimezone}
              tzNames={tzNames}
              fixedTimestamp={fixedTimestamp}
              ButtonsComponent={ButtonsComponent}
            />
            <TimestampsTable t={t} locale={locale} timestamp={timestamp} timeInSeconds={timestampInSecondsString} />
          </Paper>

          {!!leadText && (
            <Paper p="lg">
              <Text className="lead-text">{leadText}</Text>
              <UsefulLinks t={t} language={language} />
            </Paper>
          )}
        </AppContainer>
      </DatesProvider>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps & SSRConfig> = async ({ locale, params }) => {
  const timestamp = params?.timestamp;
  let initialTimestamp: number | null = null;
  if (typeof timestamp === 'string') {
    const timestampNumber = parseInt(timestamp, 10);
    if (!isNaN(timestampNumber) && isFinite(timestampNumber)) {
      initialTimestamp = timestampNumber;
    }
  }
  return {
    props: {
      initialTimestamp,
      tzNames: getSortedNormalizedTimezoneNames(),
      ...(await typedServerSideTranslations(locale)),
    },
  };
};
