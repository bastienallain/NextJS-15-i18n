'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import {Locale} from 'next-intl';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    
    // Check if we're on a blog post page - now without the /blog/ in path
    // Check if we're not on one of the known non-blog pages
    const isHomePage = pathname === '/';
    const isPathnames = pathname.includes('/pathnames');
    const isBlogIndex = pathname === '/blog';
    
    // If we're not on a known page and not on blog index, assume we're on a blog post
    const isBlogPost = !isHomePage && !isPathnames && !isBlogIndex;
    
    startTransition(() => {
      if (isBlogPost && typeof window !== 'undefined') {
        // If we have access to the window object and we're on a blog post
        // Try to use the alternateUrls from the page component
        const blogNavElement = document.querySelector('[data-blog-alt-urls]');
        if (blogNavElement) {
          try {
            const alternateUrls = JSON.parse(blogNavElement.getAttribute('data-blog-alt-urls') || '{}');
            if (alternateUrls[nextLocale]) {
              router.replace(alternateUrls[nextLocale], { locale: nextLocale });
              return;
            }
          } catch (e) {
            console.error('Error parsing alternateUrls', e);
          }
        }
      }

      // Fall back to the default behavior
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span>
    </label>
  );
}
