'use client';
import { BlogPost } from 'content-collections';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/lib/utils';

interface SimpleBlogWithGridProps {
  posts: BlogPost[];
}

export function SimpleBlogWithGrid({posts}: SimpleBlogWithGridProps) {
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <div className="py-4 md:py-10 overflow-hidden relative  px-4 md:px-8">
        <GridPatternContainer className="opacity-50" />
        <div className="relative z-20 py-10 ">
          <h1
            className={cn(
              'scroll-m-20 text-4xl font-bold text-center md:text-left tracking-tight text-black dark:text-white mb-6'
            )}
          >
            Blog
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-400-foreground max-w-xl !mb-6 text-center md:text-left">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between pb-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20">
          {posts.map((post, index) => (
            <BlogCard post={post} key={`${post.id}-${post.locale}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
      <span className="font-medium text-black dark:text-white">DevStudio</span>
    </Link>
  );
};

export const BlogCard = ({post}: {post: BlogPost}) => {
  const locale = useLocale();
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };
  return (
    <Link
      className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200"
      href={`/${locale}/${post.slug}`}
    >
      {post.heroImage ? (
        <SimpleBlurImage
          src={post.heroImage || ''}
          alt={post.title}
          height="800"
          width="800"
          className="h-52 object-cover object-top w-full"
        />
      ) : (
        <div className="h-52 flex items-center justify-center bg-white dark:bg-neutral-900">
          <Logo />
        </div>
      )}
      <div className="p-4 md:p-8 bg-white dark:bg-neutral-900">
        <div className="flex space-x-2 items-center  mb-2">
          <Image
            src={
              post.author
                ? `/images/authors/${post.author.toLowerCase().replace(/\s+/g, '-')}.webp`
                : '/images/authors/default.webp'
            }
            alt={post.author || 'Author'}
            width={20}
            height={20}
            className="rounded-full h-5 w-5"
          />
          <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
            {post.author || 'Anonymous'}
          </p>
        </div>
        <p className="text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          {post.title}
        </p>
        <p className="text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400">
          {truncate(post.description, 100)}
        </p>
      </div>
    </Link>
  );
};

interface IBlurImage {
  height?: any;
  width?: any;
  src?: string | any;
  objectFit?: any;
  className?: string | any;
  alt?: string | undefined;
  layout?: any;
  [x: string]: any;
}

export const SimpleBlurImage = ({
  height,
  width,
  src,
  className,
  objectFit,
  alt,
  layout,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        'transition duration-300 transform',
        isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100',
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      layout={layout}
      alt={alt ? alt : 'Avatar'}
      {...rest}
    />
  );
};

export function GridPatternContainer({className}: {className?: string}) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)]',
        className
      )}
    >
      <GridPattern />
    </div>
  );
}

export function GridPattern() {
  const columns = 30;
  const rows = 11;
  return (
    <div className="flex bg-gray-200 dark:bg-neutral-700 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({length: rows}).map((_, row) =>
        Array.from({length: columns}).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[1px] ${
                index % 2 === 0
                  ? 'bg-gray-100 dark:bg-neutral-800'
                  : 'bg-gray-100 dark:bg-neutral-800 shadow-[0px_0px_0px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)_inset]'
              }`}
            />
          );
        })
      )}
    </div>
  );
}
