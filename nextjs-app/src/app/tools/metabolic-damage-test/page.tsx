'use client';

import { useState } from 'react';
import { MetabolicDamageForm } from '@/components/metabolic-damage-test/metabolic-damage-form';
import { MetabolicDamageResult } from '@/components/metabolic-damage-test/metabolic-damage-result';
import { MetabolicDamageReference } from '@/components/metabolic-damage-test/metabolic-damage-reference';
import { MetabolicDamageExplanation } from '@/components/metabolic-damage-test/metabolic-damage-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { siteConfig } from '@/lib/config/site';
import { 
  calculateMetabolicDamage, 
  type MetabolicDamageInput, 
  type MetabolicDamageOutput 
} from '@/lib/utils/metabolic-damage';

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '代谢受损检测器 - 在线代谢适应评估',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web Browser',
  description: '免费在线代谢受损检测工具，评估长期节食是否导致代谢适应，提供反向节食恢复方案，帮助你科学恢复代谢。',
  url: `${siteConfig.url}/tools/metabolic-damage-test`,
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
      name: '什么是代谢受损？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '代谢受损（代谢适应）是指长期热量限制后，身体为了生存而降低能量消耗的适应性反应。表现为吃很少却不瘦、体重停滞、疲劳感增加等症状。',
      },
    },
    {
      '@type': 'Question',
      name: '为什么吃很少还是不瘦？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '可能原因包括：热量计算不准确、代谢适应导致消耗降低、水分波动掩盖体重变化、压力和睡眠问题导致皮质醇升高等。建议先确认热量计算准确性。',
      },
    },
    {
      '@type': 'Question',
      name: '什么是反向节食？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '反向节食是一种逐步增加热量摄入的策略，每周增加50-100千卡，目的是恢复代谢而不大幅增加体脂。通常持续4-16周。',
      },
    },
    {
      '@type': 'Question',
      name: '代谢恢复需要多长时间？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '恢复时间取决于受损程度：轻度适应2-4周，中度受损4-8周，严重受损8-16周或更长。大多数代谢适应可以逆转，但需要耐心。',
      },
    },
  ],
};

export default function MetabolicDamageTestPage() {
  const [result, setResult] = useState<MetabolicDamageOutput | null>(null);
  const [inputData, setInputData] = useState<MetabolicDamageInput | null>(null);

  const handleCalculate = (data: MetabolicDamageInput) => {
    const output = calculateMetabolicDamage(data);
    setResult(output);
    setInputData(data);
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
          toolId="metabolic-damage-test"
          title="代谢受损检测器"
          description="评估你的代谢适应程度，获取反向节食恢复方案"
        />

        {/* Main Content - Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Form & Results */}
          <div className="space-y-5">
            <MetabolicDamageForm onCalculate={handleCalculate} />
            
            {result && inputData && (
              <MetabolicDamageResult result={result} inputData={inputData} />
            )}
          </div>

          {/* Right Column - Reference & Info */}
          <div className="space-y-5">
            <MetabolicDamageReference />
          </div>
        </div>

        {/* Explanation Section - Full Width */}
        <div className="mt-8">
          <MetabolicDamageExplanation />
        </div>

        {/* Related Tools */}
        <RelatedTools currentToolId="metabolic-damage-test" />

        {/* SEO Content Section */}
        <section className="mt-10">
          <div className="bg-card rounded-2xl p-6" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
            <h2 className="text-xl font-bold mb-4">关于代谢受损检测</h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground text-sm">
              <div>
                <h3 className="font-semibold text-foreground mb-2">为什么需要检测代谢？</h3>
                <p>
                  长期节食后体重停滞是很多减脂者的困扰。了解自己是否存在代谢适应，
                  可以帮助你调整策略，更科学地达成减脂目标。
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">代谢可以恢复吗？</h3>
                <p>
                  代谢适应是可逆的。通过反向节食、饮食休息、力量训练等方法，
                  大多数人可以在数周到数月内恢复正常代谢水平。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords for SEO */}
        <div className="sr-only">
          代谢受损检测 代谢适应 为什么吃很少不瘦 节食平台期 反向节食
          代谢下降 基础代谢降低 减肥停滞期 代谢恢复 饮食休息
          热量缺口 TDEE计算 BMR计算 减脂瓶颈 体重不降
        </div>
      </div>
    </>
  );
}
