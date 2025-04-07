import {BlogPost} from 'contentlayer/generated';
import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';

interface BlogNavigationProps {
  post: BlogPost;
}

export default function BlogNavigation({post}: BlogNavigationProps) {
  const locale = useLocale();
  
  return (
    <div className="flex items-center space-x-4">
      {/* Current locale */}
      <span className="text-sm text-gray-900 dark:text-white font-medium">
        {locale.toUpperCase()}
      </span>
      
      {/* Alternative locales */}
      {post.alternateUrls && 
        Object.entries(post.alternateUrls).map(([altLocale, url]) => (
        <Link
          key={altLocale}
          href={url}
          locale={altLocale}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {altLocale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
