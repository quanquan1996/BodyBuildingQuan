'use client';

import { useState } from 'react';
import { HighCarbDietForm } from '@/components/high-carb-diet-calculator/high-carb-diet-form';
import { HighCarbDietResult } from '@/components/high-carb-diet-calculator/high-carb-diet-result';
import { HighCarbDietReference } from '@/components/high-carb-diet-calculator/high-carb-diet-reference';
import { HighCarbDietExplanation } from '@/components/high-carb-diet-calculator/high-carb-diet-explanation';
import { siteConfig } from '@/lib/config/site';
import { calculateHighCarbDiet, type HighCarbDietInput, type HighCarbDietOutput } from '@/lib/utils/high-carb-diet';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '高碳减脂计算器 - 高碳水低脂肪减脂饮食规划',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线高碳减脂计算器，基于高碳水低脂肪策略，区分训练日、休息日、再喂日，科学规划减脂饮食，适合训练量大的健身人群。',
  url: `${siteConfig.url}/tools/high-carb-diet-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
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
      name: '什么是高碳减脂？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '高碳减脂是一种以高碳水化合物、低脂肪为特点的减脂饮食策略。通过保持较高的碳水摄入来维持代谢率和训练表现，同时严格控制脂肪摄入来制造热量缺口。',
      },
    },
    {
      '@type': 'Question',
      name: '高碳减脂适合什么人？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '高碳减脂适合训练量大、喜欢碳水化合物、代谢较快的人群，特别是进行力量训练的健身爱好者。如果你在低碳饮食中感到疲劳、训练表现下降，可以尝试高碳减脂。',
      },
    },
    {
      '@type': 'Question',
      name: '什么是再喂日？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '再喂日（Refeed Day）是在减脂期间安排的高热量日，目的是恢复瘦素和甲状腺激素水平，打破减脂平台期。再喂日热量接近维持水平，碳水和脂肪都会适当提高。',
      },
    },
  ],
};


interface InputData {
  weight: number;
  bodyFat?: number;
  activityLevel: string;
  age: number;
}

export default function HighCarbDietCalculatorPage() {
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
            高碳减脂计算器
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            高碳水 · 低脂肪 · 
            <span className="text-primary">训练日/休息日/再喂日 三档规划</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-6">
            <HighCarbDietForm onCalculate={handleCalculate} />
            
            {result && (
              <HighCarbDietResult result={result} inputData={inputData ?? undefined} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-6">
            <HighCarbDietReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <HighCarbDietExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于高碳减脂计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么选择高碳减脂？</h3>
              <p>
                传统低碳饮食虽然短期效果明显，但长期执行容易导致代谢适应、训练表现下降和心理疲劳。
                高碳减脂通过保持充足的碳水摄入，维持瘦素水平和训练强度，是训练量大的健身人群的理想选择。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何执行高碳减脂？</h3>
              <p>
                根据计算结果，在训练日摄入高碳水低脂肪，休息日适当减少碳水。
                定期安排再喂日恢复激素水平。选择天然、未加工的碳水来源，避免高脂碳水组合。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          高碳减脂计算器 高碳水减脂 低脂肪饮食 减脂饮食计划 再喂日 
          训练日饮食 休息日饮食 健身减脂 科学减脂 碳水化合物减脂
        </div>
      </div>
    </>
  );
}
