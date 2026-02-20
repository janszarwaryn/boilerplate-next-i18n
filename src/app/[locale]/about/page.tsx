import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t('breadcrumbHome')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('breadcrumbAbout')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">{t('heading')}</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
        {t('description')}
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>{t('cardDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="bg-muted flex aspect-video items-center justify-center rounded-lg"
            role="img"
            aria-label={t('imagePlaceholder')}
          >
            <span className="text-muted-foreground text-sm">1200 × 630</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
