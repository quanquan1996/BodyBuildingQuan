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
    title: dict.poseComparator.title,
    description: dict.poseComparator.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/pose-comparator`,
      languages: {
        'zh': `${siteConfig.url}/zh/tools/pose-comparator`,
        'en': `${siteConfig.url}/en/tools/pose-comparator`,
        'x-default': `${siteConfig.url}/en/tools/pose-comparator`,
      },
    },
    openGraph: {
      title: dict.poseComparator.title,
      description: dict.poseComparator.description,
      url: `${siteConfig.url}/${locale}/tools/pose-comparator`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
    },
  };
}

export default function PoseComparatorLayout({ children }: LayoutProps) {
  return children;
}
