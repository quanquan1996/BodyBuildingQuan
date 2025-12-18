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
    title: dict.fatLossDietCalculator.title,
    description: dict.fatLossDietCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/fat-loss-diet-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/fat-loss-diet-calculator`,
        'en': `${siteConfig.url}/en/tools/fat-loss-diet-calculator`,
        'x-default': `${siteConfig.url}/en/tools/fat-loss-diet-calculator`,
      },
    },
    openGraph: {
      title: dict.fatLossDietCalculator.title,
      description: dict.fatLossDietCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/fat-loss-diet-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function FatLossDietCalculatorLayout({ children }: LayoutProps) {
  return children;
}
