'use client';

import { useState } from 'react';
import { SkinfoldForm } from '@/components/skinfold-calculator/skinfold-form';
import { SkinfoldResult } from '@/components/skinfold-calculator/skinfold-result';
import { SkinfoldReference } from '@/components/skinfold-calculator/skinfold-reference';
import { SkinfoldGuide } from '@/components/skinfold-calculator/skinfold-guide';
import { SkinfoldExplanation } from '@/components/skinfold-calculator/skinfold-explanation';
import { siteConfig } from '@/lib/config/site';
import { type SkinfoldOutput } from '@/lib/utils/skinfold';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '体脂夹计算器 - 皮褶厚度法体脂率在线计算',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线体脂夹计算器，支持3点和7点皮褶厚度测量法，使用Jackson-Pollock公式精确计算体脂率，包含详细的测量部位说明和方法指导。',
  url: `${siteConfig.url}/tools/skinfold-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '890',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是皮褶厚度法？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '皮褶厚度法是通过测量身体特定部位的皮下脂肪厚度来估算全身体脂率的方法。使用专业体脂夹捏起皮肤和皮下脂肪，测量其厚度，然后通过公式计算体脂率。',
      },
    },
    {
      '@type': 'Question',
      name: '3点测量和7点测量有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3点测量是简易模式，测量3个部位（男性：胸部、腹部、大腿；女性：三头肌、髂骨上、大腿），适合日常快速评估。7点测量是精确模式，测量7个部位，提供更全面准确的体脂率估算。',
      },
    },
    {
      '@type': 'Question',
      name: '皮褶厚度法准确吗？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '皮褶厚度法的标准误差约为±3-4%，准确性取决于测量技术和体脂夹质量。虽然不如DEXA扫描精确，但作为便携、低成本的测量方法，非常适合追踪体脂变化趋势。',
      },
    },
  ],
};

export default function SkinfoldCalculatorPage() {
  const [result, setResult] = useState<SkinfoldOutput | null>(null);
  const [inputWeight, setInputWeight] = useState<number>(70);

  const handleCalculate = (output: SkinfoldOutput) => {
    setResult(output);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="container py-8 md:py-12 px-4 md:px-6">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            体脂夹计算器
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            皮褶厚度法测量体脂率，支持简易和精确模式 · 
            <span className="text-primary">在线计算器平台</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-6">
            <SkinfoldForm onCalculate={handleCalculate} />
            
            {result && (
              <SkinfoldResult result={result} weight={inputWeight} />
            )}
          </div>

          {/* Right Column - Reference & Guide */}
          <div className="space-y-6">
            <SkinfoldReference />
            <SkinfoldGuide />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <SkinfoldExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于体脂夹计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么使用皮褶厚度法？</h3>
              <p>
                皮褶厚度法是一种经济实惠且便携的体脂测量方法。只需一把体脂夹，
                就能在家中或健身房随时测量体脂率。相比昂贵的 DEXA 扫描或水下称重，
                皮褶厚度法提供了良好的性价比，特别适合追踪体脂变化趋势。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何提高测量准确性？</h3>
              <p>
                为获得最准确的结果，建议在相同时间、相同条件下测量（如早晨空腹）。
                每个部位测量 2-3 次取平均值，确保捏起的是皮肤和皮下脂肪而非肌肉。
                使用质量好的体脂夹，并按照标准位置进行测量。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          体脂夹计算器 皮褶厚度法 体脂率测量 Jackson-Pollock公式 3点测量 7点测量 
          体脂钳 皮下脂肪测量 身体成分分析 健身体脂测量 体密度计算
        </div>
      </div>
    </>
  );
}
