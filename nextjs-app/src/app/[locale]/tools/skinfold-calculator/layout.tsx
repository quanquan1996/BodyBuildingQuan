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
    title: dict.skinfoldCalculator.title,
    description: dict.skinfoldCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/skinfold-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/skinfold-calculator`,
        'en': `${siteConfig.url}/en/tools/skinfold-calculator`,
        'x-default': `${siteConfig.url}/en/tools/skinfold-calculator`,
      },
    },
    openGraph: {
      title: dict.skinfoldCalculator.title,
      description: dict.skinfoldCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/skinfold-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function SkinfoldCalculatorLayout({ children }: LayoutProps) {
  return children;
}
