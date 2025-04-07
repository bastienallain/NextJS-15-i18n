# Claude Guidelines for Nextjs-15-intl-v4

## Commands

- Build: `pnpm run build`
- Dev: `pnpm run dev --turbo`
- Lint: `pnpm run lint` (runs ESLint, TypeScript, Prettier)
- Test: `pnpm run test` (runs Playwright and Jest tests)
- Test single Jest file: `pnpm run test:jest src/path/to/file.spec.tsx`
- Test single Playwright file: `pnpm run test:playwright tests/file.spec.ts`

## Code Style

- TypeScript with strict mode enabled
- Prettier: single quotes, no bracket spacing, no trailing commas
- Path aliases: `@/*` for src directory
- Component organization: Imports (React first, components second, utilities last)
- File naming: PascalCase for components, camelCase for utilities
- Use named exports for components
- Error handling with Next.js error.tsx components

## i18n Conventions

- Use `useTranslations` hook from next-intl for text
- Language files in messages directory
- Type-safe translations with namespaces

## Testing

- Unit/component tests with Jest/Testing Library
- E2E tests with Playwright
- Mock Next.js navigation functions in component tests

## Structure des fichiers de contenu

Les fichiers de contenu sont organisés par langue :

```
data/
  content/
    en/
      first-post.mdx
    de/
      erster-beitrag.mdx
```

### Frontmatter MDX

Chaque post de blog a un frontmatter qui inclut :

```yaml
---
id: first-post # ID unique pour toutes les traductions d'un même article
title: Post Title # Titre traduit
description: Description # Description traduite
heroImage: /path/to/img # Image (peut être différente par langue)
date: 2024-04-04 # Date de publication
locale: en # Langue du post (en, de, etc.)
slug: first-post # Slug explicite pour l'URL
---
```

L'ID est la clé qui relie les différentes traductions d'un même article.

## Configuration de Contentlayer

Dans `contentlayer.config.ts` :

```typescript
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
    slug: {type: 'string', required: false} // Slug explicite optionnel
  },
  computedFields: {
    // Calcule le slug à partir du frontmatter ou de la table de correspondance
    slug: {
      type: 'string',
      resolve: (doc) => {
        // Si un slug est explicitement défini, l'utiliser
        if (doc.slug) {
          return doc.slug;
        }

        // Sinon utiliser la table de correspondance ou l'ID
        return slugMap[doc.id]?.[doc.locale] || doc.id;
      }
    },
    // URL complète du post
    url: {
      type: 'string',
      resolve: (doc) => {
        const computedSlug =
          doc.slug || slugMap[doc.id]?.[doc.locale] || doc.id;
        return `/blog/${computedSlug}`;
      }
    },
    // URLs des traductions alternatives
    alternateUrls: {
      type: 'json',
      resolve: (doc) => {
        const baseId = doc.id;
        const result = {};

        // Pour chaque locale dans la table, ajouter l'URL alternative
        Object.keys(slugMap[baseId] || {}).forEach((locale) => {
          if (locale !== doc.locale) {
            const translationSlug = slugMap[baseId]?.[locale] || baseId;
            result[locale] = `/blog/${translationSlug}`;
          }
        });

        return result;
      }
    }
  }
}));
```

## Table de correspondance des slugs

Dans `contentlayer.config.ts`, définir une table de correspondance :

```typescript
const slugMap = {
  'first-post': {
    en: 'first-post',
    de: 'erster-beitrag'
  }
};
```

Cette table associe l'ID unique d'un post à ses slugs traduits pour chaque langue.

## Routage Next.js

### Page de post de blog

Dans `src/app/[locale]/blog/[slug]/page.tsx` :

```tsx
export default async function BlogPostPage({
  params
}: {
  params: {locale: string; slug: string};
}) {
  const locale = params.locale;
  const slug = params.slug;

  // Essai de trouver le post avec correspondance exacte
  let post = allBlogPosts.find(
    (post) => post.slug === slug && post.locale === locale
  );

  // Si non trouvé, vérifier les mappings connus
  if (!post) {
    const knownMappings = {
      'first-post': 'erster-beitrag',
      'erster-beitrag': 'first-post'
    };

    if (knownMappings[slug]) {
      const mappedSlug = knownMappings[slug];
      post = allBlogPosts.find(
        (p) => p.slug === mappedSlug && p.locale === locale
      );
    }
  }

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
```

## Composant de navigation entre langues

Dans `src/components/BlogNavigation.tsx` :

```tsx
import {BlogPost} from 'contentlayer/generated';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';

interface BlogNavigationProps {
  post: BlogPost;
}

export default function BlogNavigation({post}: BlogNavigationProps) {
  const locale = useLocale();

  return (
    <div className="flex items-center space-x-4">
      {/* Langue actuelle */}
      <span className="text-sm font-medium">{locale.toUpperCase()}</span>

      {/* Langues alternatives */}
      {post.alternateUrls &&
        Object.entries(post.alternateUrls).map(([altLocale, url]) => (
          <Link
            key={altLocale}
            href={url}
            locale={altLocale}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {altLocale.toUpperCase()}
          </Link>
        ))}
    </div>
  );
}
```

## Configuration Next-Intl

Dans `src/i18n/routing.ts` :

```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about-us': {
      de: '/uber-uns'
    },
    '/blog': {
      de: '/blog'
    },
    '[slug]': {
      de: '[slug]'
    }
  }
});
```

Le paramètre `[slug]` est générique et sera remplacé par le slug du post spécifique.

## Points importants à retenir

1. **IDs uniques** : Chaque post a un ID unique partagé par toutes ses traductions
2. **Slugs explicites** : Les slugs sont définis explicitement dans le frontmatter pour le contrôle SEO
3. **URLs localisées** : Les URLs reflètent la langue (e.g., /de/blog/erster-beitrag)
4. **Table de correspondance** : Une table de correspondance fait le lien entre les différentes versions d'un post
5. **Navigation i18n** : Le composant BlogNavigation utilise les propriétés `alternateUrls` pour la navigation

## Comment ajouter un nouveau post traduit

1. Créer le post original (par ex. en anglais) : `/data/content/en/example-post.mdx`
2. Créer sa traduction (par ex. en allemand) : `/data/content/de/beispiel-post.mdx`
3. Assurer que les deux fichiers ont le même `id` dans leur frontmatter
4. Ajouter les slugs dans la table de correspondance si nécessaire
5. Ajouter les traductions de l'interface dans les fichiers de messages

## Résolution des problèmes courants

- **Post introuvable** : Vérifier les slugs et les IDs, s'assurer qu'ils correspondent dans la table
- **Navigation cassée** : Vérifier que les URLs alternatives sont correctement générées
- **Locale incorrect** : S'assurer que le paramètre `locale` est correctement passé aux composants
