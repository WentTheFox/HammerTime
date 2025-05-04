import { useEffect, useState } from 'react';

const wordsForFirefoxOnAndroid = ['android', 'mobile', 'firefox/'];

export const useWithSeconds = (): boolean => {
  const [withSeconds, setWithSeconds] = useState(true);

  /**
   * This is a workaround because Firefox on Android has a bugged time selector when seconds are allowed
   * @see https://github.com/WentTheFox/HammerTime/issues/153
   */
  useEffect(() => {
    const lowerUserAgent = navigator.userAgent.toLowerCase();
    const detectedAllWords = wordsForFirefoxOnAndroid.every((word) => lowerUserAgent.includes(word));
    if (detectedAllWords) {
      setWithSeconds(false);
    }
  }, []);

  return withSeconds;
};
