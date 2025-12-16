import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '代谢受损检测器 - 在线代谢适应评估',
  description: '免费在线代谢受损检测工具，评估长期节食是否导致代谢适应，提供反向节食恢复方案，帮助你科学恢复代谢。',
  alternates: {
    canonical: `${siteConfig.url}/tools/metabolic-damage-test`,
  },
  openGraph: {
    title: '代谢受损检测器 - 在线代谢适应评估',
    description: '免费在线代谢受损检测工具，评估代谢适应程度，提供恢复方案。',
    url: `${siteConfig.url}/tools/metabolic-damage-test`,
    type: 'website',
  },
};

export default function MetabolicDamageTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
