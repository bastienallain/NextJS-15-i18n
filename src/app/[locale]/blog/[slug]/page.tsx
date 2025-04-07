import {allBlogPosts} from 'contentlayer/generated';
import {Metadata} from 'next';
import {notFound} from 'next/navigation';

import BlogPost from '@/components/blog/BlogPost';

// Base URL for the site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

// BlogPost page props type

export async function generateStaticParams() {
  const params = allBlogPosts.map((post) => ({
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
  let post = allBlogPosts.find(
    (post) => post.slug === slug && post.locale === locale
  );

  // If not found, try to find a matching post in any locale
  if (!post) {
    const postInAnyLocale = allBlogPosts.find((p) => p.slug === slug);
    if (postInAnyLocale) {
      post = allBlogPosts.find(
        (p) => p.id === postInAnyLocale.id && p.locale === locale
      );
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
    title: post.ogTitle || post.title,
    description: post.ogDescription || post.description,
    authors: post.author ? [{name: post.author}] : undefined,
    publisher: 'Advance Jewelry Manufacturers',
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastmod || post.date,
      authors: post.author ? [post.author] : undefined,
      images: [
        {
          url: post.ogImage || post.heroImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card:
        (post.twitterCard as
          | 'summary_large_image'
          | 'summary'
          | 'player'
          | 'app') || 'summary_large_image',
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.description,
      images: [post.ogImage || post.heroImage]
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${slug}`,
      languages: Object.entries(post.alternateUrls || {}).reduce(
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
    keywords: post.keywords,
    robots: post.robots || {
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
  let post = allBlogPosts.find(
    (post) => post.slug === slug && post.locale === locale
  );

  // If not found, try to find a matching post in any locale and then find its translation
  if (!post) {
    console.log(`Post not found with slug "${slug}" and locale "${locale}"`);

    // Step 1: Find any post with this slug in any locale
    const postInAnyLocale = allBlogPosts.find((p) => p.slug === slug);

    if (postInAnyLocale) {
      console.log(
        `Found post with slug "${slug}" in locale "${postInAnyLocale.locale}"`
      );

      // Step 2: If found, look for a version of this post in the requested locale using the ID
      post = allBlogPosts.find(
        (p) => p.id === postInAnyLocale.id && p.locale === locale
      );

      if (post) {
        console.log(
          `Found translation for post ID "${postInAnyLocale.id}" in locale "${locale}"`
        );
      }
    }

    // Step 3: If still not found, try checking all posts in the requested locale
    // and see if any of them have a translation matching the requested Roma Kulisra
    if (!post) {
      for (const candidatePost of allBlogPosts.filter(
        (p) => p.locale === locale
      )) {
        // Find posts with the same ID but in other locales
        const relatedPosts = allBlogPosts.filter(
          (p) => p.id === candidatePost.id && p.locale !== locale
        );

        // Check if any related post has the requested slug
        for (const relatedPost of relatedPosts) {
          if (relatedPost.slug === slug) {
            console.log(
              `Found matching post ID "${candidatePost.id}" for slug "${slug}" in another locale`
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

  return <BlogPost post={post} />;
}
