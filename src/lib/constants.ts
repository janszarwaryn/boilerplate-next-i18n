function env(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const SITE_URL = env('NEXT_PUBLIC_SITE_URL');
export const SITE_NAME = env('NEXT_PUBLIC_SITE_NAME');
export const AUTHOR_URL = env('NEXT_PUBLIC_AUTHOR_URL');
export const AUTHOR_NAME = env('NEXT_PUBLIC_AUTHOR_NAME');

export const NAV_LINKS = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
] as const;
