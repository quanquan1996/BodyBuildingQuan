'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { HeartRateForm } from '@/components/heart-rate-calculator/heart-rate-form';
import { HeartRateResult } from '@/components/heart-rate-calculator/heart-rate-result';
import { HeartRateExplanation } from '@/components/heart-rate-calculator/heart-rate-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateHeartRateZones, type HeartRateInput, type HeartRateOutput } from '@/lib/utils/heart-rate';

export default function HeartRateCalculatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<HeartRateOutput | null>(null);

  const handleCalculate = (data: HeartRateInput) => {
    const output = calculateHeartRateZones(data);
    setResult(output);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.heartRateCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.heartRateCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/heart-rate-calculator`,
    inLanguage: isZh ? 'zh-CN' : 'en',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: isZh ? 'CNY' : 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container py-6 md:py-10 px-4 md:px-6">
        <ToolHero
          toolId="heart-rate-calculator"
          title={dict.heartRateCalculator.title}
          description={dict.heartRateCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <HeartRateForm onCalculate={handleCalculate} locale={locale} dict={dict} />
          </div>
          <div className="space-y-5">
            {result && <HeartRateResult result={result} locale={locale} dict={dict} />}
          </div>
        </div>

        <div className="mt-8">
          <HeartRateExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="heart-rate-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
