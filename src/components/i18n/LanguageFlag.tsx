import { useMemo, FunctionComponent } from 'react';
import type { Props as FlagProps } from 'react-flagkit';
import Flag from 'react-flagkit';
import { LatestLanguageConfigType } from '../../config';

export const LanguageFlag: FunctionComponent<
  Omit<FlagProps, 'country'> & { language: Pick<LatestLanguageConfigType, 'countryCode' | 'customFlag'> }
> = ({ language: { countryCode, customFlag }, role = 'img', size = 24, alt, ...props }) => {
  const flagImageSrc = useMemo(() => {
    if (customFlag) {
      return `/flags/${countryCode}.svg`;
    }

    return null;
  }, [countryCode, customFlag]);

  const altText = useMemo(() => alt ?? `${countryCode} Flag`, [alt, countryCode]);

  if (!customFlag) {
    return <Flag country={countryCode} role={role} size={size} alt={altText} {...props} />;
  }

  if (!flagImageSrc) {
    return <span>{countryCode}</span>;
  }

  // eslint-disable-next-line @next/next/no-img-element -- The wrappers introduced by the Next.js Image component break the styles
  return <img src={flagImageSrc} role={role} alt={altText} height={size} width={size} {...props} placeholder={undefined} />;
};
