import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { locales, isValidLocale, getDictionary, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/lib/config/site';
import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/layout/footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

// 生成静态参数
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 生成 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = getDictionary(locale as Locale);
  const isZh = locale === 'zh';
  const lang = isZh ? 'zh' : 'en';

  return {
    title: {
      default: dict.common.siteName,
      template: `%s | ${dict.common.siteName}`,
    },
    description: siteConfig.description[lang],
    keywords: siteConfig.keywords[lang],
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'zh': `${siteConfig.url}/zh`,
        'en': `${siteConfig.url}/en`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      title: siteConfig.name[lang],
      description: siteConfig.description[lang],
      locale: isZh ? 'zh_CN' : 'en_US',
      siteName: siteConfig.name[lang],
      images: [
        {
          url: siteConfig.ogImage[lang],
          width: 1200,
          height: 630,
          alt: siteConfig.name[lang],
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // 验证 locale 参数
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
