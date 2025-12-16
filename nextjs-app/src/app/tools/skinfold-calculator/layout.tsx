import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '体脂夹计算器 - 皮褶厚度法体脂率在线计算',
  description: '免费在线体脂夹计算器，支持3点和7点皮褶厚度测量法，使用Jackson-Pollock公式精确计算体脂率。',
  alternates: {
    canonical: `${siteConfig.url}/tools/skinfold-calculator`,
  },
  openGraph: {
    title: '体脂夹计算器 - 皮褶厚度法体脂率在线计算',
    description: '免费在线体脂夹计算器，支持3点和7点皮褶厚度测量法，精确计算体脂率。',
    url: `${siteConfig.url}/tools/skinfold-calculator`,
    type: 'website',
  },
};

export default function SkinfoldCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
