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
    title: dict.metabolicDamageTest.title,
    description: dict.metabolicDamageTest.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/metabolic-damage-test`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/metabolic-damage-test`,
        'en': `${siteConfig.url}/en/tools/metabolic-damage-test`,
        'x-default': `${siteConfig.url}/en/tools/metabolic-damage-test`,
      },
    },
    openGraph: {
      title: dict.metabolicDamageTest.title,
      description: dict.metabolicDamageTest.description,
      url: `${siteConfig.url}/${locale}/tools/metabolic-damage-test`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function MetabolicDamageTestLayout({ children }: LayoutProps) {
  return children;
}
