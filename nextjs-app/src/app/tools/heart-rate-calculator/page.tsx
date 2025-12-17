'use client';

import { useState } from 'react';
import { HeartRateForm } from '@/components/heart-rate-calculator/heart-rate-form';
import { HeartRateResult } from '@/components/heart-rate-calculator/heart-rate-result';
import { HeartRateExplanation } from '@/components/heart-rate-calculator/heart-rate-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
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

      <div className="container py-6 md:py-10 px-4 md:px-6">
        {/* Tool Hero */}
        <ToolHero
          toolId="heart-rate-calculator"
          title="有氧心率区间计算器"
          description="计算个人心率训练区间，科学指导有氧运动强度"
        />

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="space-y-5">
            <HeartRateForm onCalculate={handleCalculate} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-5">{result && <HeartRateResult result={result} />}</div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <HeartRateExplanation />
        </div>

        {/* Related Tools */}
        <RelatedTools currentToolId="heart-rate-calculator" />

        {/* SEO Content Section */}
        <section className="mt-10">
          <div className="bg-card rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
            <h2 className="text-xl font-bold mb-4">关于心率区间计算器</h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">为什么要关注心率？</h3>
                <p>
                  心率是衡量运动强度最直观的指标。通过监控心率，你可以确保训练在正确的强度区间。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">如何利用心率区间？</h3>
                <p>
                  减脂训练应主要在 Zone 2（60-70%），这个区间脂肪供能比例最高。
                </p>
              </div>
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
