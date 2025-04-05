declare module 'contentlayer/source-files' {
  export function defineDocumentType(options: any): any;
  export function makeSource(options: any): any;
}

declare module 'contentlayer/generated' {
  export interface BlogPost {
    id: string;
    title: string;
    description: string;
    heroImage: string;
    date: string;
    locale: string;
    slug: string;
    url: string;
    alternateUrls: Record<string, string>;
    body: {
      code: string;
    };
  }

  export const allBlogPosts: BlogPost[];
}

declare module 'next-contentlayer/hooks' {
  export function useMDXComponent(code: string): React.ComponentType;
}