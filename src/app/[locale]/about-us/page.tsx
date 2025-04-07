import {Locale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {use} from 'react';

import AboutUs from '@/components/aboutUs/Hero';
import SeoPage from '@/components/seo/SeoPage';
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
    title: t('layout.title'),
    description: t('layout.description')
  };
}

export default function AboutUsPage({params}: Props) {
  const {locale} = use(params);
  setRequestLocale(locale);

  // Récupérer les traductions pour les métadonnées
  const t = use(getTranslations('aboutUs'));

  return (
    <div>
      <SeoPage
        title={t('pageTitle')}
        description={t('ourStoryContent')}
        keywords={['jewelry', 'manufacturer', 'about us', 'company', 'history']}
        ogType="website"
        pageType="Organization"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Advance Jewelry Manufacturers',
          description: t('ourStoryContent'),
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com'}/${locale}/about-us`,
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com'}/images/logo.png`,
          sameAs: [
            'https://www.facebook.com/advancejewelrymanufacturers',
            'https://www.instagram.com/advancejewelrymanufacturers',
            'https://www.linkedin.com/company/advance-jewelry-manufacturers'
          ]
        }}
      />
      <AboutUs />
    </div>
  );
}
