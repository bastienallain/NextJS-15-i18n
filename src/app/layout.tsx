import {Metadata} from 'next';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

// Base URL for the site
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://advmfr.com';

// Define metadata for the root layout
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Advance Jewelry Manufacturers',
    default: 'Advance Jewelry Manufacturers'
  },
  description:
    'Advance Jewelry Manufacturers - High-quality jewelry manufacturing services',
  icons: {
    icon: '/favicon.ico'
  }
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
  return children;
}
