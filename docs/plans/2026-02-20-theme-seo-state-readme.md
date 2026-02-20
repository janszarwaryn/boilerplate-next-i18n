# Theme Toggle, SEO, Zustand & README Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add dark/light mode toggle, full SEO configuration, Zustand state management, and comprehensive README to the Next.js i18n boilerplate.

**Architecture:** next-themes handles theme persistence via class strategy on `<html>`. SEO uses Next.js built-in metadata API (generateMetadata, sitemap.ts, robots.ts) plus JSON-LD. Zustand provides lightweight client state with an example store. All user-facing strings are translated via next-intl.

**Tech Stack:** next-themes, zustand, Next.js Metadata API, JSON-LD (WebSite schema)

---

## Task 1: Cleanup — Remove unused code

**Files:**

- Modify: `src/i18n/config.ts` — remove `localeNames` (lines 6-10)
- Modify: `messages/en.json` — remove `LanguageSwitcher.label`
- Modify: `messages/pl.json` — remove `LanguageSwitcher.label`
- Modify: `messages/de.json` — remove `LanguageSwitcher.label`

**Step 1: Remove `localeNames` from config.ts**

Replace full file content with:

```ts
export const locales = ['en', 'pl', 'de'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];
```

**Step 2: Remove `LanguageSwitcher.label` from all message files**

In each of en.json, pl.json, de.json — remove the `"label"` line from the `LanguageSwitcher` namespace. The namespace should only contain locale keys (`en`, `pl`, `de`).

**Step 3: Verify**

Run: `yarn build`
Expected: Compiles successfully.

---

## Task 2: Install dependencies

**Step 1: Install next-themes and zustand**

Run: `yarn add next-themes zustand`

**Step 2: Verify**

Run: `yarn build`
Expected: Compiles successfully with new deps.

---

## Task 3: Theme toggle — translations

**Files:**

- Modify: `messages/en.json`
- Modify: `messages/pl.json`
- Modify: `messages/de.json`

**Step 1: Add ThemeToggle namespace to en.json**

```json
"ThemeToggle": {
  "light": "Light",
  "dark": "Dark",
  "system": "System",
  "toggleTheme": "Toggle theme"
}
```

**Step 2: Add ThemeToggle namespace to pl.json**

```json
"ThemeToggle": {
  "light": "Jasny",
  "dark": "Ciemny",
  "system": "Systemowy",
  "toggleTheme": "Zmień motyw"
}
```

**Step 3: Add ThemeToggle namespace to de.json**

```json
"ThemeToggle": {
  "light": "Hell",
  "dark": "Dunkel",
  "system": "System",
  "toggleTheme": "Design wechseln"
}
```

---

## Task 4: Theme toggle — ThemeProvider wrapper

**Files:**

- Create: `src/components/theme-provider.tsx`

**Step 1: Create the client wrapper**

Following shadcn/ui recommended pattern:

```tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

## Task 5: Theme toggle — ThemeToggle component

**Files:**

- Create: `src/components/theme-toggle.tsx`

**Step 1: Create the toggle component**

Client component with Sun/Moon icons and dropdown menu:

```tsx
'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations('ThemeToggle');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" aria-label={t('toggleTheme')}>
          <SunIcon className="size-4 scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute size-4 scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## Task 6: Theme toggle — integrate into layout and header

**Files:**

- Modify: `src/app/[locale]/layout.tsx` — wrap with ThemeProvider
- Modify: `src/components/header.tsx` — add ThemeToggle

**Step 1: Update layout.tsx**

Add import for ThemeProvider. Wrap the content inside `<NextIntlClientProvider>` with `<ThemeProvider>`:

```tsx
import { ThemeProvider } from '@/components/theme-provider';
```

Wrap inside body:

```tsx
<NextIntlClientProvider>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <a href="#main" className="...">
      {t('skipToContent')}
    </a>
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  </ThemeProvider>
</NextIntlClientProvider>
```

**Step 2: Update header.tsx**

Add ThemeToggle between Home link and LanguageSwitcher. Group the right-side items in a flex container:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="border-border border-b">
      <nav
        aria-label={t('ariaLabel')}
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link href="/" className="text-sm font-semibold">
          {t('home')}
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </nav>
    </header>
  );
}
```

**Step 3: Verify**

Run: `yarn build`
Expected: Compiles successfully.

---

## Task 7: SEO — metadataBase, Open Graph, canonical, hreflang

**Files:**

- Modify: `src/app/[locale]/layout.tsx` — expand generateMetadata
- Modify: `messages/en.json` — add Metadata.ogTitle (optional, reuse title)

**Step 1: Update generateMetadata in layout.tsx**

```tsx
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}`]),
      ),
    },
  };
}
```

No new translation keys needed — reuses existing `Metadata.title` and `Metadata.description`.

---

## Task 8: SEO — JSON-LD WebSite schema

**Files:**

- Modify: `src/app/[locale]/layout.tsx` — add JSON-LD script to body

**Step 1: Add JSON-LD inside the layout component**

After getting translations, build the JSON-LD object and inject it as a `<script>` tag inside `<body>`, before `<NextIntlClientProvider>`:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: t('title'), // reuse the Nav translations? No — use Metadata
  url: `${siteUrl}/${locale}`,
};
```

Wait — we need Metadata translations too. Since we already call `getTranslations` for Nav, add another call for Metadata:

```tsx
const tNav = await getTranslations({ locale, namespace: 'Nav' });
const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
```

Then in the JSX, before `<NextIntlClientProvider>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: tMeta('title'),
      url: `${siteUrl}/${locale}`,
    }),
  }}
/>
```

---

## Task 9: SEO — sitemap.ts

**Files:**

- Create: `src/app/sitemap.ts`

**Step 1: Create dynamic sitemap**

```ts
import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${siteUrl}/${locale}`]),
        ),
      },
    },
  ];
}
```

---

## Task 10: SEO — robots.ts

**Files:**

- Create: `src/app/robots.ts`

**Step 1: Create robots.txt**

```ts
import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

---

## Task 11: Zustand — example store

**Files:**

- Create: `src/stores/example-store.ts`

**Step 1: Create example counter store**

```ts
import { create } from 'zustand';

interface ExampleState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useExampleStore = create<ExampleState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

This file serves as a reference pattern. It is not used by any component — it demonstrates the Zustand convention for this project.

---

## Task 12: README — full rewrite

**Files:**

- Modify: `README.md`

**Step 1: Rewrite README with all sections**

The README should cover:

1. **Header** — project name, one-line description
2. **Tech Stack** — updated table with next-themes and zustand
3. **Supported Languages** — existing table
4. **Getting Started** — existing commands
5. **Project Structure** — updated tree with new files
6. **Adding a New Language** — updated (remove localeNames reference)
7. **Adding shadcn/ui Components** — existing
8. **Theme Customization** — expanded tweakcn section
9. **Dark Mode** — how ThemeToggle works, how to change default
10. **State Management** — Zustand pattern, example usage in components
11. **SEO Configuration** — what's included, how to set NEXT_PUBLIC_SITE_URL, JSON-LD, sitemap, robots
12. **Key Conventions** — updated with theme and store conventions

---

## Task 13: Final verification

**Step 1: Build**

Run: `yarn build`
Expected: No errors.

**Step 2: Lint**

Run: `yarn lint`
Expected: No errors.

**Step 3: Format**

Run: `yarn format`
Expected: All files formatted.
