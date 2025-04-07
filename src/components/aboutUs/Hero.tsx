import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function AboutUs() {
  const t = useTranslations('aboutUs');

  return (
    <>
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                  {t('pageSubtitle')}
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  {t('pageTitle')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt=""
            src="/aboutUs/about-header.webp"
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-brand uppercase sm:text-7xl">
            {' '}
            {t('ourStory')}
          </h2>
          <p className="mt-8 md:mt-14 text-lg font-light text-pretty text-left text-gray-700 sm:text-2xl/9">
            {t('ourStoryContent')}
          </p>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pt-4 lg:pl-4">
              <div className="lg:max-w-2xl prose">
                <p className="text-lg font-semibold capitalize text-gray-600 mb-0 pb-0">
                  {t('innovationTraditionIntegrity')}
                </p>
                <h2 className="text-5xl font-semibold text-brand mt-1">
                  {t('ourPhilosophy')}
                </h2>
                <p className="mt-8 md:mt-14 text-lg font-light text-pretty text-left text-gray-700 sm:text-2xl/9">
                  {t('ourPhilosophyContent')}
                </p>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <Image
                alt={t('imageAlts.philosophyImage')}
                src="/aboutUs/About-our-philosophy.webp"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-full md:max-w-none sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-gray-100/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-4 lg:pt-4">
              <div className="lg:max-w-2xl prose">
                <p className="text-lg font-semibold capitalize text-gray-600 mb-0 pb-0">
                  {t('thaiCraftsmanshipItalianGerman')}
                </p>
                <h2 className="text-5xl font-semibold text-brand mt-1">
                  {t('ourVision')}
                </h2>
                <p className="mt-8 md:mt-14 text-lg font-light text-pretty text-left text-gray-700 sm:text-2xl/9">
                  {t('ourVisionContent')}
                </p>
              </div>
            </div>

            <div className="flex items-start justify-start">
              <Image
                alt={t('imageAlts.teamWorkImage')}
                src="/aboutUs/team-work-2.webp"
                width={2432}
                height={1442}
                className="w-[48rem] max-w-full md:max-w-none sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-gray-100/50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* En-tête de la section équipe */}
          <div className="mx-auto max-w-7xl text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-brand uppercase sm:text-5xl">
              {t('ourTeam')}
            </h2>
            <p className="mt-6 text-lg font-semibold text-gray-700 capitalize">
              {t('ourTeamQuote')}
            </p>
            <p className="mt-8 md:mt-14 text-lg font-light text-pretty  text-gray-700 sm:text-2xl/9">
              {t('ourTeamContent')}
            </p>
          </div>

          {/* Grille des images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grande image (pleine largeur) */}
            <div className="col-span-1 md:col-span-3 h-[400px] md:h-[500px] relative overflow-hidden rounded-xl">
              <Image
                src="/aboutUs/team-3.webp"
                alt={t('imageAlts.teamImage1')}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
            </div>

            {/* Images plus petites, 3 côte à côte sur tablette/desktop */}
            <div className="col-span-1 h-[300px] relative overflow-hidden rounded-xl">
              <Image
                src="/aboutUs/team-5.webp"
                alt={t('imageAlts.teamImage2')}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="col-span-1 h-[300px] relative overflow-hidden rounded-xl">
              <Image
                src="/aboutUs/team-6.webp"
                alt={t('imageAlts.teamImage3')}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="col-span-1 h-[300px] relative overflow-hidden rounded-xl">
              <Image
                src="/aboutUs/team-4.webp"
                alt={t('imageAlts.teamImage4')}
                fill
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
}
