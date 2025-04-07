'use client';

import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import Script from 'next/script';

import {routing} from '@/i18n/routing';

interface SeoPageProps {
  /**
   * Le titre de la page
   */
  title: string;
  /**
   * La description de la page
   */
  description: string;
  /**
   * Les mots-clés de la page
   */
  keywords?: string[];
  /**
   * L'URL canonique de la page (optionnelle)
   */
  canonicalUrl?: string;
  /**
   * Les URLs alternatives pour les autres langues (optionnel)
   */
  alternateUrls?: Record<string, string>;
  /**
   * L'image Open Graph (optionnelle)
   */
  ogImage?: string;
  /**
   * Le titre Open Graph (optionnel)
   */
  ogTitle?: string;
  /**
   * La description Open Graph (optionnelle)
   */
  ogDescription?: string;
  /**
   * Le type Open Graph (optionnel, par défaut: 'website')
   */
  ogType?: 'website' | 'article' | 'product' | 'profile';
  /**
   * La locale par défaut (optionnelle, par défaut: 'en')
   */
  defaultLocale?: string;
  /**
   * Les données structurées pour les rich snippets (optionnel)
   */
  structuredData?: Record<string, any>;
  /**
   * Le type de page pour les rich snippets (optionnel)
   */
  pageType?: 'WebPage' | 'Article' | 'Product' | 'Organization' | 'Person';
}

export default function SeoPage({
  title,
  description,
  keywords = [],
  canonicalUrl,
  alternateUrls = {},
  ogImage,
  ogTitle,
  ogDescription,
  ogType = 'website',
  defaultLocale = 'en',
  structuredData,
  pageType = 'WebPage'
}: SeoPageProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

  // Générer l'URL canonique si elle n'est pas fournie
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}/${locale}${pathname}`;

  // Générer les balises hreflang pour chaque locale
  const hreflangTags = routing.locales.map((loc) => {
    // Si nous avons une URL alternative pour cette locale, utilisez-la
    if (alternateUrls[loc]) {
      return `
        const hreflangLink${loc} = document.createElement('link');
        hreflangLink${loc}.rel = 'alternate';
        hreflangLink${loc}.hrefLang = '${loc}';
        hreflangLink${loc}.href = '${alternateUrls[loc]}';
        document.head.appendChild(hreflangLink${loc});
      `;
    }

    // Sinon, générez une URL basée sur le chemin actuel
    const alternatePath = pathname.replace(`/${locale}`, `/${loc}`);
    return `
      const hreflangLink${loc} = document.createElement('link');
      hreflangLink${loc}.rel = 'alternate';
      hreflangLink${loc}.hrefLang = '${loc}';
      hreflangLink${loc}.href = '${siteUrl}${alternatePath}';
      document.head.appendChild(hreflangLink${loc});
    `;
  });

  // Ajouter une balise x-default qui pointe vers la version par défaut
  const xDefaultUrl =
    alternateUrls[defaultLocale] ||
    `${siteUrl}/${defaultLocale}${pathname.replace(`/${locale}`, `/${defaultLocale}`)}`;

  // Générer les balises meta pour les mots-clés
  const keywordsMeta =
    keywords.length > 0
      ? `
    const keywordsMeta = document.createElement('meta');
    keywordsMeta.name = 'keywords';
    keywordsMeta.content = '${keywords.join(', ')}';
    document.head.appendChild(keywordsMeta);
  `
      : '';

  // Générer les balises meta pour Open Graph
  const ogTags = `
    const ogTitleMeta = document.createElement('meta');
    ogTitleMeta.property = 'og:title';
    ogTitleMeta.content = '${ogTitle || title}';
    document.head.appendChild(ogTitleMeta);

    const ogDescriptionMeta = document.createElement('meta');
    ogDescriptionMeta.property = 'og:description';
    ogDescriptionMeta.content = '${ogDescription || description}';
    document.head.appendChild(ogDescriptionMeta);

    const ogTypeMeta = document.createElement('meta');
    ogTypeMeta.property = 'og:type';
    ogTypeMeta.content = '${ogType}';
    document.head.appendChild(ogTypeMeta);

    const ogUrlMeta = document.createElement('meta');
    ogUrlMeta.property = 'og:url';
    ogUrlMeta.content = '${fullCanonicalUrl}';
    document.head.appendChild(ogUrlMeta);

    ${
      ogImage
        ? `
    const ogImageMeta = document.createElement('meta');
    ogImageMeta.property = 'og:image';
    ogImageMeta.content = '${ogImage}';
    document.head.appendChild(ogImageMeta);
    `
        : ''
    }
  `;

  // Générer les données structurées pour les rich snippets
  const structuredDataScript = structuredData
    ? `
    const structuredDataScript = document.createElement('script');
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.text = JSON.stringify(${JSON.stringify(structuredData)});
    document.head.appendChild(structuredDataScript);
  `
    : '';

  // Générer les données structurées par défaut si aucune n'est fournie
  const defaultStructuredData = !structuredData
    ? `
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': '${pageType}',
      'headline': '${title}',
      'description': '${description}',
      'url': '${fullCanonicalUrl}',
      'inLanguage': '${locale}',
      'publisher': {
        '@type': 'Organization',
        'name': 'Advance Jewelry Manufacturers',
        'logo': {
          '@type': 'ImageObject',
          'url': '${siteUrl}/images/logo.png'
        }
      }
    };
    
    const defaultStructuredDataScript = document.createElement('script');
    defaultStructuredDataScript.type = 'application/ld+json';
    defaultStructuredDataScript.text = JSON.stringify(defaultStructuredData);
    document.head.appendChild(defaultStructuredDataScript);
  `
    : '';

  return (
    <Script id="seo-tags" strategy="afterInteractive">
      {`
        // Ajouter la balise canonique
        const canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        canonicalLink.href = '${fullCanonicalUrl}';
        document.head.appendChild(canonicalLink);
        
        // Ajouter les balises hreflang
        ${hreflangTags.join('\n')}
        
        // Ajouter la balise x-default
        const xDefaultLink = document.createElement('link');
        xDefaultLink.rel = 'alternate';
        xDefaultLink.hrefLang = 'x-default';
        xDefaultLink.href = '${xDefaultUrl}';
        document.head.appendChild(xDefaultLink);

        // Ajouter les balises meta pour les mots-clés
        ${keywordsMeta}

        // Ajouter les balises meta pour Open Graph
        ${ogTags}

        // Ajouter les données structurées
        ${structuredDataScript}
        ${defaultStructuredData}
      `}
    </Script>
  );
}
