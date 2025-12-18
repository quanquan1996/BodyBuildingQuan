'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { GrecianForm } from '@/components/grecian-calculator/grecian-form';
import { GrecianResult } from '@/components/grecian-calculator/grecian-result';
import { GrecianReference } from '@/components/grecian-calculator/grecian-reference';
import { GrecianExplanation } from '@/components/grecian-calculator/grecian-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateGrecianIdeal, type GrecianIdealInput, type GrecianIdealOutput } from '@/lib/utils/grecian-ideal';

export default function GrecianCalculatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<GrecianIdealOutput | null>(null);

  const handleCalculate = (data: GrecianIdealInput) => {
    const output = calculateGrecianIdeal(data);
    setResult(output);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.grecianCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.grecianCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/grecian-calculator`,
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
          toolId="grecian-calculator"
          title={dict.grecianCalculator.title}
          description={dict.grecianCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <GrecianForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <GrecianResult result={result} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <GrecianReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <GrecianExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="grecian-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
