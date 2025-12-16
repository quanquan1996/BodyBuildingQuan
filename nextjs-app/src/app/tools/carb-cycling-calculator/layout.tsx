import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '碳循环减脂计算器 - 科学规划碳水循环饮食',
  description: '免费在线碳循环计算器，基于Katch-McArdle公式，快速生成高碳/中碳/低碳日的热量和宏量营养素方案，科学减脂不掉肌肉。',
  alternates: {
    canonical: `${siteConfig.url}/tools/carb-cycling-calculator`,
  },
  openGraph: {
    title: '碳循环减脂计算器 - 科学规划碳水循环饮食',
    description: '免费在线碳循环计算器，科学规划碳水循环饮食，减脂不掉肌肉。',
    url: `${siteConfig.url}/tools/carb-cycling-calculator`,
    type: 'website',
  },
};

export default function CarbCyclingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
