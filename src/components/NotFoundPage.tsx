import {useTranslations} from 'next-intl';

import PageLayout from './PageLayout';

export default function NotFoundPage() {
  const t = useTranslations('common');

  return (
    <PageLayout title={t('notFound.title')}>
      <p className="max-w-[460px]">{t('notFound.description')}</p>
    </PageLayout>
  );
}
