'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { MetabolicDamageForm } from '@/components/metabolic-damage-test/metabolic-damage-form';
import { MetabolicDamageResult } from '@/components/metabolic-damage-test/metabolic-damage-result';
import { MetabolicDamageReference } from '@/components/metabolic-damage-test/metabolic-damage-reference';
import { MetabolicDamageExplanation } from '@/components/metabolic-damage-test/metabolic-damage-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';
import { calculateMetabolicDamage, type MetabolicDamageInput, type MetabolicDamageOutput } from '@/lib/utils/metabolic-damage';

export default function MetabolicDamageTestPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const dict = getDictionary(locale);
  const isZh = locale === 'zh';

  const [result, setResult] = useState<MetabolicDamageOutput | null>(null);
  const [inputData, setInputData] = useState<MetabolicDamageInput | null>(null);

  const handleCalculate = (data: MetabolicDamageInput) => {
    const output = calculateMetabolicDamage(data);
    setResult(output);
    setInputData(data);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.metabolicDamageTest.title,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    description: dict.metabolicDamageTest.metaDescription,
    url: `${siteConfig.url}/${locale}/tools/metabolic-damage-test`,
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
          toolId="metabolic-damage-test"
          title={dict.metabolicDamageTest.title}
          description={dict.metabolicDamageTest.description}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <MetabolicDamageForm onCalculate={handleCalculate} locale={locale} dict={dict} />
            {result && inputData && <MetabolicDamageResult result={result} inputData={inputData} locale={locale} dict={dict} />}
          </div>
          <div className="space-y-5">
            <MetabolicDamageReference dict={dict} />
          </div>
        </div>

        <div className="mt-8">
          <MetabolicDamageExplanation dict={dict} />
        </div>

        <RelatedTools currentToolId="metabolic-damage-test" locale={locale} dict={dict} />
      </div>
    </>
  );
}
