import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, isValidLocale, type Locale } from '@/lib/i18n';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale as Locale);
  const isZh = locale === 'zh';

  return {
    title: dict.carbCyclingCalculator.title,
    description: dict.carbCyclingCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/carb-cycling-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/carb-cycling-calculator`,
        'en': `${siteConfig.url}/en/tools/carb-cycling-calculator`,
        'x-default': `${siteConfig.url}/en/tools/carb-cycling-calculator`,
      },
    },
    openGraph: {
      title: dict.carbCyclingCalculator.title,
      description: dict.carbCyclingCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/carb-cycling-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function CarbCyclingCalculatorLayout({ children }: LayoutProps) {
  return children;
}
