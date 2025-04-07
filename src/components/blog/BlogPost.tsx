'use client';

import {format} from 'date-fns';
import {AnimatePresence, motion} from 'framer-motion';
import {useMDXComponent} from 'next-contentlayer/hooks';
import {useLocale, useTranslations} from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

import MDXImage from '@/components/mdx/Image';
import LocaleSwitcher from '@/components/navigation/LocaleSwitcher';
import HreflangTagsClient from '@/components/seo/HreflangTagsClient';
import {IconMenu} from '@tabler/icons-react';

interface BlogPostProps {
  post: {
    title: string;
    description: string;
    date: string;
    heroImage: string;
    body: {
      code: string;
      raw: string;
    };
    headings?: Array<{
      text: string;
      level: number;
      slug: string;
    }>;
    author?: string;
    lastmod?: string;
    keywords?: string[];
    tags?: string[];
    category?: string;
    canonicalUrl?: string;
    alternateUrls?: Record<string, string>;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
}

interface Heading {
  text: string;
  level: number;
  slug: string;
}

const mdxComponents = {
  Image: MDXImage,
  h2: ({children}: {children: React.ReactNode}) => {
    const slug = children
      ?.toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return (
      <h2 id={slug} className="group scroll-mt-24">
        {children}
        <a href={`#${slug}`} className="ml-2 opacity-0 group-hover:opacity-100">
          #
        </a>
      </h2>
    );
  },
  h3: ({children}: {children: React.ReactNode}) => {
    const slug = children
      ?.toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return (
      <h3 id={slug} className="group scroll-mt-24">
        {children}
        <a href={`#${slug}`} className="ml-2 opacity-0 group-hover:opacity-100">
          #
        </a>
      </h3>
    );
  }
};

const TableOfContents = ({headings}: {headings?: Heading[]}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // Fonction pour gérer le défilement fluide
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string
  ) => {
    e.preventDefault();

    const element = document.getElementById(slug);
    if (element) {
      // Fermer le menu mobile si ouvert
      setOpen(false);

      // Calculer la position de défilement avec un offset pour le header
      const offset = 100; // Ajustez selon la hauteur de votre header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Défilement fluide
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!headings || headings.length === 0) return null;

  return (
    <>
      <div className="sticky left-0 top-32 hidden max-w-xs flex-col self-start pr-10 md:flex">
        {headings.map((heading, index) => (
          <Link
            className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200"
            key={heading.slug}
            href={`#${heading.slug}`}
            onClick={(e) => handleSmoothScroll(e, heading.slug)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
              />
            )}
            <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
              {heading.text}
            </span>
          </Link>
        ))}
      </div>
      <div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900"
        >
          <IconMenu className="h-6 w-6 text-black dark:text-white" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              className="mt-2 flex flex-col items-end rounded-3xl border border-neutral-100 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {headings.map((heading, index) => (
                <Link
                  className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-neutral-700 dark:text-neutral-200"
                  key={heading.slug}
                  href={`#${heading.slug}`}
                  onClick={(e) => handleSmoothScroll(e, heading.slug)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === index && (
                    <motion.span
                      layoutId="toc-indicator"
                      className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
                    />
                  )}
                  <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
                    {heading.text}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default function BlogPost({post}: BlogPostProps) {
  useLocale(); // Used by translations system
  const t = useTranslations('blog');
  const MDXContent = useMDXComponent(post.body.code);
  const [imageError, setImageError] = useState(false);

  // Add structured data for SEO
  useEffect(() => {
    // Create structured data for the blog post
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: post.heroImage,
      datePublished: post.date,
      dateModified: post.lastmod || post.date,
      author: post.author
        ? {
            '@type': 'Person',
            name: post.author
          }
        : undefined,
      publisher: {
        '@type': 'Organization',
        name: 'Advance Jewelry Manufacturers',
        logo: {
          '@type': 'ImageObject',
          url: '/images/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': post.canonicalUrl || window.location.href
      }
    };

    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row md:px-8 lg:pt-52">
      <TableOfContents headings={post.headings} />

      <article className="flex max-w-7xl flex-1 flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex items-center">
            <time
              dateTime={post.date}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {t('publishedOn')} {format(new Date(post.date), 'LLLL d, yyyy')}
            </time>
            {post.author && (
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                {post.author}
              </span>
            )}
          </div>
        </header>

        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={imageError ? '/images/blog/default.jpg' : post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
        </div>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <MDXContent components={mdxComponents} />
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 max-w-7xl">
          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-900" />
          <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
        </div>

        <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-10">
          <div className="flex items-center justify-between mx-auto">
            <LocaleSwitcher />
          </div>
        </footer>
      </article>

      <HreflangTagsClient
        canonicalUrl={post.canonicalUrl}
        alternateUrls={post.alternateUrls}
      />
    </div>
  );
}
