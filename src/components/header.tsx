'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { MobileNav } from '@/components/mobile-nav';

export function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  return (
    <header className="border-border border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-base font-bold tracking-tight">
            {SITE_NAME}
          </Link>
          <nav
            aria-label={t('ariaLabel')}
            className="hidden items-center gap-4 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm transition-colors ${isActive ? 'text-foreground underline underline-offset-4' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
