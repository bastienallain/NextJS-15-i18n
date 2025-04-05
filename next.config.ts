import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import {withContentlayer} from 'next-contentlayer';

const withNextIntl = createNextIntlPlugin({});

const config: NextConfig = {
  // Add any additional Next.js configuration here
  experimental: {
    // This enables older compatibility mode for contentlayer
    serverComponentsExternalPackages: ['contentlayer']
  }
};

export default withNextIntl(withContentlayer(config));
