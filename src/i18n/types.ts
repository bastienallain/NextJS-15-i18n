// Type générique pour les sections de contenu
export type ContentSection = {
  title: string;
  content: string;
  additional?: string;
  special?: string;
  specialContent?: string;
};

// Type générique pour les instructions de soin
export type CareInstructions = {
  title: string;
  items: string[];
};

// Define available namespaces
export type Namespace = keyof Messages;

// Type for translation keys with namespace
export type NamespacedMessageKeys<T, N extends keyof T> = keyof T[N];

// Type for translation function
export type TranslationFunction = {
  (key: NamespacedMessageKeys<Messages, Namespace>): string;
  raw: (key: NamespacedMessageKeys<Messages, Namespace>) => any;
};

// Structure générique pour le contenu d'un post
export interface GenericPostContent {
  // Métadonnées de base
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  authorImage: string;
  date: string;

  // Contenu structuré
  content: {
    [key: string]: any;
  };

  // Sections de contenu
  sections: {
    [key: string]: {
      title: string;
      content: string;
      additional?: string;
      special?: string;
      specialContent?: string;
    };
  };

  // Table des matières
  toc: {
    [key: string]: string;
  };
}

// Type générique pour les messages de traduction
export type GenericMessages = {
  [key: string]: {
    title: string;
    description: string;
    content: GenericPostContent;
    sections: {
      title: string;
      imageAlt: string;
      intro: string;
      [key: string]: any;
    };
    care: {
      title: string;
      [key: string]: any;
    };
    shipping: {
      australia: string;
      international: string;
    };
    toc: {
      title: string;
      [key: string]: string;
    };
  };
};

// Type pour les messages de traduction
export type Messages = {
  Error: {
    description: string;
    title: string;
  };
  home: {
    title: string;
    subtitle: string;
    description: string;
    AboutTitle: string;
    AboutText: string;
    AboutCtaText: string;
    HomeAboutImg: string;
    ctaOne: string;
    ctaTwo: string;
    galleryTitle: string;
    gallerySpan: string;
    galleryText: string;
    mopJewelry: string;
    pearlJewelry: string;
    diamondJewelry: string;
    goldJewelry: string;
    pinkGoldJewelry: string;
    secretTitle: string;
    secretText: string;
    secretTextImg: string;
    heroImage: string;
    HomeProcess: {
      title: string;
      span: string;
      textCardOne: string;
      textCardTwo: string;
      textCardThree: string;
      imgAltOne: string;
      imgAltTwo: string;
      imgAltThree: string;
    };
    bento: {
      waxDepartment: string;
      jewelryPolishing: string;
      jewelryEnamelling: string;
      cadPrinter: string;
      diamondSettings: string;
    };
  };
  common: {
    footer: {
      resources: {
        title: string;
        documentation: string;
        guides: string;
        blog: string;
        press: string;
      };
      legal: {
        title: string;
        privacy: string;
        terms: string;
        cookies: string;
      };
      newsletter: {
        title: string;
        description: string;
        placeholder: string;
        button: string;
      };
      copyright: string;
      company: {
        title: string;
        about: string;
        production: string;
        sustainability: string;
        contact: string;
      };
      services: {
        title: string;
        design: string;
        refining: string;
        gallery: string;
        events: string;
      };
    };
    notFound: {
      title: string;
      description: string;
    };
    localeSwitcher: {
      label: string;
      en: string;
      fr: string;
      de: string;
    };
    navigation: {
      home: string;
      about: string;
      production: string;
      design: string;
      gallery: string;
      events: string;
      sustainability: string;
      refining: string;
      contact: string;
      blog: string;
    };
  };
  aboutUs: {
    pageTitle: string;
    pageSubtitle: string;
    ourStory: string;
    ourStoryContent: string;
    ourPhilosophy: string;
    innovationTraditionIntegrity: string;
    ourPhilosophyContent: string;
    ourVision: string;
    thaiCraftsmanshipItalianGerman: string;
    ourVisionContent: string;
    ourTeam: string;
    ourTeamQuote: string;
    ourTeamContent: string;
    imageAlts: {
      philosophyImage: string;
      teamWorkImage: string;
      teamImage1: string;
      teamImage2: string;
      teamImage3: string;
      teamImage4: string;
    };
  };
  meta: {
    layout?: {
      title: string;
      description: string;
    };
  };
  manifest: {
    name: string;
    short_name: string;
    description: string;
    start_url: string;
    background_color: string;
    theme_color: string;
    icons: Array<{
      src: string;
      sizes: string;
      type: string;
    }>;
  };
  blog: {
    title: string;
    description: string;
    readMore: string;
    publishedOn: string;
    author: string;
    posts: {
      [key: string]: {
        title: string;
        description: string;
        content: string;
        author: string;
        authorImage: string;
        date: string;
        thumbnail: string;
      };
    };
  };
};
