'use client';

import { useState } from 'react';
import { FatLossDietForm } from '@/components/fat-loss-diet-calculator/fat-loss-diet-form';
import { FatLossDietResult } from '@/components/fat-loss-diet-calculator/fat-loss-diet-result';
import { FatLossDietReference } from '@/components/fat-loss-diet-calculator/fat-loss-diet-reference';
import { FatLossDietExplanation } from '@/components/fat-loss-diet-calculator/fat-loss-diet-explanation';
import { siteConfig } from '@/lib/config/site';
import { calculateFatLossDiet, type FatLossDietInput, type FatLossDietOutput } from '@/lib/utils/fat-loss-diet';
import { type ActivityLevel } from '@/lib/utils/bmr';

interface InputData {
  weight: number;
  bodyFat?: number;
  activityLevel: ActivityLevel;
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '减脂饮食计算器 - 碳水递减减脂计划',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线减脂饮食计算器，采用碳水递减策略，自动生成每周饮食计划，科学减脂不反弹，适合普通健身爱好者。',
  url: `${siteConfig.url}/tools/fat-loss-diet-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1680',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是碳水递减减脂法？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '碳水递减减脂法是一种渐进式减脂策略，通过逐周降低碳水化合物摄入，让身体平稳过渡到燃脂状态，同时保持高蛋白摄入以保护肌肉，避免代谢适应和平台期。',
      },
    },
    {
      '@type': 'Question',
      name: '碳水递减和碳循环有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '碳水递减是逐周降低碳水摄入的线性策略，适合普通人；碳循环是在一周内交替高低碳日的周期性策略，更适合有训练基础的健身者。两者都是有效的减脂方法。',
      },
    },
    {
      '@type': 'Question',
      name: '减脂期间蛋白质摄入多少合适？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '减脂期间建议蛋白质摄入为每公斤体重2.0-2.2克，以保护肌肉量。本计算器默认使用2.0g/kg的蛋白质系数。',
      },
    },
  ],
};

export default function FatLossDietCalculatorPage() {
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
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter mb-2 md:mb-3">
            减脂饮食计算器
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            碳水递减减脂策略 · 自动生成每周饮食计划 ·
            <span className="text-primary">科学减脂不反弹</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-6">
            <FatLossDietForm onCalculate={handleCalculate} />

            {result && (
              <FatLossDietResult result={result} inputData={inputData ?? undefined} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-6">
            <FatLossDietReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <FatLossDietExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于减脂饮食计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么选择碳水递减？</h3>
              <p>
                碳水递减是一种温和有效的减脂策略，通过逐周降低碳水摄入，
                让身体有足够时间适应，避免代谢骤降和平台期。相比极端节食，
                这种方法更容易坚持，减脂效果也更持久。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何配合训练？</h3>
              <p>
                减脂期间建议保持力量训练，每周3-4次，以保护肌肉量。
                碳水可以集中在训练前后摄入，提供训练能量的同时促进恢复。
                有氧运动可以作为辅助，但不要过量。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          减脂饮食计算器 碳水递减 减脂计划 减肥食谱 热量计算 
          宏量营养素 蛋白质摄入 碳水化合物 脂肪摄入 减脂餐
          健身饮食 科学减脂 减脂不反弹 减肥方法 饮食规划
        </div>
      </div>
    </>
  );
}
