import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MantineSize } from '@mantine/core';
import { ChangeEvent } from 'react';
import { TFunction } from 'src/config';

export type InputChangeHandler = (value: Date | ChangeEvent<HTMLInputElement> | null) => void;

export interface TimestampInputProps {
  combinedInput: boolean;
  t: TFunction;
  locale: string;
  dateString: string;
  timeString: string;
  language: string | undefined;
  inputSize: MantineSize;
  fixedTimestamp: boolean;
  handleDateChange: InputChangeHandler;
  handleTimeChange: InputChangeHandler;
  handleDateTimeChange: InputChangeHandler;
}

export const dateInputIcon: IconProp = 'calendar';
export const timeInputIcon: IconProp = 'clock';
export const dateTimeInputIcons: IconProp[] = [dateInputIcon, timeInputIcon];
