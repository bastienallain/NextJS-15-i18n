'use client';

import 'swiper/css';
import 'swiper/css/effect-fade';

import {useTranslations} from 'next-intl';
import Image from 'next/image';
import {useEffect} from 'react';
import Swiper from 'swiper';
import {Autoplay, EffectFade} from 'swiper/modules';

const images = [
  {
    src: 'https://res.cloudinary.com/denq2jckc/image/upload/q_auto,w_auto/v1632635132/Home/Slideshow/az4948_ggpzcg.jpg',
    alt: 'mopJewelry' as const
  },
  {
    src: 'https://res.cloudinary.com/denq2jckc/image/upload/q_auto,w_auto/v1632635142/Home/Slideshow/az4951_wpqknt.jpg',
    alt: 'pearlJewelry' as const
  },
  {
    src: 'https://res.cloudinary.com/denq2jckc/image/upload/q_auto,w_auto/v1632635141/Home/Slideshow/az5332_i9vpn2.jpg',
    alt: 'diamondJewelry' as const
  },
  {
    src: 'https://res.cloudinary.com/denq2jckc/image/upload/q_auto,w_auto/v1632635141/Home/Slideshow/az5327_rd74kd.jpg',
    alt: 'goldJewelry' as const
  },
  {
    src: 'https://res.cloudinary.com/denq2jckc/image/upload/q_auto,w_auto/v1632635139/Home/Slideshow/az4967_yyiicy.jpg',
    alt: 'pinkGoldJewelry' as const
  }
];

export default function HomeGallery() {
  const t = useTranslations('home');

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      modules: [Autoplay, EffectFade],
      effect: 'fade',
      speed: 2900,
      parallax: true,
      loop: true,
      autoplay: {
        delay: 1000
      }
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <section className="w-full overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="lg:max-w-lg prose mx-auto text-center pb-6 sm:pb-8 lg:pb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
                {t('galleryTitle')}
                <span className="text-brand"> {t('gallerySpan')}</span>
              </h2>
              <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-normal tracking-tight text-pretty text-gray-800">
                {t('galleryText')}
              </p>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full">
            <div className="swiper h-full w-full">
              <div className="swiper-wrapper">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="swiper-slide relative w-full h-full"
                  >
                    <Image
                      src={image.src}
                      alt={t(image.alt)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
                      quality={75}
                      priority={index === 0}
                      className="swiper-shutters-image object-contain sm:object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
