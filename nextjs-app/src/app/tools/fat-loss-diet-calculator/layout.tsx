import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '减脂饮食计算器 - 碳水递减减脂计划',
  description: '免费在线减脂饮食计算器，采用碳水递减策略，自动生成每周饮食计划，科学减脂不反弹，适合普通健身爱好者。',
  alternates: {
    canonical: `${siteConfig.url}/tools/fat-loss-diet-calculator`,
  },
  openGraph: {
    title: '减脂饮食计算器 - 碳水递减减脂计划',
    description: '免费在线减脂饮食计算器，自动生成每周饮食计划，科学减脂不反弹。',
    url: `${siteConfig.url}/tools/fat-loss-diet-calculator`,
    type: 'website',
  },
};

export default function FatLossDietCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
