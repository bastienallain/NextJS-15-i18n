'use client';

import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import Script from 'next/script';

import {routing} from '@/i18n/routing';

interface HreflangTagsClientProps {
  canonicalUrl?: string;
  alternateUrls?: Record<string, string>;
  defaultLocale?: string;
}

export default function HreflangTagsClient({
  canonicalUrl,
  alternateUrls = {},
  defaultLocale = 'en'
}: HreflangTagsClientProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

  // Générer l'URL canonique si elle n'est pas fournie
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}/${locale}${pathname}`;

  // Générer les balises hreflang pour chaque locale
  const hreflangTags = routing.locales.map((loc) => {
    // Si nous avons une URL alternative pour cette locale, utilisez-la
    if (alternateUrls[loc]) {
      return (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={alternateUrls[loc]}
        />
      );
    }

    // Sinon, générez une URL basée sur le chemin actuel
    const alternatePath = pathname.replace(`/${locale}`, `/${loc}`);
    return (
      <link
        key={loc}
        rel="alternate"
        hrefLang={loc}
        href={`${siteUrl}${alternatePath}`}
      />
    );
  });

  // Ajouter une balise x-default qui pointe vers la version par défaut
  const xDefaultUrl =
    alternateUrls[defaultLocale] ||
    `${siteUrl}/${defaultLocale}${pathname.replace(`/${locale}`, `/${defaultLocale}`)}`;

  // Utiliser un script pour injecter les balises dans le head
  return (
    <Script id="hreflang-tags" strategy="afterInteractive">
      {`
        // Ajouter la balise canonique
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = '${fullCanonicalUrl}';
        document.head.appendChild(canonicalLink);
        
        // Ajouter les balises hreflang
        ${routing.locales
          .map((loc) => {
            if (alternateUrls[loc]) {
              return `
              const hreflangLink${loc} = document.createElement('link');
              hreflangLink${loc}.rel = 'alternate';
              hreflangLink${loc}.hrefLang = '${loc}';
              hreflangLink${loc}.href = '${alternateUrls[loc]}';
              document.head.appendChild(hreflangLink${loc});
            `;
            } else {
              const alternatePath = pathname.replace(`/${locale}`, `/${loc}`);
              return `
              const hreflangLink${loc} = document.createElement('link');
              hreflangLink${loc}.rel = 'alternate';
              hreflangLink${loc}.hrefLang = '${loc}';
              hreflangLink${loc}.href = '${siteUrl}${alternatePath}';
              document.head.appendChild(hreflangLink${loc});
            `;
            }
          })
          .join('\n')}
        
        // Ajouter la balise x-default
        const xDefaultLink = document.createElement('link');
        xDefaultLink.rel = 'alternate';
        xDefaultLink.hrefLang = 'x-default';
        xDefaultLink.href = '${xDefaultUrl}';
        document.head.appendChild(xDefaultLink);
      `}
    </Script>
  );
}
