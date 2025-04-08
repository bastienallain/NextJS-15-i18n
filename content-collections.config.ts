import { z } from 'zod';

// @ts-ignore
import { defineConfig } from '@content-collections/core';

export default defineConfig({
  collections: [
    {
      name: 'blogs',
      // @ts-ignore
      schema: z.any(),
      source: 'data/content',
      output: '.content-collections/generated'
    }
  ]
});
