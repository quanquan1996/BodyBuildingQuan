'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { CarbCyclingForm } from '@/components/carb-cycling-calculator/carb-cycling-form';
import { CarbCyclingResult } from '@/components/carb-cycling-calculator/carb-cycling-result';
import { CarbCyclingReference } from '@/components/carb-cycling-calculator/carb-cycling-reference';
import { CarbCyclingExplanation } from '@/components/carb-cycling-calculator/carb-cycling-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateCarbCycling, type CarbCyclingInput, type CarbCyclingOutput } from '@/lib/utils/carb-cycling';

interface InputData {
  weight: number;
  bodyFat: number;
  activityLevel: string;
}

export default function CarbCyclingCalculatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<CarbCyclingOutput | null>(null);
  const [inputData, setInputData] = useState<InputData | null>(null);

  const handleCalculate = (data: CarbCyclingInput) => {
    const output = calculateCarbCycling(data);
    setResult(output);
    setInputData({
      weight: data.weightKg,
      bodyFat: data.bodyFatPercent,
      activityLevel: data.activityLevel,
    });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.carbCyclingCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.carbCyclingCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/carb-cycling-calculator`,
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
          toolId="carb-cycling-calculator"
          title={dict.carbCyclingCalculator.title}
          description={dict.carbCyclingCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <CarbCyclingForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <CarbCyclingResult result={result} inputData={inputData ?? undefined} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <CarbCyclingReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <CarbCyclingExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="carb-cycling-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
