import {allBlogPosts} from 'contentlayer/generated';
import {getTranslations} from 'next-intl/server';
import {BlogCard} from '@/components/blog/BlogCard';
import PageLayout from '@/components/PageLayout';

export default async function BlogPage({params}: {params: {locale: string}}) {
  const t = await getTranslations('common');
  // Use await to fix Next.js warning
  const locale = await Promise.resolve(params.locale);

  // Get all posts for the current locale and sort by date (newest first)
  const posts = allBlogPosts
    .filter((post: any) => post.locale === locale)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <PageLayout title={t('blog')}>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{t('blog')}</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post: any) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
