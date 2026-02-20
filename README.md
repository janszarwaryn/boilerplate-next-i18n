# Next.js i18n Boilerplate

A production-ready Next.js starter template with internationalization, dark mode, and SEO.

## Tech Stack

| Technology   | Version     | Role                                                 |
| ------------ | ----------- | ---------------------------------------------------- |
| Next.js      | 16.x        | Framework (App Router, Turbopack, Server Components) |
| React        | 19.x        | UI library                                           |
| TypeScript   | strict      | Type safety                                          |
| Tailwind CSS | v4          | CSS-first configuration                              |
| shadcn/ui    | latest      | UI components (Radix UI)                             |
| next-intl    | 4.x         | Internationalization with App Router                 |
| next-themes  | latest      | Dark/light/system theme switching                    |
| ESLint       | flat config | Linting                                              |
| Prettier     | latest      | Code formatting                                      |

## Supported Languages

| Code | Language          | URL prefix |
| ---- | ----------------- | ---------- |
| `en` | English (default) | `/en/...`  |
| `pl` | Polski            | `/pl/...`  |
| `de` | Deutsch           | `/de/...`  |

All routes always include a locale prefix.

## Getting Started

```bash
# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Lint code
yarn lint

# Format code
yarn format
```

**Required:** Node.js >= 22 (see `.nvmrc`)

## Project Structure

```
├── messages/                # Translation files (JSON)
│   ├── en.json
│   ├── pl.json
│   └── de.json
├── src/
│   ├── app/
│   │   ├── [locale]/        # Locale-specific routes
│   │   │   ├── about/
│   │   │   │   └── page.tsx  # About page (breadcrumbs, card)
│   │   │   ├── error.tsx     # Error boundary
│   │   │   ├── layout.tsx    # Main layout (SEO, providers, header/footer)
│   │   │   ├── loading.tsx   # Loading spinner
│   │   │   └── page.tsx      # Home page
│   │   ├── globals.css       # Tailwind v4 + shadcn/ui theme variables
│   │   ├── layout.tsx        # Root layout (minimal wrapper)
│   │   ├── page.tsx          # Redirects / → /en
│   │   ├── sitemap.ts        # Dynamic sitemap with locale alternates
│   │   └── robots.ts         # robots.txt configuration
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (button, card, sheet, etc.)
│   │   ├── footer.tsx        # Site footer with copyright
│   │   ├── header.tsx        # Responsive header (logo, nav, theme, lang)
│   │   ├── language-switcher.tsx  # Locale dropdown
│   │   ├── mobile-nav.tsx    # Mobile hamburger menu (Sheet)
│   │   ├── theme-provider.tsx # next-themes wrapper
│   │   └── theme-toggle.tsx  # Dark/light/system toggle
│   ├── i18n/
│   │   ├── config.ts         # Locales, default locale, Locale type
│   │   ├── routing.ts        # next-intl routing configuration
│   │   ├── request.ts        # Server-side request config
│   │   └── navigation.ts     # Typed Link, useRouter, usePathname, getPathname
│   ├── lib/
│   │   ├── constants.ts      # Env constants (SITE_URL, SITE_NAME, etc.), NAV_LINKS
│   │   └── utils.ts          # cn() utility
│   ├── types/
│   │   └── next-intl.d.ts    # Typed translations
│   └── proxy.ts               # Locale detection proxy (routing)
├── components.json            # shadcn/ui configuration
├── next.config.ts             # Next.js config with next-intl plugin
└── tsconfig.json
```

## Adding a New Language

1. Add the locale code to `src/i18n/config.ts`:

```ts
export const locales = ['en', 'pl', 'de', 'fr'] as const;
```

2. Create `messages/fr.json` with the same key structure as `messages/en.json`.

3. Add the language name to the `LanguageSwitcher` namespace in all existing translation files:

