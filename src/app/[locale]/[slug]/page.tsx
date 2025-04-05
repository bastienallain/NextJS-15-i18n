import {allBlogPosts} from 'contentlayer/generated';
import {notFound} from 'next/navigation';
import {BlogPost} from '@/components/blog/BlogPost';
import {Metadata} from 'next';

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  // Use await to fix Next.js warning
  const locale = await Promise.resolve(params.locale);
  const slug = await Promise.resolve(params.slug);

  const post = allBlogPosts.find(
    (post: any) => post.slug === slug && post.locale === locale
  );

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description
  };
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    locale: post.locale,
    slug: post.slug
  }));
}

export default async function BlogPostPage({params}: Props) {
  // Use await to fix Next.js warnings
  const locale = await Promise.resolve(params.locale);
  const slug = await Promise.resolve(params.slug);

  // Try to find the post with exact slug match
  let post = allBlogPosts.find(
    (post: any) => post.slug === slug && post.locale === locale
  );
  
  // If not found by slug, try to find by ID (for multilingual support)
  if (!post) {
    // First check if there's any post with this ID in any language
    const postWithId = allBlogPosts.find((post: any) => post.id === slug);
    
    if (postWithId) {
      // If found, now look for the post with the same ID but in current locale
      post = allBlogPosts.find(
        (post: any) => post.id === postWithId.id && post.locale === locale
      );
    }
  }
  
  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}