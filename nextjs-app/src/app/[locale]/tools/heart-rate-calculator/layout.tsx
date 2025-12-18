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
    title: dict.heartRateCalculator.title,
    description: dict.heartRateCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/heart-rate-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/heart-rate-calculator`,
        'en': `${siteConfig.url}/en/tools/heart-rate-calculator`,
        'x-default': `${siteConfig.url}/en/tools/heart-rate-calculator`,
      },
    },
    openGraph: {
      title: dict.heartRateCalculator.title,
      description: dict.heartRateCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/heart-rate-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function HeartRateCalculatorLayout({ children }: LayoutProps) {
  return children;
}
