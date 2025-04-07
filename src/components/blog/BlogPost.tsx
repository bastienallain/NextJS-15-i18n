import {BlogPost as BlogPostType} from 'contentlayer/generated';
import Image from 'next/image';
import React from 'react';

import {BlogNavigation} from '@/components/blog/BlogNavigation';
import {MDXContent} from '@/components/blog/MDXContent';

// Simple implementation of useMDXComponent until we can fix the dependencies
function useMDXComponent(code: string) {
  return React.useMemo(() => {
    return function MDXComponent() {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<p>Content will be shown here when MDX dependencies are fixed.</p>'
          }}
        />
      );
    };
  }, [code]);
}

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({post}: BlogPostProps) {
  const MDXComponent = useMDXComponent(post.body?.code || '');

  return (
    <div>
      <article className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <BlogNavigation post={post} />
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="text-gray-600 mb-8">
          {new Date(post.date).toLocaleDateString(post.locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        <div className="relative w-full h-80 mb-8">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <MDXContent>
            <MDXComponent />
          </MDXContent>
        </div>
      </article>
    </div>
  );
}
