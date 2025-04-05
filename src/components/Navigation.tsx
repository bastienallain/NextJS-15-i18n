import {useTranslations} from 'next-intl';

import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('common');

  return (
    <div className="bg-slate-850">
      <nav className="container flex justify-between p-2 text-white">
        <div>
          <NavigationLink href="/">{t('navigation.home')}</NavigationLink>
          <NavigationLink href="/pathnames">
            {t('navigation.pathnames')}
          </NavigationLink>
          <NavigationLink href="/blog">{t('navigation.blog')}</NavigationLink>
        </div>
        <LocaleSwitcher />
      </nav>
    </div>
  );
}
