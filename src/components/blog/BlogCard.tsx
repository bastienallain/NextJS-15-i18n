import {BlogPost} from 'contentlayer/generated';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({post}: BlogCardProps) {
  return (
    <Link
      href={post.url as any}
      className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 w-full">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString(post.locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </Link>
  );
}
