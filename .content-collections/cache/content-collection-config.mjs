// content-collections.ts
import { z } from "zod";
import { defineConfig } from "@content-collections/core";
var content_collections_default = defineConfig({
  collections: [
    {
      name: "blog",
      directory: "data/content",
      include: "**/*.mdx",
      typeName: "BlogPost",
      parser: "frontmatter",
      schema: {
        id: z.string().optional(),
        title: z.string(),
        description: z.string(),
        date: z.string().transform((str) => new Date(str)),
        locale: z.string(),
        heroImage: z.string().optional(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        category: z.string().optional(),
        slug: z.string().optional(),
        canonicalUrl: z.string().optional(),
        robots: z.string().optional(),
        ogImage: z.string().optional(),
        ogTitle: z.string().optional(),
        ogDescription: z.string().optional(),
        twitterCard: z.string().optional(),
        keywords: z.array(z.string()).optional(),
        lastmod: z.string().transform((str) => new Date(str)).optional()
      }
    }
  ]
});
export {
  content_collections_default as default
};
