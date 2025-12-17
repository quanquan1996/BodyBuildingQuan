'use client';

import { useState } from 'react';
import { CarbCyclingForm } from '@/components/carb-cycling-calculator/carb-cycling-form';
import { CarbCyclingResult } from '@/components/carb-cycling-calculator/carb-cycling-result';
import { CarbCyclingReference } from '@/components/carb-cycling-calculator/carb-cycling-reference';
import { CarbCyclingExplanation } from '@/components/carb-cycling-calculator/carb-cycling-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { calculateCarbCycling, type CarbCyclingInput, type CarbCyclingOutput } from '@/lib/utils/carb-cycling';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '碳循环减脂计算器 - 科学规划碳水循环饮食',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线碳循环计算器，基于Katch-McArdle公式，输入体重、体脂率，快速生成高碳/中碳/低碳日的热量和宏量营养素方案，科学减脂不掉肌肉。',
  url: `${siteConfig.url}/tools/carb-cycling-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是碳循环饮食？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '碳循环（Carb Cycling）是一种饮食策略，通过在不同日期交替摄入高、中、低碳水化合物，来优化身体的能量利用。高碳日补充糖原促进训练，低碳日促进脂肪燃烧，两者结合可以在减脂的同时保持肌肉。',
      },
    },
    {
      '@type': 'Question',
      name: '碳循环适合什么人？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '碳循环适合有一定健身基础、希望在减脂期保持训练表现的人群。如果你是健身新手，建议先从简单的热量控制开始，熟悉后再尝试碳循环。',
      },
    },
    {
      '@type': 'Question',
      name: '高碳日和低碳日怎么安排？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '高碳日通常安排在高强度训练日（如练腿、练背），低碳日安排在休息日或低强度活动日。简易版建议每周2天高碳5天低碳，进阶版可以加入中碳日。',
      },
    },
  ],
};


interface InputData {
  weight: number;
  bodyFat: number;
  activityLevel: string;
}

export default function CarbCyclingCalculatorPage() {
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
      
      <div className="container py-6 md:py-10 px-4 md:px-6">
        {/* Tool Hero */}
        <ToolHero
          toolId="carb-cycling-calculator"
          title="碳循环减脂计算器"
          description="基于 Katch-McArdle 公式，科学规划碳水循环饮食"
        />

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-5">
            <CarbCyclingForm onCalculate={handleCalculate} />
            
            {result && (
              <CarbCyclingResult result={result} inputData={inputData ?? undefined} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-5">
            <CarbCyclingReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <CarbCyclingExplanation />
        </div>

        {/* Related Tools */}
        <RelatedTools currentToolId="carb-cycling-calculator" />

        {/* SEO Content Section */}
        <section className="mt-10">
          <div className="bg-card rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
            <h2 className="text-xl font-bold mb-4">关于碳循环减脂计算器</h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">为什么选择碳循环？</h3>
                <p>
                  传统的持续低碳饮食容易导致代谢适应、训练表现下降和心理疲劳。
                  碳循环通过周期性调整碳水摄入，既能保持减脂效果，又能在训练日获得足够能量。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">如何执行碳循环？</h3>
                <p>
                  在高强度训练日摄入高碳水，休息日摄入低碳水。
                  蛋白质保持稳定，脂肪根据热量需求调整。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          碳循环计算器 碳水循环 减脂饮食 高碳日低碳日 Katch-McArdle公式 
          减脂热量计算 宏量营养素 健身饮食计划 科学减脂 碳循环减肥
        </div>
      </div>
    </>
  );
}
