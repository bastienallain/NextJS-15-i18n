import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about-us': {
      de: '/uber-uns'
    },
    '/production': {
      de: '/produktion'
    },
    '/design': {
      de: '/design-entwicklung'
    },
    '/gallery': {
      de: '/galerie'
    },
    '/events': {
      de: '/veranstaltungen'
    },
    '/sustainability': {
      de: '/zertifizierung-nachhaltigkeit'
    },
    '/refining': {
      de: '/refining-service'
    },
    '/contact': {
      de: '/kontakt'
    },
    '/blog': {
      de: '/blog'
    },
    '/blog/first-post': {
      de: '/blog/erster-beitrag'
    },
    '/blog/[slug]': {
      de: '/blog/[slug]'
    },
    '/[slug]': {
      de: '/[slug]'
    }
  }
});
