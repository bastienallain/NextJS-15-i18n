# Multilingual Blog with Contentlayer

This document explains how to create and manage blog posts in this multilingual Next.js 15 application.

## Content File Structure

Blog content is organized by language:

```
data/
  content/
    en/
      first-post.mdx
    de/
      erster-beitrag.mdx
```

## MDX Frontmatter Format

Each blog post has a frontmatter that includes:

```yaml
---
id: first-post            # Unique ID for all translations of the same article
title: Post Title         # Translated title
description: Description  # Translated description
heroImage: /images/blog/first-post.jpg  # Image (can be different per language)
date: 2024-04-05          # Publication date
locale: en                # Post language (en, de, etc.)
slug: first-post          # Explicit slug for the URL
---
```

The `id` is the key that connects different translations of the same article.

## Adding a New Blog Post

1. Create a new MDX file in the appropriate language folder: `data/content/[locale]/[slug].mdx`
2. Add the required frontmatter with a unique `id` for the post
3. Write your content in Markdown/MDX format
4. For translations, create additional MDX files in other language folders with the same `id`
5. Add a slug mapping in `contentlayer.config.ts` if you want custom URLs

## Slug Mapping

In `contentlayer.config.ts`, the `slugMap` object defines URL slugs for each translation:

```typescript
const slugMap = {
  'first-post': {
    en: 'first-post',
    de: 'erster-beitrag'
  }
};
```

## Images

Place blog images in the `public/images/blog/` directory and reference them in your MDX frontmatter:

```yaml
heroImage: /images/blog/your-image.jpg
```

## Development Workflow

1. Create your MDX file with proper frontmatter
2. Run `pnpm run dev` to see your changes
3. When adding a new blog post, check that:
   - The slug mapping is correct (if using custom slugs)
   - All required translations exist
   - Images are properly placed in the public directory

## SEO Optimization

- Each blog post generates proper metadata including title and description
- Alternate language links are automatically generated from the `alternateUrls` computed field
- Custom slugs allow for SEO-friendly URLs in each language

## Markdown Features

You can use all standard Markdown features including:
- Headings
- Lists
- Bold and italic text
- Code blocks
- Links
- Images
- And more!

## Using Components in MDX

You can also include React components in your MDX files:

```jsx
<CustomComponent prop="value" />
```

To add custom components, update the MDXContent component to include them.