'use client';

import {allBlogPosts} from 'contentlayer/generated';
import {compareDesc} from 'date-fns';
import {useLocale, useTranslations} from 'next-intl';

import {SimpleBlogWithGrid} from '@/components/blog/SimpleBlogWithGrid';

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('blog');

  // Filter posts by current locale and sort by date
  const posts = allBlogPosts
    .filter((post) => post.locale === locale)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return <SimpleBlogWithGrid posts={posts} />;
}
