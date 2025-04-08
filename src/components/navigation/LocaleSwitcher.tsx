import {useLocale, useTranslations} from 'next-intl';

import {LocaleSwitcherSelect} from '@/components/navigation';
import {routing} from '@/i18n/routing';

interface LocaleSwitcherProps {
  pathname?: string;
  pathnameOverride?: Record<string, string>;
}

export default function LocaleSwitcher({ 
  pathname,
  pathnameOverride 
}: LocaleSwitcherProps = {}) {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('localeSwitcher.label')}
      className="z-50"
      pathname={pathname}
      pathnameOverride={pathnameOverride}
    >
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t(`localeSwitcher.${cur}`)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
