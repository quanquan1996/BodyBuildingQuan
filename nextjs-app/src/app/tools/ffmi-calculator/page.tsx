'use client';

import { useState } from 'react';
import { FFMIForm } from '@/components/ffmi-calculator/ffmi-form';
import { FFMIResult } from '@/components/ffmi-calculator/ffmi-result';
import { FFMIReference } from '@/components/ffmi-calculator/ffmi-reference';
import { FFMIExplanation } from '@/components/ffmi-calculator/ffmi-explanation';
import { FFMIChart } from '@/components/ffmi-calculator/ffmi-chart';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { calculateFFMI, type FFMIInput, type FFMIOutput } from '@/lib/utils/ffmi';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FFMI计算器 - 无脂肪体重指数在线计算',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线FFMI计算器，输入身高、体重、体脂率，快速计算无脂肪体重指数（Fat-Free Mass Index），科学评估肌肉发达程度，适合健身爱好者和运动员使用。',
  url: `${siteConfig.url}/tools/ffmi-calculator`,
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
      name: '什么是FFMI？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FFMI（Fat-Free Mass Index，去脂体重指数）是一种用于评估肌肉发达程度的指标。与BMI不同，FFMI排除了体脂的影响，更准确地反映了一个人的肌肉量水平。',
      },
    },
    {
      '@type': 'Question',
      name: 'FFMI多少算正常？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '男性FFMI正常范围为17-19，优秀为21-23，超过25可能接近自然极限或使用了增强剂。女性FFMI通常比男性低2-3个单位。',
      },
    },
    {
      '@type': 'Question',
      name: 'FFMI和BMI有什么区别？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BMI仅考虑身高和体重，无法区分肌肉和脂肪。FFMI通过排除体脂，专注于评估瘦体重（主要是肌肉），对于健身人群来说是更有意义的指标。',
      },
    },
  ],
};

export default function FFMICalculatorPage() {
  const [result, setResult] = useState<FFMIOutput | null>(null);
  const [inputWeight, setInputWeight] = useState<number>(75);

  const handleCalculate = (data: FFMIInput) => {
    const output = calculateFFMI(data);
    setResult(output);
    setInputWeight(data.weightKg);
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
          toolId="ffmi-calculator"
          title="FFMI 计算器"
          description="评估去脂体重指数，科学分析身体成分"
        />

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-5">
            <FFMIForm onCalculate={handleCalculate} />
            
            {result && (
              <FFMIResult result={result} weight={inputWeight} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-5">
            <FFMIReference />
            
            {result && (
              <FFMIChart currentFFMI={result.adjustedFfmi} />
            )}
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <FFMIExplanation />
        </div>

        {/* Related Tools */}
        <RelatedTools currentToolId="ffmi-calculator" />

        {/* SEO Content Section */}
        <section className="mt-10">
          <div className="bg-card rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
            <h2 className="text-xl font-bold mb-4">关于 FFMI 计算器</h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">为什么使用 FFMI？</h3>
                <p>
                  FFMI（Fat-Free Mass Index，无脂肪体重指数）是评估肌肉发达程度的科学指标。
                  相比传统的 BMI，FFMI 排除了体脂的干扰，能够更准确地反映你的肌肉量水平。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">如何提高 FFMI？</h3>
                <p>
                  提高 FFMI 的关键在于增加肌肉量同时控制体脂。建议进行规律的力量训练，
                  保证充足的蛋白质摄入（每公斤体重 1.6-2.2 克），确保充足的睡眠和恢复时间。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          FFMI计算器 无脂肪体重指数 肌肉量评估 体脂率计算 健身指标 身体成分分析 
          瘦体重计算 肌肉发达程度 健美指数 运动员体质评估
        </div>
      </div>
    </>
  );
}
