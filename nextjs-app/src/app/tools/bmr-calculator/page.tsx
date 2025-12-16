'use client';

import { useState } from 'react';
import { BMRForm } from '@/components/bmr-calculator/bmr-form';
import { BMRResult } from '@/components/bmr-calculator/bmr-result';
import { BMRReference } from '@/components/bmr-calculator/bmr-reference';
import { BMRExplanation } from '@/components/bmr-calculator/bmr-explanation';
import { siteConfig } from '@/lib/config/site';
import { calculateBMR, type BMRInput, type BMROutput, type ActivityLevel } from '@/lib/utils/bmr';

interface BMRInputData {
  weight: number;
  bodyFat?: number;
  age?: number;
  activityLevel: ActivityLevel;
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '基础代谢计算器 - BMR/TDEE在线计算',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线基础代谢率(BMR)计算器，使用Mifflin-St Jeor公式，输入身高、体重、年龄，快速计算每日基础代谢和总能量消耗(TDEE)，科学制定饮食计划。',
  url: `${siteConfig.url}/tools/bmr-calculator`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2150',
  },
};

// FAQ structured data for SEO
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '什么是基础代谢率(BMR)？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '基础代谢率(BMR)是指人体在完全静息状态下，维持生命所需的最低能量消耗，包括呼吸、血液循环、细胞生长等基本生理功能所需的能量。',
      },
    },
    {
      '@type': 'Question',
      name: 'BMR和TDEE有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BMR是基础代谢率，只计算静息状态的能量消耗。TDEE(每日总能量消耗)则是BMR乘以活动系数，包含了日常活动和运动消耗的能量，是制定饮食计划的重要参考。',
      },
    },
    {
      '@type': 'Question',
      name: '如何利用BMR减肥？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '减肥时，每日热量摄入应低于TDEE约300-500千卡，但不建议低于BMR。保持适度热量缺口，配合运动，可以健康减脂。',
      },
    },
  ],
};

export default function BMRCalculatorPage() {
  const [result, setResult] = useState<BMROutput | null>(null);
  const [inputData, setInputData] = useState<BMRInputData | null>(null);

  const handleCalculate = (data: BMRInput) => {
    const output = calculateBMR(data);
    setResult(output);
    // 保存输入数据用于联动
    setInputData({
      weight: data.weightKg,
      bodyFat: data.mode === 'advanced' ? data.bodyFatPercent : undefined,
      age: data.mode === 'basic' ? data.age : undefined,
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
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3">
            基础代谢计算器
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            计算每日基础代谢率 (BMR) 和总能量消耗 (TDEE) · 
            <span className="text-primary">科学制定饮食计划</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-6">
            <BMRForm onCalculate={handleCalculate} />
            
            {result && (
              <BMRResult result={result} inputData={inputData ?? undefined} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-6">
            <BMRReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <BMRExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于基础代谢计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么要计算 BMR？</h3>
              <p>
                了解自己的基础代谢率是科学管理体重的第一步。无论你的目标是减脂、增肌还是维持体重，
                知道身体每天需要多少能量，才能制定合理的饮食计划。BMR 帮助你避免盲目节食或过度进食。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何提高基础代谢？</h3>
              <p>
                增加肌肉量是提高 BMR 最有效的方法。每增加 1 公斤肌肉，每天可多消耗约 50-100 千卡热量。
                此外，保持规律作息、充足睡眠、适量蛋白质摄入也有助于维持健康的代谢水平。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          基础代谢计算器 BMR计算器 TDEE计算器 每日热量消耗 减肥热量计算 
          增肌热量计算 卡路里计算器 能量消耗计算 新陈代谢 代谢率计算
        </div>
      </div>
    </>
  );
}
