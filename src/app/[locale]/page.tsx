import {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {use} from 'react';

import HomeHero from '@/components/home/hero/Hero';
import HomeAboutUs from '@/components/home/HomeAboutUs';
import HomeBento from '@/components/home/HomeBento';
import HomeGallery from '@/components/home/HomeGallery';
import HomeProcess from '@/components/home/HomeProcess';
import {routing} from '@/i18n/routing';

type Props = {
  params: Promise<{locale: Locale}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata() {
  const t = await getTranslations('meta');
  return {
    title: t('home.title'),
    description: t('home.description')
  };
}

export default function IndexPage({params}: Props) {
  const {locale} = use(params);
  setRequestLocale(locale);

  return (
    <div>
      <HomeHero />
      <HomeAboutUs />
      <HomeGallery />
      <HomeProcess />
      <HomeBento />
    </div>
  );
}
