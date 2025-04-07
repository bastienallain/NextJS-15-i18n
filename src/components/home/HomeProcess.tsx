"use client";

import "swiper/css";
import "swiper/css/effect-fade";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const featuresProcess = [
  {
    description: "HomeProcess.textCardOne" as const,
    imagePath: "/home/jewelry-design-team.webp",
    imageAlt: "HomeProcess.imgAltOne" as const,
  },
  {
    description: "HomeProcess.textCardTwo" as const,
    imagePath: "/home/CAD-jewelry.webp",
    imageAlt: "HomeProcess.imgAltTwo" as const,
  },
  {
    description: "HomeProcess.textCardThree" as const,
    imagePath: "/home/jewelry-sampling.webp",
    imageAlt: "HomeProcess.imgAltThree" as const,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomeProcess() {
  const t = useTranslations("home");

  return (
    <div className="bg-white text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            {t("HomeProcess.title")}{" "}
            <span className="text-brand">{t("HomeProcess.span")}</span>
          </h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {featuresProcess.map((feature, index) => (
              <motion.div key={index} variants={item} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="mb-6 flex size-72 items-center mx-auto justify-center rounded-lg bg-white">
                    <Image
                      src={feature.imagePath}
                      alt={t(feature.imageAlt)}
                      width={280}
                      height={280}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      priority={index === 0}
                      className="object-cover"
                    />
                  </div>
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-xl text-gray-800">
                  <p className="flex-auto">{t(feature.description)}</p>
                  <p className="mt-6"></p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}
