import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FFMI计算器 - 无脂肪体重指数在线计算 | 肌肉量评估工具',
  description: '免费在线FFMI计算器，输入身高、体重、体脂率，快速计算无脂肪体重指数（Fat-Free Mass Index），科学评估肌肉发达程度。适合健身爱好者、健美运动员使用的专业身体成分分析工具。',
  keywords: [
    'FFMI',
    'FFMI计算器',
    '无脂肪体重指数',
    '肌肉量评估',
    '体脂率计算',
    '瘦体重',
    '身体成分分析',
    '健身指标',
    '健美指数',
    '肌肉发达程度',
  ],
  openGraph: {
    title: 'FFMI计算器 - 无脂肪体重指数在线计算',
    description: '免费在线FFMI计算器，科学评估肌肉发达程度，适合健身爱好者使用。',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: '/tools/ffmi-calculator',
  },
};

export default function FFMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
