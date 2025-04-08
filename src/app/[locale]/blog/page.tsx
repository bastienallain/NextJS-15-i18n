'use client';

import {BlogPost, allBlogs as posts} from 'content-collections';
import {compareDesc} from 'date-fns';
import {useLocale, useTranslations} from 'next-intl';

import {SimpleBlogWithGrid} from '@/components/blog/SimpleBlogWithGrid';

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('blog');

  // Filter posts by current locale and sort by date
  const filteredPosts = posts
    .filter((post: BlogPost) => post.locale === locale)
    .sort((a: BlogPost, b: BlogPost) =>
      compareDesc(new Date(a.date), new Date(b.date))
    );

  return <SimpleBlogWithGrid posts={filteredPosts} />;
}
