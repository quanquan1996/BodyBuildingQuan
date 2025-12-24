import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';
import { getDictionary, type Locale } from '@/lib/i18n';

// 动态生成多语言 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.muscleAnatomy.title,
    description: dict.muscleAnatomy.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/tools/muscle-anatomy`,
      languages: {
        zh: `${siteConfig.url}/zh/tools/muscle-anatomy`,
        en: `${siteConfig.url}/en/tools/muscle-anatomy`,
      },
    },
    openGraph: {
      title: dict.muscleAnatomy.title,
      description: dict.muscleAnatomy.description,
      url: `${siteConfig.url}/${locale}/tools/muscle-anatomy`,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
    },
  };
}

export default function MuscleAnatomyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
