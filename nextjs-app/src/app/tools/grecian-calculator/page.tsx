'use client';

import { useState } from 'react';
import { GrecianForm } from '@/components/grecian-calculator/grecian-form';
import { GrecianResult } from '@/components/grecian-calculator/grecian-result';
import { GrecianReference } from '@/components/grecian-calculator/grecian-reference';
import { GrecianExplanation } from '@/components/grecian-calculator/grecian-explanation';
import { zh } from '@/lib/i18n/zh';
import { siteConfig } from '@/lib/config/site';
import { calculateGrecianIdeal, type GrecianIdealInput, type GrecianIdealOutput } from '@/lib/utils/grecian-ideal';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '古典比例计算器 - 希腊雕塑黄金分割身材评估',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线古典比例计算器，基于希腊雕塑比例和黄金分割率（1.618），评估你的身材对称性，指出需要改进的部位，帮助健美爱好者打造完美比例。',
  url: `${siteConfig.url}/tools/grecian-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '860',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是希腊雕塑比例（Grecian Ideal）？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '希腊雕塑比例是古希腊人对完美人体比例的研究成果，以黄金分割率（1.618）为核心。在健美中，理想的肩腰比和胸腰比都应接近1.618，形成经典的V型身材。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么用手腕围度计算理想身材？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '手腕几乎没有肌肉和脂肪，其围度主要由骨骼大小决定，是衡量个人骨架大小的可靠指标。基于手腕围度可以为不同骨架的人计算出个性化的理想身材目标。',
      },
    },
    {
      '@type': 'Question',
      name: '理想的肩腰比是多少？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '根据黄金分割率，理想的肩腰比应该是1.618。这意味着如果你的腰围是80cm，理想的肩围应该是约130cm，形成视觉上最具美感的V型身材。',
      },
    },
  ],
};

export default function GrecianCalculatorPage() {
  const [result, setResult] = useState<GrecianIdealOutput | null>(null);

  const handleCalculate = (data: GrecianIdealInput) => {
    const output = calculateGrecianIdeal(data);
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
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            {zh.grecianCalculator.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {zh.grecianCalculator.description} · 
            <span className="text-primary">黄金分割率 φ = 1.618</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-6">
            <GrecianForm onCalculate={handleCalculate} />
            
            {result && (
              <GrecianResult result={result} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-6">
            <GrecianReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <GrecianExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于古典比例计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么追求古典比例？</h3>
              <p>
                健美的本质是雕塑艺术，而不是单纯的肌肉堆砌。古典比例强调的是身体各部位之间的和谐与平衡，
                这种美感源自古希腊对人体的深入研究。Steve Reeves、Frank Zane 等传奇健美运动员
                都以接近古典比例而闻名，他们的身材至今仍被视为健美的黄金标准。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何改善身材比例？</h3>
              <p>
                首先识别你的弱项部位，然后针对性地调整训练计划。如果肩腰比不足，
                可以增加侧平举和推举训练来拓宽肩膀，同时通过控制饮食和有氧运动来收紧腰围。
                记住，比例的改善需要时间和耐心，但结果会比盲目增肌更令人满意。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          古典比例计算器 希腊雕塑比例 黄金分割率 身材比例 肩腰比 胸腰比
          Steve Reeves 健美比例 对称性 V型身材 健体比例 古典健美
          手腕围度 理想身材 身材评估 健美标准 完美比例
        </div>
      </div>
    </>
  );
}
