import { useTranslations } from "next-intl";

import { OptimizedImage } from "@/components/ui/optimized-image";

import { ShinyButton } from "../magicui/shiny-button";
import { NavigationLink } from "../navigation";

export default function HomeHero() {
  const t = useTranslations("home");

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="lg:mx-auto lg:max-w-2xl lg:flex-none lg:py-32">
          <div className="max-w-xl lg:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <NavigationLink href="/about-us">
                <ShinyButton>{t("ctaOne")}</ShinyButton>
              </NavigationLink>
            </div>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8 lg:h-full">
          <OptimizedImage
            src="/home/hero.webp"
            alt={t("heroImage")}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            className="lg:aspect-3/2 w-full aspect-square object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
}
