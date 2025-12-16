import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '古典比例计算器 - 希腊雕塑黄金分割身材评估',
  description: '免费在线古典比例计算器，基于希腊雕塑比例和黄金分割率（1.618），评估你的身材对称性，帮助健美爱好者打造完美比例。',
  alternates: {
    canonical: `${siteConfig.url}/tools/grecian-calculator`,
  },
  openGraph: {
    title: '古典比例计算器 - 希腊雕塑黄金分割身材评估',
    description: '免费在线古典比例计算器，基于黄金分割率评估身材对称性。',
    url: `${siteConfig.url}/tools/grecian-calculator`,
    type: 'website',
  },
};

export default function GrecianCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
