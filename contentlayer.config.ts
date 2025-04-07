import {defineDocumentType, makeSource} from 'contentlayer/source-files';
import {format} from 'date-fns';

// We don't need to import allBlogPosts since we're using slugMap

type Locale = 'en' | 'de';
type SlugMap = {
  [key: string]: {
    [key in Locale]: string;
  };
};

const slugMap: SlugMap = {
  'first-post': {
    en: 'first-post',
    de: 'erster-beitrag'
  },
  'complete-post': {
    en: 'complete-post',
    de: 'vollstandiger-beitrag'
  }
};

// Base URL for the site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: {
      type: 'string',
      required: true,
      description:
        'The unique identifier for the blog post across all translations'
    },
    title: {
      type: 'string',
      required: true,
      description: 'The title of the blog post'
    },
    description: {
      type: 'string',
      required: true,
      description: 'The description of the blog post'
    },
    heroImage: {
      type: 'string',
      required: true,
      description: 'The hero image for the blog post',
      default: '/images/blog/default.jpg'
    },
    date: {
      type: 'date',
      required: true,
      description: 'The date of the blog post'
    },
    lastmod: {
      type: 'date',
      required: false,
      description: 'The last modified date of the blog post'
    },
    locale: {
      type: 'string',
      required: true,
      description: 'The locale of the blog post (en, de)'
    },
    slug: {
      type: 'string',
      required: false,
      description: 'Optional explicit slug for the blog post'
    },
    keywords: {
      type: 'list',
      of: {type: 'string'},
      required: false,
      description: 'Keywords relevant to the blog post'
    },
    author: {
      type: 'string',
      required: false,
      description: 'The author of the blog post'
    },
    canonicalUrl: {
      type: 'string',
      required: false,
      description: 'The canonical URL of the blog post'
    },
    robots: {
      type: 'string',
      required: false,
      description: 'Directives for search engine robots'
    },
    ogImage: {
      type: 'string',
      required: false,
      description: 'Open Graph image URL',
      default: '/images/social/default.jpg'
    },
    ogTitle: {
      type: 'string',
      required: false,
      description: 'Open Graph title'
    },
    ogDescription: {
      type: 'string',
      required: false,
      description: 'Open Graph description'
    },
    twitterCard: {
      type: 'string',
      required: false,
      description: 'Twitter card type',
      default: 'summary'
    },
    tags: {
      type: 'list',
      of: {type: 'string'},
      required: false,
      description: 'Tags for the blog post'
    },
    category: {
      type: 'string',
      required: false,
      description: 'The main category of the blog post'
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        // If the slug is explicitly provided in the frontmatter, use that
        if (doc.slug) {
          return doc.slug;
        }

        // Otherwise get the localized slug from the slugMap
        const baseId = doc.id;
        return slugMap[baseId]?.[doc.locale as Locale] || baseId;
      }
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        // Use the computed slug to create the URL
        // This will respect the explicit slug if provided
        const computedSlug =
          doc.slug || slugMap[doc.id]?.[doc.locale as Locale] || doc.id;

        // Return the full URL path
        return `/${doc.locale}/blog/${computedSlug}`;
      }
    },
    canonicalUrl: {
      type: 'string',
      resolve: (doc) => {
        // If canonicalUrl is explicitly provided in the frontmatter, use that
        if (doc.canonicalUrl) {
          return doc.canonicalUrl;
        }

        // Otherwise generate it from the site URL and the post URL
        const computedSlug =
          doc.slug || slugMap[doc.id]?.[doc.locale as Locale] || doc.id;

        // For SEO, we want the canonical URL to be the full URL including domain
        return `${siteUrl}/${doc.locale}/blog/${computedSlug}`;
      }
    },
    headings: {
      type: 'json',
      resolve: (doc) => {
        // Extract headings from the document
        const headings = [];
        if (doc.body.raw) {
          const headingRegex = /^#{2,3}\s+(.+)$/gm;
          let match;
          while ((match = headingRegex.exec(doc.body.raw)) !== null) {
            const text = match[1].trim();
            const level = match[0].indexOf('#');
            const slug = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');

            headings.push({
              text,
              level,
              slug
            });
          }
        }
        return headings;
      }
    },
    alternateUrls: {
      type: 'json',
      resolve: (doc) => {
        const baseId = doc.id;
        const result: Record<string, string> = {};

        // For each locale in the slug map that's not the current locale
        Object.keys(slugMap[baseId] || {}).forEach((locale) => {
          if (locale !== doc.locale) {
            const translationSlug =
              slugMap[baseId]?.[locale as Locale] || baseId;
            // Generate full URLs including domain for SEO
            result[locale] = `${siteUrl}/${locale}/blog/${translationSlug}`;
          }
        });

        return result;
      }
    },
    formattedDate: {
      type: 'string',
      resolve: (doc) => format(new Date(doc.date), 'LLLL d, yyyy')
    }
  }
}));

export default makeSource({
  contentDirPath: 'data/content',
  documentTypes: [BlogPost],
  disableImportAliasWarning: true
});
