import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Chargement des différents namespaces
  const messages = {
    common: (await import(`../../messages/${locale}/common.json`)).default,
    home: (await import(`../../messages/${locale}/home.json`)).default,
    pathname: (await import(`../../messages/${locale}/pathname.json`)).default,
    meta: (await import(`../../messages/${locale}/meta.json`)).default
  };

  return {
    locale,
    messages,
    timeZone: 'Europe/Paris'
  };
});
