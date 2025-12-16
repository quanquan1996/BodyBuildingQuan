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
  {
    title: '代谢计算器',
    href: '/tools/bmr-calculator',
    description: '基础代谢率和每日热量消耗计算',
  },
  {
    title: '心率区间计算器',
    href: '/tools/heart-rate-calculator',
    description: '有氧心率训练区间计算',
  },
  {
    title: '古典比例计算器',
    href: '/tools/grecian-calculator',
    description: '黄金分割率身材比例评估',
  },
  {
    title: '碳循环计算器',
    href: '/tools/carb-cycling-calculator',
    description: '碳水循环减脂饮食规划',
  },
  {
    title: '减脂饮食计算器',
    href: '/tools/fat-loss-diet-calculator',
    description: '碳水递减减脂饮食计划',
  },
  {
    title: '高碳减脂计算器',
    href: '/tools/high-carb-diet-calculator',
    description: '高碳水低脂肪减脂饮食规划',
  },
  {
    title: '代谢受损检测',
    href: '/tools/metabolic-damage-test',
    description: '评估代谢适应程度，获取恢复方案',
  },
];
