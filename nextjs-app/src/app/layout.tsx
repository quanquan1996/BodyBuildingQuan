import type { Metadata } from 'next';
import { Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/config/site';

// 优化：只加载必要的字体和字重，添加 display: swap
const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],  // 移除 300，减少字体文件
  display: 'swap',  // 防止字体阻塞渲染
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name.en,
    template: `%s | ${siteConfig.name.en}`,
  },
  description: siteConfig.description.en,
  keywords: siteConfig.keywords.en,
  authors: [{ name: siteConfig.name.en }],
  creator: siteConfig.name.en,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name.en,
    description: siteConfig.description.en,
    siteName: siteConfig.name.en,
    images: [
      {
        url: siteConfig.ogImage.en,
        width: 1200,
        height: 630,
        alt: siteConfig.name.en,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name.en,
    description: siteConfig.description.en,
    images: [siteConfig.ogImage.en],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for CDN resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body
        className={`${notoSansSC.variable} font-[family-name:var(--font-noto-sans-sc)] antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
