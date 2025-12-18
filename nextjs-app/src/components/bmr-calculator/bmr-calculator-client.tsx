'use client';

import { useState } from 'react';
import { BMRForm } from './bmr-form';
import { BMRResult } from './bmr-result';
import { BMRReference } from './bmr-reference';
import { BMRExplanation } from './bmr-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { type Locale, type Dictionary } from '@/lib/i18n';
import { calculateBMR, type BMRInput, type BMROutput, type ActivityLevel } from '@/lib/utils/bmr';

interface BMRInputData {
  weight: number;
  bodyFat?: number;
  age?: number;
  activityLevel: ActivityLevel;
}

interface BMRCalculatorClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function BMRCalculatorClient({ locale, dict }: BMRCalculatorClientProps) {
  const isZh = locale === 'zh';
  const [result, setResult] = useState<BMROutput | null>(null);
  const [inputData, setInputData] = useState<BMRInputData | null>(null);

  const handleCalculate = (data: BMRInput) => {
    const output = calculateBMR(data);
    setResult(output);
    setInputData({
      weight: data.weightKg,
      bodyFat: data.mode === 'advanced' ? data.bodyFatPercent : undefined,
      age: data.mode === 'basic' ? data.age : undefined,
      activityLevel: data.activityLevel,
    });
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.bmrCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.bmrCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/bmr-calculator`,
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
          toolId="bmr-calculator"
          title={dict.bmrCalculator.title}
          description={dict.bmrCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <BMRForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <BMRResult result={result} inputData={inputData ?? undefined} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <BMRReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <BMRExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="bmr-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
