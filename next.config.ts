import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({});

const config: NextConfig = {
  // Add any additional Next.js configuration here
};

export default withNextIntl(config);
