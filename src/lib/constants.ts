export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME!;
export const AUTHOR_URL = process.env.NEXT_PUBLIC_AUTHOR_URL!;
export const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME!;

export const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
] as const;
