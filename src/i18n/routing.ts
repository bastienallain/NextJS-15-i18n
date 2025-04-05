import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/pathnames': {
      de: '/pfadnamen'
    },
    '/blog': {
      de: '/blog'
    },
    '/[slug]': {
      de: '/[slug]'
    }
  }
});
