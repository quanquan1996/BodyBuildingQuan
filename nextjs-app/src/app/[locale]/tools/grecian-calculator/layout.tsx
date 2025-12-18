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
    title: dict.grecianCalculator.title,
    description: dict.grecianCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/grecian-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/grecian-calculator`,
        'en': `${siteConfig.url}/en/tools/grecian-calculator`,
        'x-default': `${siteConfig.url}/en/tools/grecian-calculator`,
      },
    },
    openGraph: {
      title: dict.grecianCalculator.title,
      description: dict.grecianCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/grecian-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function GrecianCalculatorLayout({ children }: LayoutProps) {
  return children;
}
