import { Locale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode, use } from 'react';

import { routing } from '@/i18n/routing';

type Props = {
  params: Promise<{locale: Locale}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const t = await getTranslations('meta');
  return {
    title: t('home.title'),
    description: t('home.description')
  };
}

export default function IndexPage({params}: Props) {
  const {locale} = use(params);
  setRequestLocale(locale);
  const t = useTranslations('home');

  return (
    <div>
      <div className="max-w-[590px]">
        {t.rich('description', {
          p: (chunks: ReactNode) => <p>{chunks}</p>,
          code: (chunks: ReactNode) => (
            <code className="font-mono text-white">{chunks}</code>
          ),
          retry: (chunks: ReactNode) => <a href="#">{chunks}</a>
        })}
      </div>
    </div>
  );
}
