import {allBlogPosts} from 'contentlayer/generated';
import {MetadataRoute} from 'next';
import {Locale} from 'next-intl';

import {host} from '@/config';
import {getPathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...getEntries('/'),
    ...getEntries('/about-us'),
    ...getEntries('/production'),
    ...getEntries('/design'),
    ...getEntries('/gallery'),
    ...getEntries('/events'),
    ...getEntries('/sustainability'),
    ...getEntries('/refining'),
    ...getEntries('/contact'),
    ...getEntries('/blog'),
    ...getBlogEntries()
  ];
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)])
      )
    }
  }));
}

function getBlogEntries() {
  // Grouper les articles par ID pour gérer les traductions
  const postsByID = allBlogPosts.reduce(
    (acc, post) => {
      if (!acc[post.id]) {
        acc[post.id] = [];
      }
      acc[post.id].push(post);
      return acc;
    },
    {} as Record<string, typeof allBlogPosts>
  );

  // Créer les entrées pour chaque article
  return Object.values(postsByID)
    .map((posts) => {
      // Utiliser le premier article comme référence pour l'URL canonique
      const canonicalPost = posts[0];
      const canonicalUrl = `${host}/blog/${canonicalPost.slug}`;

      // Créer les entrées pour chaque traduction
      return posts.map((post) => ({
        url: `${host}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        alternates: {
          canonical: canonicalUrl,
          languages: Object.fromEntries(
            posts.map((p) => [p.locale, `${host}/blog/${p.slug}`])
          )
        }
      }));
    })
    .flat();
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({locale, href});
  return host + pathname;
}
