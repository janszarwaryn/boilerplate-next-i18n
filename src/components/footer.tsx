import { useTranslations } from 'next-intl';
import { AUTHOR_URL, AUTHOR_NAME } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm sm:px-6">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <p>
          {t('createdBy')}{' '}
          <a
            href={AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary font-medium underline underline-offset-4"
          >
            {AUTHOR_NAME}
          </a>
        </p>
      </div>
    </footer>
  );
}
