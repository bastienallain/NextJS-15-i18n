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
    // Root-level blog posts - this enables URLs like /first-post in EN and /de/erster-beitrag in DE
    '/first-post': {
      de: '/erster-beitrag'
    },
    '/complete-post': {
      de: '/vollstandiger-beitrag'
    },
    // Generic pattern for any new blog posts
    '/[slug]': {
      de: '/[slug]'
    }
  }
});
