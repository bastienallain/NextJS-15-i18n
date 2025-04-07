// HomeBento.tsx
import {useTranslations} from 'next-intl';
import Image from 'next/image';

import {cn} from '@/lib/utils';

type ImageBento = {
  src: string;
  altKey: keyof typeof bentoTranslationKeys;
};

const bentoTranslationKeys = {
  waxDepartment: 'home.bento.waxDepartment',
  jewelryPolishing: 'home.bento.jewelryPolishing',
  jewelryEnamelling: 'home.bento.jewelryEnamelling',
  cadPrinter: 'home.bento.cadPrinter',
  diamondSettings: 'home.bento.diamondSettings'
} as const;

const imagesBento: ImageBento[] = [
  {
    src: '/home/bento/Wax-Department.webp',
    altKey: 'waxDepartment'
  },
  {
    src: '/home/bento/Jewelry-Polishing.webp',
    altKey: 'jewelryPolishing'
  },
  {
    src: '/home/bento/Jewelry-Enamelling.webp',
    altKey: 'jewelryEnamelling'
  },
  {
    src: '/home/bento/CAD-Printer-Jewelry.webp',
    altKey: 'cadPrinter'
  },
  {
    src: '/home/bento/diamond-settings.webp',
    altKey: 'diamondSettings'
  }
];

interface BentoGridProps {
  images: ImageBento[];
  className?: string;
}

function BentoGrid({images, className}: BentoGridProps) {
  const t = useTranslations();

  return (
    <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8 py-12 md:px-24">
      <div
        className={cn(
          'grid w-full grid-cols-1 md:grid-cols-3 gap-4',
          className
        )}
      >
        {/* Première rangée */}
        <div className="col-span-1 md:col-span-1">
          <BentoImageCard
            src={images[0].src}
            alt={t(bentoTranslationKeys[images[0].altKey])}
            title={images[0].altKey}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <BentoImageCard
            src={images[1].src}
            alt={t(bentoTranslationKeys[images[1].altKey])}
            title={images[1].altKey}
          />
        </div>

        {/* Deuxième rangée */}
        <div className="col-span-1">
          <BentoImageCard
            src={images[2].src}
            alt={t(bentoTranslationKeys[images[2].altKey])}
            title={images[2].altKey}
          />
        </div>
        <div className="col-span-1">
          <BentoImageCard
            src={images[3].src}
            alt={t(bentoTranslationKeys[images[3].altKey])}
            title={images[3].altKey}
          />
        </div>
        <div className="col-span-1">
          <BentoImageCard
            src={images[4].src}
            alt={t(bentoTranslationKeys[images[4].altKey])}
            title={images[4].altKey}
          />
        </div>
      </div>
    </div>
  );
}

interface BentoImageCardProps {
  src: string;
  alt: string;
  title: string;
}

function BentoImageCard({src, alt, title}: BentoImageCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl h-[22rem] w-full bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
          priority
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 p-2 bg-gray-100/70 w-full">
          <h3 className="text-base text-center uppercase font-bold text-gray-800">
            {title.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function HomeBento() {
  return <BentoGrid images={imagesBento} />;
}
