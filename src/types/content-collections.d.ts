declare module 'content-collections' {
  export interface BlogPost {
    title: string;
    description: string;
    date: string;
    locale: string;
    heroImage?: string;
    author?: string;
    tags?: string[];
    category?: string;
    slug?: string;
    canonicalUrl?: string;
    robots?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterCard?: string;
    keywords?: string[];
    lastmod?: string;
    _meta: {
      path: string;
    };
  }

  export const allBlogs: BlogPost[];
}
