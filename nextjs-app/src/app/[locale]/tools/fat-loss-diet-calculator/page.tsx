'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { FatLossDietForm } from '@/components/fat-loss-diet-calculator/fat-loss-diet-form';
import { FatLossDietResult } from '@/components/fat-loss-diet-calculator/fat-loss-diet-result';
import { FatLossDietReference } from '@/components/fat-loss-diet-calculator/fat-loss-diet-reference';
import { FatLossDietExplanation } from '@/components/fat-loss-diet-calculator/fat-loss-diet-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateFatLossDiet, type FatLossDietInput, type FatLossDietOutput } from '@/lib/utils/fat-loss-diet';
import { type ActivityLevel } from '@/lib/utils/bmr';

interface InputData {
  weight: number;
  bodyFat?: number;
  activityLevel: ActivityLevel;
}

export default function FatLossDietCalculatorPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<FatLossDietOutput | null>(null);
  const [inputData, setInputData] = useState<InputData | null>(null);

  const handleCalculate = (data: FatLossDietInput) => {
    const output = calculateFatLossDiet(data);
    setResult(output);
    setInputData({
      weight: data.weightKg,
      bodyFat: data.mode === 'advanced' ? data.bodyFatPercent : undefined,
      activityLevel: data.activityLevel,
    });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.fatLossDietCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.fatLossDietCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/fat-loss-diet-calculator`,
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
          toolId="fat-loss-diet-calculator"
          title={dict.fatLossDietCalculator.title}
          description={dict.fatLossDietCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <FatLossDietForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <FatLossDietResult result={result} inputData={inputData ?? undefined} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <FatLossDietReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <FatLossDietExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="fat-loss-diet-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
