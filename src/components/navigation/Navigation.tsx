'use client';

import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useState} from 'react';

import {LocaleSwitcher, NavigationLink} from '@/components/navigation';
import {Dialog, DialogPanel} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';

import SvgAdvm from '../Icons/brand';

type NavItem = {
  name: string;
  href:
    | '/'
    | '/about-us'
    | '/production'
    | '/design'
    | '/gallery'
    | '/events'
    | '/sustainability'
    | '/refining'
    | '/contact'
    | '/blog';
};

export default function Navigation() {
  const t = useTranslations('common');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navItems: NavItem[] = [
    {name: t('navigation.about'), href: '/about-us'},
    {name: t('navigation.production'), href: '/production'},
    {name: t('navigation.design'), href: '/design'},
    {name: t('navigation.gallery'), href: '/gallery'},
    {name: t('navigation.events'), href: '/events'},
    {name: t('navigation.sustainability'), href: '/sustainability'},
    {name: t('navigation.refining'), href: '/refining'},
    {name: t('navigation.contact'), href: '/contact'},
    {name: t('navigation.blog'), href: '/blog'}
  ];

  return (
    <header className="bg-white fixed w-full z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between px-4 lg:px-6 lg:py-1"
      >
        <div className="flex lg:flex-none">
          <NavigationLink href="/" className="flex items-center">
            <span className="sr-only">ADV</span>
            <SvgAdvm className="h-16 lg:h-20" />
            <div className="text-gray-500 ml-4">
              <div className="italic font-bold">Advance</div>
              <div>Manufacturers</div>
            </div>
          </NavigationLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6 items-center">
          {navItems.map((item, idx) => (
            <div
              key={item.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <NavigationLink
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-900 rounded-full hover:bg-brand/5"
              >
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-brand/10"
                  initial={{opacity: 0}}
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0,
                    transition: {
                      duration: 0.2,
                      ease: 'easeInOut'
                    }
                  }}
                />
                <span className="relative z-20">{item.name}</span>
              </NavigationLink>
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-none items-center ml-6">
          <LocaleSwitcher />
        </div>
      </nav>
      <Dialog
        open={isMobileMenuOpen}
        onClose={setIsMobileMenuOpen}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
              <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 translate-x-0">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex items-center justify-between px-6 py-6">
                    <NavigationLink href="/" className="-m-1.5 p-1.5">
                      <span className="sr-only">ADV</span>
                      <SvgAdvm className="h-16 lg:h-24" />{' '}
                      <div className="text-gray-500 ml-4">
                        <div className="italic font-bold">Advance</div>
                        <div>Manufacturers</div>
                      </div>
                    </NavigationLink>
                    <button
                      type="button"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>
                  <div className="mt-6 px-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {navItems.map((item) => (
                          <NavigationLink
                            key={item.href}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-brand/5 focus:bg-brand/5"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </NavigationLink>
                        ))}
                      </div>
                      <div className="py-6">
                        <LocaleSwitcher />
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
