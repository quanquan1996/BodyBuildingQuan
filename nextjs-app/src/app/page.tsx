import { HeroSection } from '@/components/home/hero-section';
import { FeatureGrid } from '@/components/home/feature-grid';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { UseCases } from '@/components/home/use-cases';
import { zh } from '@/lib/i18n/zh';
import { siteConfig } from '@/lib/config/site';

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
    id: 'pose-scorer',
    title: zh.poseComparator.title,
    description: zh.poseComparator.description,
    href: '/tools/pose-comparator',
    icon: 'camera' as const,
  },
];

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// Organization schema
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: [],
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
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              关于健身AI工具站
            </h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="text-center mb-6">
                健身AI工具站是一个免费的在线健身计算器平台，为健身爱好者、健美运动员、
                私人教练提供专业的身体成分分析和训练评估工具。无需下载APP，打开网页即可使用。
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">🎯 我们的目标</h3>
                  <p className="text-sm">
                    让每一位健身爱好者都能获得专业级的数据分析工具，
                    用科学的方法评估训练效果，制定合理的健身计划。
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">💡 核心理念</h3>
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
