import { MuscleAnatomyClient } from '@/components/muscle-anatomy/muscle-anatomy-client';
import { getDictionary, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/config/site';

export default async function MuscleAnatomyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  // JSON-LD 结构化数据
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: dict.muscleAnatomy.title,
    description: dict.muscleAnatomy.description,
    url: `${siteConfig.url}/${locale}/tools/muscle-anatomy`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MuscleAnatomyClient locale={locale} dict={dict} />
    </>
  );
}
