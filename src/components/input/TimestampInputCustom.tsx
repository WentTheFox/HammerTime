import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon } from '@mantine/core';
import { CalendarAriaLabels, DatePickerInput, DateTimePicker, TimeInput } from '@mantine/dates';
import { IconRenderer } from 'components/IconRenderer';
import styles from 'modules/TimestampPicker.module.scss';
import moment from 'moment-timezone';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AvailableLanguage, LANGUAGES } from 'src/config';
import { useWithSeconds } from 'src/hooks/useWithSeconds';
import { dateInputIcon, dateTimeInputIcons, timeInputIcon, TimestampInputProps } from 'src/model/timestamp-input-props';
import { removeSecondsFromTimeString } from 'src/util/common';
import { getDayStyle } from 'src/util/styling';
import { isoParsingDateFormat, isoTimeFormat } from 'src/util/timezone';

const dateInputId = 'date-custom-input';
const timeInputId = 'time-custom-input';
const dateTimeInputId = 'date-time-custom-input';

export const TimestampInputCustom: FC<TimestampInputProps> = ({
  combinedInput,
  t,
  locale,
  dateString,
  timeString,
  language,
  inputSize,
  fixedTimestamp,
  handleDateChange,
  handleTimeChange,
  handleDateTimeChange,
}) => {
  const withSeconds = useWithSeconds();
  const date = useMemo(() => {
    if (!dateString) {
      return new Date(0);
    }
    const inputString = `${dateString}T${timeString}`;
    const formatString = `${isoParsingDateFormat}T${isoTimeFormat}`;
    return moment(inputString, formatString).toDate();
  }, [dateString, timeString]);
  const { calendarLabelFormat, calendarYearLabelFormat, calendarWeekdayFormat, rtl } = useMemo(
    () => LANGUAGES[language as AvailableLanguage],
    [language],
  );
  const saferTimeString = useMemo(() => removeSecondsFromTimeString(timeString, withSeconds), [timeString, withSeconds]);
  const [today, setToday] = useState(() => new Date());
  const timeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const todayUpdateInterval = setInterval(() => {
      setToday(new Date());
    }, 60e3);

    return () => clearInterval(todayUpdateInterval);
  }, []);

  const getDayProps = useMemo(() => getDayStyle(today, locale), [today, locale]);

  const datePickerA11y = useMemo(
    (): CalendarAriaLabels => ({
      nextMonth: t('common:a11y.calendar.nextMonthLabel') ?? undefined,
      previousMonth: t('common:a11y.calendar.previousMonthLabel') ?? undefined,
      nextYear: t('common:a11y.calendar.nextYearLabel') ?? undefined,
      previousYear: t('common:a11y.calendar.previousYearLabel') ?? undefined,
      nextDecade: t('common:a11y.calendar.nextDecadeLabel') ?? undefined,
      previousDecade: t('common:a11y.calendar.previousDecadeLabel') ?? undefined,
    }),
    [t],
  );

  const valueFormats = useMemo(() => {
    const localeData = moment.localeData(locale);
    const dateFormat = localeData.longDateFormat('LL');
    const parts = [dateFormat, localeData.longDateFormat('LTS')];
    return {
      dateTime: (rtl ? parts.reverse() : parts).join(' '),
      date: dateFormat,
    };
  }, [locale, rtl]);

  const datePickerClearable = useMemo(() => date.toDateString() !== today.toDateString(), [date, today]);

  const handleTimeIconClick = useCallback(() => {
    timeInputRef.current?.showPicker();
  }, []);

  if (combinedInput) {
    return (
      <DateTimePicker
        label={t('common:input.datetime')}
        valueFormat={valueFormats.dateTime}
        value={date}
        id={dateTimeInputId}
        onChange={handleDateTimeChange}
        disabled={fixedTimestamp}
        size={inputSize}
        className={styles['combined-input']}
        icon={<IconRenderer icons={dateTimeInputIcons} />}
        withSeconds={withSeconds}
      />
    );
  }

  return (
    <>
      <DatePickerInput
        id={dateInputId}
        label={t('common:input.date')}
        ariaLabels={datePickerA11y}
        value={date}
        icon={<FontAwesomeIcon icon={dateInputIcon} fixedWidth />}
        size={inputSize}
        onChange={handleDateChange}
        readOnly={fixedTimestamp}
        clearable={datePickerClearable}
        getDayProps={getDayProps}
        monthLabelFormat={calendarLabelFormat}
        yearLabelFormat={calendarYearLabelFormat}
        weekdayFormat={calendarWeekdayFormat}
        valueFormat={valueFormats.date}
      />
      <TimeInput
        id={timeInputId}
        label={t('common:input.time')}
        value={saferTimeString}
        icon={
          <ActionIcon onClick={handleTimeIconClick}>
            <IconRenderer icons={timeInputIcon} />
          </ActionIcon>
        }
        onChange={handleTimeChange}
        withSeconds={withSeconds}
        readOnly={fixedTimestamp}
        size={inputSize}
        ref={timeInputRef}
      />
    </>
  );
};
