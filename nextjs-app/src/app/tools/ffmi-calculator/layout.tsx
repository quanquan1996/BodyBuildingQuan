import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'FFMI计算器 - 无脂肪体重指数在线计算',
  description: '免费在线FFMI计算器，输入身高、体重、体脂率，快速计算无脂肪体重指数（Fat-Free Mass Index），科学评估肌肉发达程度。',
  alternates: {
    canonical: `${siteConfig.url}/tools/ffmi-calculator`,
  },
  openGraph: {
    title: 'FFMI计算器 - 无脂肪体重指数在线计算',
    description: '免费在线FFMI计算器，科学评估肌肉发达程度，适合健身爱好者和运动员使用。',
    url: `${siteConfig.url}/tools/ffmi-calculator`,
    type: 'website',
  },
};

export default function FFMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
