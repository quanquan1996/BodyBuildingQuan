import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { FeatureGrid } from '@/components/home/feature-grid';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { UseCases } from '@/components/home/use-cases';
import { zh } from '@/lib/i18n/zh';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '健身AI工具站 - 免费在线健身计算器',
  description: '免费在线健身工具：FFMI计算器、体脂率计算、基础代谢计算、心率区间计算、AI健美造型评分。帮助健身爱好者科学评估训练效果。',
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: '轻核健身AI工具站 - 免费在线健身计算器',
    description: '免费在线健身工具：FFMI计算器、体脂率计算、基础代谢计算、心率区间计算、AI健美造型评分。',
    url: siteConfig.url,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/og.svg`,
        width: 1200,
        height: 630,
        alt: '轻核健身AI工具站',
      },
    ],
  },
};

const features = [
  {
    id: 'ffmi-calculator',
    title: zh.ffmiCalculator.title,
    description: zh.ffmiCalculator.description,
    href: '/tools/ffmi-calculator',
    icon: 'calculator' as const,
  },
  {
    id: 'skinfold-calculator',
    title: zh.skinfoldCalculator.title,
    description: zh.skinfoldCalculator.description,
    href: '/tools/skinfold-calculator',
    icon: 'ruler' as const,
  },
  {
    id: 'bmr-calculator',
    title: zh.bmrCalculator.title,
    description: zh.bmrCalculator.description,
    href: '/tools/bmr-calculator',
    icon: 'flame' as const,
  },
  {
    id: 'heart-rate-calculator',
    title: zh.heartRateCalculator.title,
    description: zh.heartRateCalculator.description,
    href: '/tools/heart-rate-calculator',
    icon: 'heart' as const,
  },
  {
    id: 'pose-scorer',
    title: zh.poseComparator.title,
    description: zh.poseComparator.description,
    href: '/tools/pose-comparator',
    icon: 'camera' as const,
  },
  {
    id: 'grecian-calculator',
    title: zh.grecianCalculator.title,
    description: zh.grecianCalculator.description,
    href: '/tools/grecian-calculator',
    icon: 'ratio' as const,
  },
  {
    id: 'carb-cycling-calculator',
    title: zh.carbCyclingCalculator.title,
    description: zh.carbCyclingCalculator.description,
    href: '/tools/carb-cycling-calculator',
    icon: 'refresh' as const,
  },
  {
    id: 'fat-loss-diet-calculator',
    title: zh.fatLossDietCalculator.title,
    description: zh.fatLossDietCalculator.description,
    href: '/tools/fat-loss-diet-calculator',
    icon: 'salad' as const,
  },
  {
    id: 'high-carb-diet-calculator',
    title: zh.highCarbDietCalculator.title,
    description: zh.highCarbDietCalculator.description,
    href: '/tools/high-carb-diet-calculator',
    icon: 'wheat' as const,
  },
  {
    id: 'metabolic-damage-test',
    title: zh.metabolicDamageTest.title,
    description: zh.metabolicDamageTest.description,
    href: '/tools/metabolic-damage-test',
    icon: 'activity' as const,
  },
];

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

// Organization schema
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      
      {/* Hero Section */}
      <HeroSection
        title={zh.home.heroTitle}
        description={zh.home.heroDescription}
        subtitle={zh.home.heroSubtitle}
        ctaText={zh.home.ctaButton}
        ctaHref="/tools/ffmi-calculator"
      />
      
      {/* Feature Grid */}
      <FeatureGrid features={features} title={zh.home.featuresTitle} />
      
      {/* Why Choose Us */}
      <WhyChooseUs />
      
      {/* Use Cases / Keywords Section */}
      <UseCases />

      {/* SEO Content Section */}
      <section className="py-12 md:py-16" style={{ background: '#F9FAFB' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6 md:text-2xl">
              关于轻核健身AI工具站
            </h2>
            <div className="text-muted-foreground">
              <p className="text-center text-sm mb-6 md:text-base">
                轻核健身AI工具站是一个免费的在线健身计算器平台，为健身爱好者、健美运动员、
                私人教练提供专业的身体成分分析和训练评估工具。无需下载APP，打开网页即可使用。
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #4CAF50, #81C784)' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    我们的目标
                  </h3>
                  <p className="text-sm">
                    让每一位健身爱好者都能获得专业级的数据分析工具，
                    用科学的方法评估训练效果，制定合理的健身计划。
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    核心理念
                  </h3>
                  <p className="text-sm">
                    数据驱动健身，科学指导训练。通过量化指标帮助你了解身体状况，
                    避免盲目训练，提高健身效率。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden SEO Keywords */}
      <div className="sr-only">
        健身计算器 健身工具 在线健身 免费健身APP 健身数据分析
        FFMI计算器 体脂率计算器 肌肉量计算 瘦体重计算 BMI计算器
        健美造型 健美评分 健美姿势 古典健美 传统健美 健体
        增肌计划 减脂计划 健身食谱计算 蛋白质摄入计算
        健身房 私人教练 健身教练 健身入门 健身新手
        肌肉增长 力量训练 有氧运动 无氧运动 HIIT训练
        健身打卡 健身记录 训练日志 健身目标 身材管理
      </div>
    </>
  );
}
