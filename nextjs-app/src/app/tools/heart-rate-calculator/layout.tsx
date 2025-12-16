import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '有氧心率区间计算器 - 心率训练区间在线计算',
  description: '免费在线心率区间计算器，输入年龄自动计算五大心率训练区间，支持Karvonen公式，科学指导有氧训练强度。',
  alternates: {
    canonical: `${siteConfig.url}/tools/heart-rate-calculator`,
  },
  openGraph: {
    title: '有氧心率区间计算器 - 心率训练区间在线计算',
    description: '免费在线心率区间计算器，科学指导有氧训练强度，提升燃脂和心肺耐力效果。',
    url: `${siteConfig.url}/tools/heart-rate-calculator`,
    type: 'website',
  },
};

export default function HeartRateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
