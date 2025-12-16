import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '基础代谢计算器 - BMR/TDEE在线计算',
  description: '免费在线基础代谢率(BMR)计算器，使用Mifflin-St Jeor公式，快速计算每日基础代谢和总能量消耗(TDEE)，科学制定饮食计划。',
  alternates: {
    canonical: `${siteConfig.url}/tools/bmr-calculator`,
  },
  openGraph: {
    title: '基础代谢计算器 - BMR/TDEE在线计算',
    description: '免费在线基础代谢率计算器，科学制定饮食计划。',
    url: `${siteConfig.url}/tools/bmr-calculator`,
    type: 'website',
  },
};

export default function BMRCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
