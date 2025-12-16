import { Metadata } from 'next';
import { zh } from '@/lib/i18n/zh';

export const metadata: Metadata = {
  title: '健美造型评分器 - AI驱动的健美姿势评分',
  description: zh.poseComparator.metaDescription,
  keywords: ['健美造型', '健美评分', 'AI姿势分析', '健美姿势', '造型评分', 'MediaPipe'],
};

export default function PoseComparatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
