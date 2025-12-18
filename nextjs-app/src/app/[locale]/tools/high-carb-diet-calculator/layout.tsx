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
    title: dict.highCarbDietCalculator.title,
    description: dict.highCarbDietCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/high-carb-diet-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/high-carb-diet-calculator`,
        'en': `${siteConfig.url}/en/tools/high-carb-diet-calculator`,
        'x-default': `${siteConfig.url}/en/tools/high-carb-diet-calculator`,
      },
    },
    openGraph: {
      title: dict.highCarbDietCalculator.title,
      description: dict.highCarbDietCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/high-carb-diet-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function HighCarbDietCalculatorLayout({ children }: LayoutProps) {
  return children;
}
