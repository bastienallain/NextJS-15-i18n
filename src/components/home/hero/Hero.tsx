import {useTranslations} from 'next-intl';
import Image from 'next/image';

import SvgAdvm from '@/components/Icons/brand';
import NavigationLink from '@/components/navigation/NavigationLink';

export default function HomeHero() {
  const t = useTranslations();
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-40 lg:pb-48 xl:col-span-6">
          <div className="mx-auto max-w-lg lg:mx-0">
            <SvgAdvm className="h-24" />
          </div>
          <h1 className="mt-24 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:mt-10 sm:text-7xl">
            {t('home.title')}
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            {t('home.subtitle')}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <NavigationLink
              href="/contact"
              className="rounded-md bg-brand px-3.5 py-2.5 text-lg uppercase font-semibold text-white shadow-xs hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {t('home.ctaOne')}
            </NavigationLink>
            <NavigationLink
              href="/about-us"
              className="text-lg uppercase font-semibold text-gray-900"
            >
              {t('home.ctaTwo')} <span aria-hidden="true">→</span>
            </NavigationLink>
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <Image
          alt={t('home.heroImage')}
          src="/home/hero.webp"
          className="lg:aspect-3/2 w-full aspect-square object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          width={2432}
          height={1442}
          priority
        />
      </div>
    </div>
  );
}
