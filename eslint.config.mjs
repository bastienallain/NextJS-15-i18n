import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-len': ['error', { 
        'code': 80, 
        'tabWidth': 2, 
        'ignoreComments': true, 
        'ignoreUrls': true, 
        'ignoreStrings': true, 
        'ignoreTemplateLiterals': true 
      }]
    }
  }
];

export default eslintConfig;