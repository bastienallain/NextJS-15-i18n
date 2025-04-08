import { allBlogs } from 'content-collections';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogPostComponent from '@/components/blog/BlogPost';

// Base URL for the site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

// BlogPost page props type

export async function generateStaticParams() {
  const params = allBlogs.map((post) => ({
    locale: post.locale,
    slug: post.slug
  }));

  console.log('Generated static params for blog posts:', params);
  return params;
}

export async function generateMetadata({
  params
}: {
  params: {
    locale: string;
    slug: string;
  };
}): Promise<Metadata> {
  // Await the params before using them
  const {locale, slug} = await Promise.resolve(params);

  // Find the post
  let post = allBlogs.find(
    (post) => post._meta.path === slug && post.locale === locale
  );

  // If not found, try to find a matching post in any locale
  if (!post) {
    const postInAnyLocale = allBlogs.find((p) => p._meta.path === slug);
    if (postInAnyLocale) {
      if ((postInAnyLocale as any).id) {
        post = allBlogs.find(
          (p) => (p as any).id === (postInAnyLocale as any).id && p.locale === locale
        );
      }
    }
  }

  // If still not found, return default metadata
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  // Generate metadata for the post
  return {
    title: (post as any).ogTitle || post.title,
    description: (post as any).ogDescription || post.description,
    authors: (post as any).author ? [{name: (post as any).author}] : undefined,
    publisher: 'Advance Jewelry Manufacturers',
    openGraph: {
      title: (post as any).ogTitle || post.title,
      description: (post as any).ogDescription || post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: (post as any).lastmod || post.date,
      authors: (post as any).author ? [(post as any).author] : undefined,
      images: [
        {
          url: (post as any).ogImage || post.heroImage || '',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card:
        ((post as any).twitterCard as
          | 'summary_large_image'
          | 'summary'
          | 'player'
          | 'app') || 'summary_large_image',
      title: (post as any).ogTitle || post.title,
      description: (post as any).ogDescription || post.description,
      images: [(post as any).ogImage || post.heroImage || '']
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: Object.entries((post as any).alternateUrls || {}).reduce(
        (acc, [lang, url]) => {
          // Assurez-vous que l'URL contient le code de langue dans le chemin
          if (url && typeof url === 'string' && !url.includes(`/${lang}/`)) {
            // Extraire le slug de l'URL
            const urlParts = url.split('/');
            const urlSlug = urlParts[urlParts.length - 1];
            // Reconstruire l'URL avec le code de langue
            acc[lang] = `${siteUrl}/${lang}/blog/${urlSlug}`;
          } else if (typeof url === 'string') {
            acc[lang] = url;
          }
          return acc;
        },
        {} as Record<string, string>
      )
    },
    keywords: (post as any).keywords,
    robots: (post as any).robots || {
      index: true,
      follow: true
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: {
    locale: string;
    slug: string;
  };
}) {
  // Attendre les paramètres avant de les utiliser
  const {locale, slug} = await Promise.resolve(params);

  // First try to find post with exact match
  let post = allBlogs.find(
    (post) => post._meta.path === slug && post.locale === locale
  );

  // If not found, try to find a matching post in any locale and then find its translation
  if (!post) {
    console.log(`Post not found with path "${slug}" and locale "${locale}"`);

    // Step 1: Find any post with this path in any locale
    const postInAnyLocale = allBlogs.find((p) => p._meta.path === slug);

    if (postInAnyLocale) {
      console.log(
        `Found post with path "${slug}" in locale "${postInAnyLocale.locale}"`
      );

      // Step 2: If found, look for a version of this post in the requested locale using the ID
      if ((postInAnyLocale as any).id) {
        post = allBlogs.find(
          (p) => (p as any).id === (postInAnyLocale as any).id && p.locale === locale
        );
      }

      if (post) {
        console.log(
          `Found translation for post with path "${slug}" in locale "${locale}"`
        );
      }
    }

    // Step 3: If still not found, try checking all posts in the requested locale
    // and see if any of them have a translation matching the requested path
    if (!post) {
      for (const candidatePost of allBlogs.filter(
        (p) => p.locale === locale
      )) {
        // Find posts with the same ID but in other locales
        const relatedPosts = allBlogs.filter(
          (p) => (p as any).id === (candidatePost as any).id && p.locale !== locale
        );

        // Check if any related post has the requested path
        for (const relatedPost of relatedPosts) {
          if (relatedPost._meta.path === slug) {
            console.log(
              `Found matching post ID "${(candidatePost as any).id}" for path "${slug}" in another locale`
            );
            post = candidatePost;
            break;
          }
        }

        if (post) break;
      }
    }
  }

  if (!post) {
    notFound();
  }

  return <BlogPostComponent post={post as any} />;
}
