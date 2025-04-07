import {useTranslations} from 'next-intl';

import SvgAdvm from '@/components/Icons/brand';
import NavigationLink from '@/components/navigation/NavigationLink';
import {Input} from '@/components/ui/input';

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    name: 'Messenger',
    href: '#',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.145 2 11.259c0 2.913 1.454 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm1.008 12.445l-2.54-2.709-4.953 2.709 5.445-5.79 2.603 2.709 4.89-2.709-5.445 5.79z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    )
  },
  {
    name: 'X',
    href: '#',
    icon: (props: React.ComponentProps<'svg'>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    )
  }
];

export default function Footer() {
  const t = useTranslations('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="mx-auto w-full px-6 pt-16 pb-8 sm:pt-24 lg:px-[10vw] lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="flex items-center">
            <SvgAdvm className="h-9 lg:h-24 text-brand" />{' '}
            <h3 className="text-sm/6 font-semibold text-foreground">
              {t('footer.company.title')}
            </h3>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-foreground">
                  {t('footer.services.title')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <NavigationLink
                      href="/about-us"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.company.about')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/production"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.company.production')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/sustainability"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.company.sustainability')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/contact"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.company.contact')}
                    </NavigationLink>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <NavigationLink
                      href="/design"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.services.design')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/refining"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.services.refining')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/gallery"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.services.gallery')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/events"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.services.events')}
                    </NavigationLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-foreground">
                  {t('footer.resources.title')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.resources.documentation')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.resources.guides')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.resources.blog')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.resources.press')}
                    </NavigationLink>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-foreground">
                  {t('footer.legal.title')}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.legal.privacy')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.legal.terms')}
                    </NavigationLink>
                  </li>
                  <li>
                    <NavigationLink
                      href="/"
                      className="text-sm/6 text-muted-foreground hover:text-brand uppercase hover:uppercase transition-all duration-200"
                    >
                      {t('footer.legal.cookies')}
                    </NavigationLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-foreground">
              {t('footer.newsletter.title')}
            </h3>
            <p className="mt-2 text-sm/6 text-muted-foreground">
              {t('footer.newsletter.description')}
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              {t('footer.newsletter.placeholder')}
            </label>
            <Input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder={t('footer.newsletter.placeholder')}
              autoComplete="email"
              className="w-full min-w-0 sm:w-56"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-brand px-3 py-2 text-sm text-white uppercase font-semibold text-background shadow-xs hover:bg-brand/30 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {t('footer.newsletter.button')}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-border pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-brand transition-colors duration-200"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-muted-foreground md:order-1 md:mt-0">
            © {currentYear} Advance Jewelry Manufacturers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
