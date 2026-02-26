import { ServerSideTranslations } from 'src/config';

export const typedServerSideTranslations = async (locale?: string): Promise<ServerSideTranslations> => {
  const languageCode = locale ?? 'en-GB';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const messages = await import(`src/../public/locales/${languageCode}/common.json`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  return { messages: { ...messages.default } };
};
