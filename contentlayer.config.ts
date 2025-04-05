import {defineDocumentType, makeSource} from 'contentlayer/source-files';

// Define slug mapping table for translations
const slugMap: Record<string, Record<string, string>> = {
  'first-post': {
    en: 'first-post',
    de: 'erster-beitrag'
  }
};

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    id: {type: 'string', required: true},
    title: {type: 'string', required: true},
    description: {type: 'string', required: true},
    heroImage: {type: 'string', required: true},
    date: {type: 'date', required: true},
    locale: {type: 'string', required: true},
    slug: {type: 'string', required: false} // Optional explicit slug
  },
  computedFields: {
    // Calculate slug from frontmatter or mapping table
    slug: {
      type: 'string',
      resolve: (doc: any) => {
        // If a slug is explicitly defined, use it
        if (doc.slug) {
          return doc.slug;
        }
        
        // Otherwise use the mapping table or the ID
        return slugMap[doc.id]?.[doc.locale] || doc.id;
      }
    },
    // Full post URL - just the path part, locale will be added by Next.js
    url: {
      type: 'string',
      resolve: (doc: any) => {
        const computedSlug = doc.slug || 
          slugMap[doc.id]?.[doc.locale] || 
          doc.id;
        
        // Return just the path part without locale prefix or blog segment
        // Next.js i18n routing will add the locale prefix if needed
        return `/${computedSlug}`;
      }
    },
    // URLs of alternative translations - just the path parts
    alternateUrls: {
      type: 'json',
      resolve: (doc: any) => {
        const baseId = doc.id;
        const result: Record<string, string> = {};
        
        // For each locale in the mapping table, add the alternative URL
        Object.keys(slugMap[baseId] || {}).forEach((locale) => {
          if (locale !== doc.locale) {
            const translationSlug = slugMap[baseId]?.[locale] || baseId;
            // Return plain path without locale prefix or blog segment
            result[locale] = `/${translationSlug}`;
          }
        });
        
        return result;
      }
    }
  }
}));

export default makeSource({
  contentDirPath: 'data/content',
  documentTypes: [BlogPost],
  disableImportAliasWarning: true
});