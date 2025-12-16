import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '健美造型评分器 - AI姿势评分工具',
  description: '免费在线健美造型评分器，基于AI姿态检测技术，对比你的健美造型与参考图片，自动计算姿态角度差异并给出评分。',
  alternates: {
    canonical: `${siteConfig.url}/tools/pose-comparator`,
  },
  openGraph: {
    title: '健美造型评分器 - AI姿势评分工具',
    description: '免费在线健美造型评分器，支持古典健美、传统健美、健体等多种造型评分。',
    url: `${siteConfig.url}/tools/pose-comparator`,
    type: 'website',
  },
};

export default function PoseComparatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
