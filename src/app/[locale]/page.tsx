import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex max-w-2xl flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">{t('description')}</p>
      </div>
    </div>
  );
}
