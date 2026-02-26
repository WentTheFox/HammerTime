import { BrowserInput } from 'components/input/BrowserInput';
import { BrowserInputCombined } from 'components/input/BrowserInputCombined';
import styles from 'modules/TimestampPicker.module.scss';
import { FC } from 'react';
import { dateInputIcon, timeInputIcon, TimestampInputProps } from 'src/model/timestamp-input-props';

const dateInputId = 'date-input';
const timeInputId = 'time-input';
const dateTimeInputId = 'date-time-input';

export const TimestampInputBrowser: FC<TimestampInputProps> = ({
  fixedTimestamp,
  inputSize,
  combinedInput,
  handleTimeChange,
  handleDateChange,
  timeString,
  dateString,
  t,
  handleDateTimeChange,
}) => {
  if (combinedInput)
    return (
      <BrowserInputCombined
        label={t('input.datetime')}
        value={dateString && timeString ? `${dateString}T${timeString}` : ''}
        id={dateTimeInputId}
        onChange={handleDateTimeChange}
        readOnly={fixedTimestamp}
        size={inputSize}
        className={styles['combined-input']}
      />
    );

  return (
    <>
      <BrowserInput
        id={dateInputId}
        label={t('input.date')}
        type="date"
        value={dateString}
        icon={dateInputIcon}
        onChange={handleDateChange}
        readOnly={fixedTimestamp}
        size={inputSize}
      />
      <BrowserInput
        id={timeInputId}
        label={t('input.time')}
        type="time"
        value={timeString}
        icon={timeInputIcon}
        onChange={handleTimeChange}
        readOnly={fixedTimestamp}
        size={inputSize}
      />
    </>
  );
};
