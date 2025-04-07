import {allBlogPosts} from 'contentlayer/generated';
import {getTranslations} from 'next-intl/server';

import {BlogCard} from '@/components/blog/BlogCard';

export default async function BlogPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const t = await getTranslations('common');
  const {locale} = await params;

  // Get all posts for the current locale and sort by date (newest first)
  const posts = allBlogPosts
    .filter((post: any) => post.locale === locale)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{t('blog')}</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post: any) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
