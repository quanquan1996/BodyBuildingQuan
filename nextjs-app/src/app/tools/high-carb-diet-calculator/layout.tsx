import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '高碳减脂计算器 - 高碳水低脂肪减脂饮食规划',
  description: '免费在线高碳减脂计算器，基于高碳水低脂肪策略，区分训练日、休息日、再喂日，科学规划减脂饮食。',
  alternates: {
    canonical: `${siteConfig.url}/tools/high-carb-diet-calculator`,
  },
  openGraph: {
    title: '高碳减脂计算器 - 高碳水低脂肪减脂饮食规划',
    description: '免费在线高碳减脂计算器，训练日/休息日/再喂日三档规划。',
    url: `${siteConfig.url}/tools/high-carb-diet-calculator`,
    type: 'website',
  },
};

export default function HighCarbDietCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
