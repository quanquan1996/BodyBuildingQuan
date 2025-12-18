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
    title: dict.ffmiCalculator.title,
    description: dict.ffmiCalculator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/ffmi-calculator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/ffmi-calculator`,
        'en': `${siteConfig.url}/en/tools/ffmi-calculator`,
        'x-default': `${siteConfig.url}/en/tools/ffmi-calculator`,
      },
    },
    openGraph: {
      title: dict.ffmiCalculator.title,
      description: dict.ffmiCalculator.description,
      url: `${siteConfig.url}/${locale}/tools/ffmi-calculator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function FFMICalculatorLayout({ children }: LayoutProps) {
  return children;
}
