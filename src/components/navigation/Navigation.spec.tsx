import {render} from '@testing-library/react';
import {NextIntlClientProvider} from 'next-intl';
import {Navigation} from '@/components/navigation';

// If the tested component uses features from Next.js, you have to mock them.
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn()
  }),
  useParams: () => ({locale: 'en'}),
  useSelectedLayoutSegment: () => ({locale: 'en'})
}));

// Create mock messages
const mockMessages = {
  common: {
    navigation: {
      home: 'Home',
      pathnames: 'Pathnames'
    },
    localeSwitcher: {
      label: 'Language'
    }
  }
};

it('renders', () => {
  render(
    <NextIntlClientProvider locale="en" messages={mockMessages as any}>
      <Navigation />
    </NextIntlClientProvider>
  );
});
