import { Moment } from 'moment';
import moment from 'moment-timezone';
import { FALLBACK_LANGUAGE } from 'src/config';

export const isoTimeFormat = 'HH:mm:ss';
export const isoFormattingDateFormat = 'YYYY-MM-DD';
export const isoParsingDateFormat = 'Y-MM-DD';

export const gmtZoneRegex = /^Etc\/(GMT([+-]\d+)?)$/;

const formatGmtZoneLabel = (offset = '') => `GMT${offset} (UTC${offset})`;

export const transformGmtZoneName = (value: string): string =>
  value.replace(gmtZoneRegex, (_, extractedIdentifier: string) =>
    // eslint-disable-next-line @typescript-eslint/naming-convention
    extractedIdentifier.replace(/^GMT(?:([+-])(\d+))?$/, (__, sign: string, offset: string) => {
      const newSign = sign ? (sign === '+' ? '-' : '+') : '';
      return formatGmtZoneLabel(`${newSign}${offset ?? ''}`);
    }),
  );

const compareGmtStrings = (a: string, b: string) =>
  parseInt(a.replace(gmtZoneRegex, '$2'), 10) - parseInt(b.replace(gmtZoneRegex, '$2'), 10);

export const getSortedNormalizedTimezoneNames = (): string[] =>
  moment.tz
    .names()
    .filter((name) => !/^(?:Etc\/)?GMT[+-]?0$/.test(name) && name !== 'GMT')
    .sort((a, b) => {
      const isAGmt = gmtZoneRegex.test(a);
      const isBGmt = gmtZoneRegex.test(b);
      if (isAGmt) return isBGmt ? compareGmtStrings(a, b) : -1;
      if (isBGmt) return isAGmt ? compareGmtStrings(a, b) : 1;
      return a.localeCompare(b);
    });

export const getTimezoneLabel = (timezone: string): string => {
  if (!gmtZoneRegex.test(timezone)) return timezone;
  return transformGmtZoneName(timezone);
};

export const getTimezoneValue = (timezone: string) => ({
  value: timezone,
  label: getTimezoneLabel(timezone),
});

export const momentToInputValue = (time: Moment = moment(), format = `${isoFormattingDateFormat}\\T${isoTimeFormat}`): string =>
  // Force English locale so values are always in the expected format
  time.clone().locale(FALLBACK_LANGUAGE).format(format);
