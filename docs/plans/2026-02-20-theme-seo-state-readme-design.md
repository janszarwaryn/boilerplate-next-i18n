# Design: Theme Toggle, SEO, Zustand, README

## Context

The boilerplate has header/footer/navigation with i18n. It needs:

1. Dark/light mode toggle in header
2. Full SEO-ready configuration (OG, JSON-LD, sitemap, robots, hreflang)
3. Zustand state management with example store
4. Expanded README with all customization docs
5. Cleanup of unused code (`localeNames`, `LanguageSwitcher.label`)

## 1. Theme Toggle

**Library:** `next-themes` — standard for Next.js + shadcn/ui dark mode.

**Architecture:**

- `ThemeProvider` wraps app content in locale layout (attribute="class", defaultTheme="system")
- `ThemeToggle` client component: Sun/Moon icon button using shadcn Button
- Placed in header nav, between Home link and LanguageSwitcher
- Dark mode already configured in globals.css via `.dark` class and `@custom-variant dark`
- `suppressHydrationWarning` already on `<html>`

**Translations:** Add `ThemeToggle` namespace with "light", "dark", "system", "toggleTheme" keys.

**No state management needed** — next-themes handles persistence via localStorage + cookie.

## 2. SEO Configuration

**metadataBase:** Set in locale layout's generateMetadata.

**Open Graph:** Add og:title, og:description, og:locale, og:type to generateMetadata. Add OG translations to message files.

**Canonical + hreflang:** Use `alternates` in generateMetadata with canonical URL and hreflang for all locales.

**JSON-LD:** WebSite schema injected as `<script type="application/ld+json">` in locale layout.

**New files:**

- `src/app/sitemap.ts` — generates sitemap with all locale variants
- `src/app/robots.ts` — standard robots.txt allowing all crawlers

**Site URL:** Define `NEXT_PUBLIC_SITE_URL` env var (default: http://localhost:3000).

## 3. Zustand

**Setup:** Install `zustand`, create `src/stores/example-store.ts` with a simple counter store demonstrating the pattern (create, get, set, selectors).

**No provider needed** — Zustand stores are standalone modules.

**README docs:** Show how to create stores and use them in components.

## 4. README Expansion

Add/expand sections:

- Dark Mode (how theme toggle works, customization)
- State Management (Zustand pattern, example usage)
- SEO Configuration (what's included, how to customize metadataBase)
- Theme Customization (expand existing tweakcn section with more detail)

## 5. Cleanup

- Remove `localeNames` from `src/i18n/config.ts` (unused export)
- Remove `LanguageSwitcher.label` from all message files (unused key)
