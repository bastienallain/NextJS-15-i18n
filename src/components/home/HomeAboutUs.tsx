import {useTranslations} from 'next-intl';

import {OptimizedImage} from '@/components/ui/optimized-image';

import {ShinyButton} from '../magicui/shiny-button';
import {NavigationLink} from '../navigation';

export default function HomeAboutUs() {
  const t = useTranslations('home');

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg prose">
              <h2 className="text-5xl font-semibold text-brand">
                {t('AboutTitle')}
              </h2>
              <p className="mt-2 text-xl font-normal tracking-tight text-pretty text-gray-800 sm:text-2xl">
                {t('AboutText')}
              </p>
              <NavigationLink href="/about-us">
                <ShinyButton>{t('AboutCtaText')}</ShinyButton>
              </NavigationLink>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <OptimizedImage
              alt={t('HomeAboutImg')}
              src="/home/home-about-us.webp"
              width={2432}
              height={1442}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
              priority
              className="w-[48rem] max-w-full md:max-w-none sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
