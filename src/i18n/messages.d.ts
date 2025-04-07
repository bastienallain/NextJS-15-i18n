type Messages = typeof import('../../messages/en/common.json') &
  typeof import('../../messages/en/home.json') &
  typeof import('../../messages/en/pathname.json') &
  typeof import('../../messages/en/meta.json') &
  typeof import('../../messages/en/aboutUs.json') &
  typeof import('../../messages/en/blog.json') &
  typeof import('../../messages/en/manifest.json');

declare interface IntlMessages extends Messages {}
