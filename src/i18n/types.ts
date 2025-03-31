export type Messages = {
  Error: {
    description: string;
    title: string;
  };
  home: {
    title: string;
    description: string;
  };
  common: Record<string, string>;
  pathname: Record<string, string>;
  meta: {
    layout?: {
      title: string;
      description: string;
    };
  };
};
