import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { getPathname } from '@/i18n/navigation';
import { SITE_URL } from '@/lib/constants';

const routes = ['/', '/about'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({
      url: `${SITE_URL}${await getPathname({ locale: defaultLocale, href: route })}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '/' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          await Promise.all(
            locales.map(async (locale) => [
              locale,
              `${SITE_URL}${await getPathname({ locale, href: route })}`,
            ]),
          ),
        ),
      },
    });
  }

  return entries;
}
