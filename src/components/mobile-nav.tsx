'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MenuIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Nav');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="md:hidden"
          aria-label={t('menu')}
        >
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium"
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="border-border border-t pt-4">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
