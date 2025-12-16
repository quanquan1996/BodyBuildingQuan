'use client';

import { useState } from 'react';
import { HeartRateForm } from '@/components/heart-rate-calculator/heart-rate-form';
import { HeartRateResult } from '@/components/heart-rate-calculator/heart-rate-result';
import { HeartRateExplanation } from '@/components/heart-rate-calculator/heart-rate-explanation';
import { siteConfig } from '@/lib/config/site';
import {
  calculateHeartRateZones,
  type HeartRateInput,
  type HeartRateOutput,
} from '@/lib/utils/heart-rate';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '有氧心率区间计算器 - 心率训练区间在线计算',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description:
    '免费在线心率区间计算器，输入年龄自动计算五大心率训练区间，支持Karvonen公式，科学指导有氧训练强度，提升燃脂和心肺耐力效果。',
  url: `${siteConfig.url}/tools/heart-rate-calculator`,
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
      name: '什么是心率训练区间？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '心率训练区间是根据最大心率划分的不同强度范围，通常分为5个区间。不同区间对应不同的训练效果，如燃脂、提升耐力、提升速度等。',
      },
    },
    {
      '@type': 'Question',
      name: '燃脂最佳心率是多少？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '燃脂最佳心率区间是最大心率的60-70%（Zone 2）。在这个区间，身体主要以脂肪作为能量来源，适合长时间有氧运动。',
      },
    },
    {
      '@type': 'Question',
      name: '如何测量静息心率？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最准确的方法是早晨醒来后，在床上静躺2-3分钟，然后测量脉搏。连续测量几天取平均值更准确。正常成年人静息心率在60-100bpm之间。',
      },
    },
  ],
};

export default function HeartRateCalculatorPage() {
  const [result, setResult] = useState<HeartRateOutput | null>(null);

  const handleCalculate = (data: HeartRateInput) => {
    const output = calculateHeartRateZones(data);
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
            有氧心率区间计算器
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            计算个人心率训练区间，科学指导有氧运动强度 ·
            <span className="text-primary">提升燃脂和心肺耐力</span>
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <HeartRateForm onCalculate={handleCalculate} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">{result && <HeartRateResult result={result} />}</div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <HeartRateExplanation />
        </div>

        {/* SEO Content Section */}
        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">关于心率区间计算器</h2>
          <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">为什么要关注心率？</h3>
              <p>
                心率是衡量运动强度最直观的指标。通过监控心率，你可以确保训练在正确的强度区间，
                避免训练不足或过度训练。无论是减脂还是提升耐力，心率都是你的最佳训练伙伴。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">如何利用心率区间？</h3>
              <p>
                减脂训练应主要在 Zone 2（60-70%），这个区间脂肪供能比例最高。
                提升心肺耐力则需要在 Zone 3-4 训练。建议使用心率手表或胸带实时监控心率。
              </p>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          心率区间计算器 有氧心率计算 燃脂心率 最大心率计算 心率训练区间 Karvonen公式
          有氧运动心率 跑步心率 减脂心率 心肺耐力训练
        </div>
      </div>
    </>
  );
}
