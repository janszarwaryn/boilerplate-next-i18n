'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <Button onClick={reset} variant="outline">
          {t('retry')}
        </Button>
      </div>
    </div>
  );
}
