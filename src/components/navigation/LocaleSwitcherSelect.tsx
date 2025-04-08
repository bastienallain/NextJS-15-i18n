'use client';

import {Locale} from 'next-intl';
import {useParams} from 'next/navigation';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {usePathname, useRouter} from '@/i18n/navigation';
import {cn} from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  defaultValue: string;
  label: string;
  className?: string;
  pathname?: string;
  pathnameOverride?: Record<string, string>;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
  className,
  pathname: customPathname,
  pathnameOverride
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const currentPathname = usePathname();
  const params = useParams();

  function onValueChange(nextLocale: string) {
    startTransition(() => {
      // If we have custom pathnames for different locales (like in blog posts)
      if (pathnameOverride && nextLocale in pathnameOverride) {
        // Use the explicit pathname for this locale from the override
        router.push(pathnameOverride[nextLocale], { locale: nextLocale as Locale });
      } else if (customPathname) {
        // Use the provided custom pathname
        router.push(`/${customPathname}`, { locale: nextLocale as Locale });
      } else {
        // Default case - keep current pathname but change locale
        router.replace(
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          {pathname: currentPathname, params},
          {locale: nextLocale as Locale}
        );
      }
    });
  }

  // Convert children (options) to SelectItem components
  const childrenArray = React.Children.toArray(children);
  const selectItems = childrenArray.map((child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      const props = child.props as {value: string; children: React.ReactNode};
      return (
        <SelectItem
          key={props.value}
          value={props.value}
          className="text-gray-900 bg-white focus:text-black focus:bg-slate-100 data-[state=checked]:text-black"
        >
          {props.children}
        </SelectItem>
      );
    }
    return null;
  });

  return (
    <div
      className={cn('relative', isPending && 'transition-opacity opacity-70')}
    >
      <span className="sr-only">{label}</span>
      <Select
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={isPending}
      >
        <SelectTrigger className={cn('w-[100px]', className)}>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="bg-slate-100  text-gray-200">
          {selectItems}
        </SelectContent>
      </Select>
    </div>
  );
}
