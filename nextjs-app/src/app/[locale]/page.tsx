import { getDictionary, type Locale } from '@/lib/i18n';
import { HeroSection } from '@/components/home/hero-section';
import { FeatureGrid } from '@/components/home/feature-grid';
import { siteConfig } from '@/lib/config/site';
import dynamic from 'next/dynamic';

// 懒加载非首屏组件，减少初始 JS bundle
const WhyChooseUs = dynamic(() => import('@/components/home/why-choose-us').then(m => ({ default: m.WhyChooseUs })));
const UseCases = dynamic(() => import('@/components/home/use-cases').then(m => ({ default: m.UseCases })));

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  const isZh = locale === 'zh';

  // 构建工具列表
  const features = [
    {
      id: 'ffmi-calculator',
      title: dict.ffmiCalculator.title,
      description: dict.ffmiCalculator.description,
      href: `/${locale}/tools/ffmi-calculator`,
      icon: 'calculator' as const,
    },
    {
      id: 'skinfold-calculator',
      title: dict.skinfoldCalculator.title,
      description: dict.skinfoldCalculator.description,
      href: `/${locale}/tools/skinfold-calculator`,
      icon: 'ruler' as const,
    },
    {
      id: 'bmr-calculator',
      title: dict.bmrCalculator.title,
      description: dict.bmrCalculator.description,
      href: `/${locale}/tools/bmr-calculator`,
      icon: 'flame' as const,
    },
    {
      id: 'heart-rate-calculator',
      title: dict.heartRateCalculator.title,
      description: dict.heartRateCalculator.description,
      href: `/${locale}/tools/heart-rate-calculator`,
      icon: 'heart' as const,
    },
    {
      id: 'pose-scorer',
      title: dict.poseComparator.title,
      description: dict.poseComparator.description,
      href: `/${locale}/tools/pose-comparator`,
      icon: 'camera' as const,
    },
    {
      id: 'grecian-calculator',
      title: dict.grecianCalculator.title,
      description: dict.grecianCalculator.description,
      href: `/${locale}/tools/grecian-calculator`,
      icon: 'ratio' as const,
    },

    {
      id: 'carb-cycling-calculator',
      title: dict.carbCyclingCalculator.title,
      description: dict.carbCyclingCalculator.description,
      href: `/${locale}/tools/carb-cycling-calculator`,
      icon: 'refresh' as const,
    },
    {
      id: 'fat-loss-diet-calculator',
      title: dict.fatLossDietCalculator.title,
      description: dict.fatLossDietCalculator.description,
      href: `/${locale}/tools/fat-loss-diet-calculator`,
      icon: 'salad' as const,
    },
    {
      id: 'high-carb-diet-calculator',
      title: dict.highCarbDietCalculator.title,
      description: dict.highCarbDietCalculator.description,
      href: `/${locale}/tools/high-carb-diet-calculator`,
      icon: 'wheat' as const,
    },
    {
      id: 'metabolic-damage-test',
      title: dict.metabolicDamageTest.title,
      description: dict.metabolicDamageTest.description,
      href: `/${locale}/tools/metabolic-damage-test`,
      icon: 'activity' as const,
    },
    {
      id: 'muscle-anatomy',
      title: dict.muscleAnatomy.title,
      description: dict.muscleAnatomy.description,
      href: `/${locale}/tools/muscle-anatomy`,
      icon: 'bone' as const,
    },
  ];

  // JSON-LD structured data
  const lang = isZh ? 'zh' : 'en';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: dict.common.siteName,
    url: `${siteConfig.url}/${locale}`,
    description: siteConfig.description[lang],
    inLanguage: isZh ? 'zh-CN' : 'en',
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: dict.common.siteName,
    url: siteConfig.url,
    description: siteConfig.description[lang],
  };

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
        title={dict.home.heroTitle}
        description={dict.home.heroDescription}
        subtitle={dict.home.heroSubtitle}
        ctaText={dict.home.ctaButton}
        ctaHref={`/${locale}/tools/ffmi-calculator`}
        secondaryCtaText={dict.home.secondaryCta}
        secondaryCtaHref={`/${locale}/tools/fat-loss-diet-calculator`}
        tertiaryCtaText={dict.home.tertiaryCta}
        tertiaryCtaHref={`/${locale}/tools/muscle-anatomy`}
        stats={dict.home.stats}
      />

      {/* Feature Grid */}
      <FeatureGrid features={features} title={dict.home.featuresTitle} />

      {/* Why Choose Us */}
      <WhyChooseUs dict={dict} />

      {/* Use Cases */}
      <UseCases dict={dict} />

      {/* SEO Content Section */}
      <section className="py-12 md:py-16" style={{ background: '#F9FAFB' }}>
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6 md:text-2xl">
              {dict.home.aboutTitle}
            </h2>
            <div className="text-muted-foreground">
              <p className="text-center text-sm mb-6 md:text-base">
                {dict.home.aboutDescription}
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
                    {dict.home.aboutGoalTitle}
                  </h3>
                  <p className="text-sm">{dict.home.aboutGoalDescription}</p>
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
                    {dict.home.aboutPhilosophyTitle}
                  </h3>
                  <p className="text-sm">{dict.home.aboutPhilosophyDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden SEO Keywords */}
      {isZh ? (
        <div className="sr-only">
          健身计算器 健身工具 在线健身 免费健身APP 健身数据分析
          FFMI计算器 体脂率计算器 肌肉量计算 瘦体重计算 BMI计算器
          健美造型 健美评分 健美姿势 古典健美 传统健美 健体
          增肌计划 减脂计划 健身食谱计算 蛋白质摄入计算
        </div>
      ) : (
        <div className="sr-only">
          fitness calculator fitness tools online fitness free fitness app fitness data analysis
          FFMI calculator body fat calculator muscle mass calculator lean mass calculator BMI calculator
          bodybuilding pose bodybuilding scoring classic physique men physique
          muscle building fat loss meal planning protein intake calculator
        </div>
      )}
    </>
  );
}
