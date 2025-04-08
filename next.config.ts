import createNextIntlPlugin from 'next-intl/plugin';

import { withContentCollections } from '@content-collections/next';

import type {NextConfig} from 'next';
const withNextIntl = createNextIntlPlugin({});

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com'
      }
    ]
  }
};

// withContentCollections must be the outermost plugin
export default withContentCollections(withNextIntl(config));
