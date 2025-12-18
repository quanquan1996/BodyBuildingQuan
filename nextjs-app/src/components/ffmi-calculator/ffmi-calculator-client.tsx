'use client';

import { useState } from 'react';
import { FFMIForm } from './ffmi-form';
import { FFMIResult } from './ffmi-result';
import { FFMIReference } from './ffmi-reference';
import { FFMIExplanation } from './ffmi-explanation';
import { FFMIChart } from './ffmi-chart';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { type Locale, type Dictionary } from '@/lib/i18n';
import { calculateFFMI, type FFMIInput, type FFMIOutput } from '@/lib/utils/ffmi';

interface FFMICalculatorClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function FFMICalculatorClient({ locale, dict }: FFMICalculatorClientProps) {
  const isZh = locale === 'zh';
  const [result, setResult] = useState<FFMIOutput | null>(null);
  const [inputWeight, setInputWeight] = useState<number>(75);

  const handleCalculate = (data: FFMIInput) => {
    const output = calculateFFMI(data);
    setResult(output);
    setInputWeight(data.weightKg);
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.ffmiCalculator.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.ffmiCalculator.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/ffmi-calculator`,
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
          toolId="ffmi-calculator"
          title={dict.ffmiCalculator.title}
          description={dict.ffmiCalculator.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <FFMIForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && <FFMIResult result={result} weight={inputWeight} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <FFMIReference dict={dict} />
            {result && <FFMIChart currentFFMI={result.adjustedFfmi} />}
          </div>
        </div>

        <div className="mt-8">
          <FFMIExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="ffmi-calculator" locale={locale} dict={dict} />
      </div>
    </>
  );
}
