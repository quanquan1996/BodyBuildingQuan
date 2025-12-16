export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const mainNav: NavItem[] = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '健美造型评分器',
    href: '/tools/pose-comparator',
    description: 'AI驱动的健美造型评分工具',
  },
  {
    title: 'FFMI计算器',
    href: '/tools/ffmi-calculator',
    description: '无脂肪体重指数计算器',
  },
  {
    title: '体脂夹计算器',
    href: '/tools/skinfold-calculator',
    description: '皮褶厚度法体脂率计算',
  },
];
