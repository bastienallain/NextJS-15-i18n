import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations('manifest');

  return {
    name: t('name'),
    short_name: t('short_name'),
    description: t('description'),
    start_url: t('start_url'),
    display: 'standalone' as const,
    background_color: t('background_color'),
    theme_color: t('theme_color'),
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
