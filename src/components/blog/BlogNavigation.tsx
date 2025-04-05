import {BlogPost} from 'contentlayer/generated';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';

interface BlogNavigationProps {
  post: BlogPost;
}

export function BlogNavigation({post}: BlogNavigationProps) {
  const locale = useLocale();

  return (
    <div 
      className="flex items-center space-x-4"
      data-blog-alt-urls={JSON.stringify(post.alternateUrls || {})}
    >
      {/* Current language */}
      <span className="text-sm font-medium">{locale.toUpperCase()}</span>

      {/* Alternative languages */}
      {post.alternateUrls &&
        Object.entries(post.alternateUrls).map(([altLocale, url]) => (
          <Link
            key={altLocale}
            href={url as any}
            locale={altLocale as any}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {altLocale.toUpperCase()}
          </Link>
        ))}
    </div>
  );
}
