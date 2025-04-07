# Next.js 15 with next-intl v4 Starter

A modern starter template for Next.js 15 with internationalization support using next-intl v4. This template provides a solid foundation for building scalable, internationalized web applications.

## Features

- 🚀 **Next.js 15** with App Router
- 🌍 **Internationalization** using next-intl v4
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive Design** out of the box
- 🔍 **SEO Optimized**
- 🎯 **TypeScript** for type safety
- ⚡ **Fast Refresh** enabled
- 🛠 **Modern Development Tools** (ESLint, Prettier)

## Branches

- `main`: Full featured template with example components and pages
- `skeleton`: Minimal starter with basic setup and structure

## Strategic Files

### Configuration Files

- `next.config.ts` - Next.js configuration with next-intl plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Internationalization

- `messages/` - Translation files organized by locale
  - `en/` - English translations
    - `common.json` - Common translations
    - `home.json` - Home page translations
    - `pathname.json` - URL path translations
    - `meta.json` - Meta information translations
  - `de/` - German translations (same structure as en)
- `src/i18n/` - Internationalization configuration
  - `navigation.ts` - Navigation utilities (Link, useRouter, etc.)
  - `request.ts` - Request configuration for server-side i18n
  - `routing.ts` - Routing configuration and pathnames
  - `types.ts` - TypeScript types for messages
- `middleware.ts` - Language routing middleware

### Core Structure

- `src/app/` - Main application routes
  - `[locale]/` - Localized routes
  - `layout.tsx` - Root layout
  - `page.tsx` - Home page
- `src/components/` - Reusable components
- `src/lib/` - Utility functions and shared logic

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bastienallain/NextJS-15-i18n.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
// NOTE: review all the ALT the our keyword

## Image Accessibility Guidelines

### Alt Text Standards

All images in the project should follow these guidelines for alt text:

1. Be descriptive and specific
2. Avoid starting with "Image of" or "Picture of"
3. Keep under 125 characters
4. Include relevant keywords naturally

### Current Alt Text Review Areas

The following components contain image alt text that should be reviewed:

- `HomeHero` - Hero banner image alt text
- `HomeAboutUs` - About section image descriptions
- `HomeGallery` - Product gallery image alt text
- `HomeProcess` - Process step images
- `HomeBento` - Manufacturing process images

### Common Issues to Check

1. Remove instances of "our" in alt text to maintain neutrality
2. Ensure consistent capitalization
3. Verify technical terms are spelled correctly
4. Confirm alt text matches the actual image content
5. Check for redundant descriptions