```json
"LanguageSwitcher": {
  "en": "English",
  "pl": "Polski",
  "de": "Deutsch",
  "fr": "Français"
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Components are installed to `src/components/ui/`.

## Theme Customization

The UI theme is managed via CSS variables in `src/app/globals.css`. Both light and dark mode variables are defined there.

### Visual editor (tweakcn)

Use [tweakcn](https://tweakcn.com) to visually customize colors, spacing, shadows, and fonts:

```bash
npx shadcn@latest add https://tweakcn.com/r/themes/[theme-id]
```

This updates `globals.css` with new CSS variables for both modes. Browse themes at [tweakcn.com](https://tweakcn.com) or see the [tweakcn docs](https://tweakcn.com/docs).

### Manual customization

Edit the `:root` (light) and `.dark` sections in `globals.css` directly. Key variables:

| Variable       | Purpose                |
| -------------- | ---------------------- |
| `--background` | Page background color  |
| `--foreground` | Default text color     |
| `--primary`    | Primary accent color   |
| `--muted`      | Muted background       |
| `--border`     | Border color           |
| `--radius`     | Border radius base     |
| `--font-sans`  | Sans-serif font family |
| `--font-mono`  | Monospace font family  |

All colors use the oklch color space.

## Fonts

The project uses [Google Fonts](https://fonts.google.com/) loaded via `next/font/google` in `src/app/[locale]/layout.tsx`:

| Font      | Variable           | Usage       |
| --------- | ------------------ | ----------- |
| Afacad    | `--font-afacad`    | `font-sans` |
| Fira Code | `--font-fira-code` | `font-mono` |

To change fonts, update the imports and variables in `layout.tsx` and the `--font-sans` / `--font-mono` mappings in `globals.css`.

## Dark Mode

Dark mode uses `next-themes` with the `class` strategy. The `<html>` element gets a `dark` class, which Tailwind picks up via `@custom-variant dark (&:is(.dark *))` in `globals.css`.

**Configuration** is in `src/app/[locale]/layout.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
```

**Options:**

- `defaultTheme="system"` - follows OS preference (change to `"light"` or `"dark"` for a fixed default)
- `enableSystem` - enables system preference detection
- `disableTransitionOnChange` - prevents transition flicker on switch

The toggle component is at `src/components/theme-toggle.tsx`. It provides Light / Dark / System options via a dropdown.

## SEO

The boilerplate includes a full SEO setup:

| Feature         | Location                                        |
| --------------- | ----------------------------------------------- |
| Meta title/desc | `generateMetadata` in layout.tsx                |
| Open Graph      | `openGraph` in generateMetadata                 |
| Canonical URL   | `alternates.canonical`                          |
| hreflang        | `alternates.languages`                          |
| JSON-LD         | `<script type="application/ld+json">` in layout |
| Sitemap         | `src/app/sitemap.ts`                            |
| robots.txt      | `src/app/robots.ts`                             |

### Configuration

All environment variables are defined in `.env` (copy from `.env.example`):

| Variable                  | Purpose                                             |
| ------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Canonical site URL (used in meta, sitemap, JSON-LD) |
| `NEXT_PUBLIC_SITE_NAME`   | Site name displayed in header logo                  |
| `NEXT_PUBLIC_AUTHOR_URL`  | Footer credit link URL                              |
| `NEXT_PUBLIC_AUTHOR_NAME` | Footer credit link text                             |

For production, update `.env` with your real values.

### Adding pages to sitemap

Edit `src/app/sitemap.ts` and add routes to the `routes` array:

```ts
const routes = ['', '/about', '/your-new-route'];
```

Locale alternates are generated automatically for all routes.

## State Management

This boilerplate doesn't include a state management library - `next-intl` handles locale state and `next-themes` handles theme state, so there's nothing extra needed out of the box.

When your project grows and you need global client state, choose based on your needs:

|                        | [Zustand](https://github.com/pmndrs/zustand) | [Jotai](https://github.com/pmndrs/jotai) | React Context       | [Redux Toolkit](https://redux-toolkit.js.org/) |
| ---------------------- | -------------------------------------------- | ---------------------------------------- | ------------------- | ---------------------------------------------- |
| **Bundle size**        | 1.2 kB                                       | 0.9 kB                                   | 0 kB (built-in)     | 11 kB                                          |
| **Boilerplate**        | Minimal                                      | Minimal                                  | Medium              | Heavy                                          |
| **Learning curve**     | Low                                          | Low                                      | Low                 | High                                           |
| **DevTools**           | Yes                                          | Yes                                      | React DevTools      | Redux DevTools                                 |
| **Providers needed**   | No                                           | No                                       | Yes                 | Yes                                            |
| **SSR/RSC compatible** | Yes                                          | Yes                                      | Yes                 | Yes                                            |
| **Best for**           | Most apps                                    | Fine-grained reactivity                  | Simple/rare updates | Large teams, complex state                     |
| **Install**            | `yarn add zustand`                           | `yarn add jotai`                         | -                   | `yarn add @reduxjs/toolkit react-redux`        |

**Recommendation: [Zustand](https://github.com/pmndrs/zustand)** - zero boilerplate, no providers, works naturally alongside Server Components. Use stores only in `'use client'` components.

```ts
// src/stores/my-store.ts
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
```

**When to pick something else:**

- **Jotai** - if you need atom-level granularity (e.g., a complex form with many independent fields)
- **React Context** - if you have 1-2 values that rarely change (e.g., a user object)
- **Redux Toolkit** - if your team already knows Redux or you need time-travel debugging

## Key Conventions

- Use `Link` from `@/i18n/navigation` instead of `next/link` for locale-aware links.
- Use `useRouter` from `@/i18n/navigation` instead of `next/navigation` for locale-aware routing.
- Use `useTranslations` from `next-intl` in components.
- Use `getTranslations` from `next-intl/server` in async server components and `generateMetadata`.
- All pages go inside `src/app/[locale]/`.
- In Next.js 16, `params` is a `Promise` - always `await` it.
- All user-facing text must be in `messages/*.json` - no hardcoded strings.
