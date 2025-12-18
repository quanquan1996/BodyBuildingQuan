'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { HighCarbDietForm } from '@/components/high-carb-diet-calculator/high-carb-diet-form';
import { HighCarbDietResult } from '@/components/high-carb-diet-calculator/high-carb-diet-result';
import { HighCarbDietReference } from '@/components/high-carb-diet-calculator/high-carb-diet-reference';
import { HighCarbDietExplanation } from '@/components/high-carb-diet-calculator/high-carb-diet-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateHighCarbDiet, type HighCarbDietInput, type HighCarbDietOutput } from '@/lib/utils/high-carb-diet';

interface InputData {
  weight: number;
  bodyFat?: number;
  activityLevel: string;
  age: number;
}

export default function HighCarbDietCalculatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<HighCarbDietOutput | null>(null);
  const [inputData, setInputData] = useState<InputData | null>(null);

  const handleCalculate = (data: HighCarbDietInput) => {
    const output = calculateHighCarbDiet(data);
    setResult(output);
    setInputData({
      weight: data.weightKg,
      bodyFat: data.bodyFatPercent,
      activityLevel: data.activityLevel,
      age: data.age,
    });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.highCarbDietCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.highCarbDietCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/high-carb-diet-calculator`,
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
          toolId="high-carb-diet-calculator"
          title={dict.highCarbDietCalculator.title}
          description={dict.highCarbDietCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <HighCarbDietForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <HighCarbDietResult result={result} inputData={inputData ?? undefined} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <HighCarbDietReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <HighCarbDietExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="high-carb-diet-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
