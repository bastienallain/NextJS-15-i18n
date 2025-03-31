import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  locale: locale as 'en' | 'de',
  messages: {
    common: (await import(`../messages/${locale}/common.json`)).default,
    meta: (await import(`../messages/${locale}/meta.json`)).default
  },
  timeZone: 'Europe/Paris',
  now: new Date()
}));
