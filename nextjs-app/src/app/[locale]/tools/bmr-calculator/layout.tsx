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
    title: dict.bmrCalculator.title,
    description: dict.bmrCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/bmr-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/bmr-calculator`,
        'en': `${siteConfig.url}/en/tools/bmr-calculator`,
        'x-default': `${siteConfig.url}/en/tools/bmr-calculator`,
      },
    },
    openGraph: {
      title: dict.bmrCalculator.title,
      description: dict.bmrCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/bmr-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function BMRCalculatorLayout({ children }: LayoutProps) {
  return children;
}
