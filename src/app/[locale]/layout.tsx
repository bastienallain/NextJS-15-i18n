import './styles.css';

import {clsx} from 'clsx';
import {hasLocale, Locale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Inter} from 'next/font/google';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';

import Navigation from '@/components/Navigation';
import {routing} from '@/i18n/routing';

import type {Metadata} from 'next';

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

const inter = Inter({subsets: ['latin']});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  return {
    title: t('layout.title'),
    description: t('layout.description')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
