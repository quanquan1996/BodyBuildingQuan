'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Ruler, Flame, Heart, Camera, Ratio, HelpCircle, Salad } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToolLinkProps {
  targetTool: string;
  title: string;
  description: string;
  icon: 'calculator' | 'ruler' | 'flame' | 'heart' | 'camera' | 'ratio' | 'help' | 'salad';
  params?: Record<string, string | number>;
  type: 'next-step' | 'prerequisite';
  className?: string;
}

const iconMap = {
  calculator: Calculator,
  ruler: Ruler,
  flame: Flame,
  heart: Heart,
  camera: Camera,
  ratio: Ratio,
  help: HelpCircle,
  salad: Salad,
};

export function ToolLinkCard({
  targetTool,
  title,
  description,
  icon,
  params,
  type,
  className,
}: ToolLinkProps) {
  const Icon = iconMap[icon];
  
  // 构建带参数的 URL
  const buildUrl = () => {
    if (!params || Object.keys(params).length === 0) {
      return targetTool;
    }
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    return queryString ? `${targetTool}?${queryString}` : targetTool;
  };

  return (
    <Link
      href={buildUrl()}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-lg border transition-all duration-200',
        type === 'next-step'
          ? 'bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/40'
          : 'bg-muted/50 border-border hover:bg-muted hover:border-primary/30',
        className
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          type === 'next-step' ? 'bg-primary/10' : 'bg-muted'
        )}
      >
        <Icon className={cn('w-5 h-5', type === 'next-step' ? 'text-primary' : 'text-muted-foreground')} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('font-medium', type === 'next-step' ? 'text-primary' : 'text-foreground')}>
          {title}
        </p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ArrowRight
        className={cn(
          'w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1',
          type === 'next-step' ? 'text-primary' : 'text-muted-foreground'
        )}
      />
    </Link>
  );
}

// 预定义的工具联动配置
export const toolLinks = {
  // 体脂夹 → 其他工具
  skinfoldToFfmi: (bodyFat: number, weight: number, height: number): ToolLinkProps => ({
    targetTool: '/tools/ffmi-calculator',
    title: '计算 FFMI 肌肉指数',
    description: '用测得的体脂率评估肌肉发达程度',
    icon: 'calculator',
    params: { bodyFat, weight, height },
    type: 'next-step',
  }),
  skinfoldToBmr: (bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/bmr-calculator',
    title: '计算精准基础代谢',
    description: '基于体脂率的 Katch-McArdle 公式更准确',
    icon: 'flame',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),
  skinfoldToCarbCycling: (bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: '制定碳循环饮食计划',
    description: '根据体脂率定制高低碳日方案',
    icon: 'flame',
    params: { bodyFat, weight },
    type: 'next-step',
  }),

  // BMR → 其他工具
  bmrToCarbCycling: (bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: '制定碳循环饮食计划',
    description: '基于代谢数据定制饮食方案',
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),
  bmrToHeartRate: (age: number): ToolLinkProps => ({
    targetTool: '/tools/heart-rate-calculator',
    title: '计算训练心率区间',
    description: '了解不同强度的目标心率',
    icon: 'heart',
    params: { age },
    type: 'next-step',
  }),

  // 需要体脂的工具 → 体脂夹
  needBodyFat: (): ToolLinkProps => ({
    targetTool: '/tools/skinfold-calculator',
    title: '不知道体脂率？',
    description: '用体脂夹测量你的体脂率',
    icon: 'ruler',
    type: 'prerequisite',
  }),

  // 古典比例 ↔ 健美造型
  grecianToPose: (): ToolLinkProps => ({
    targetTool: '/tools/pose-comparator',
    title: '评估健美造型',
    description: '上传照片评估你的造型表现',
    icon: 'camera',
    type: 'next-step',
  }),
  poseToGrecian: (): ToolLinkProps => ({
    targetTool: '/tools/grecian-calculator',
    title: '计算理想围度',
    description: '了解古典黄金比例的理想身材',
    icon: 'ratio',
    type: 'next-step',
  }),

  // 体脂夹 → 减脂饮食
  skinfoldToFatLossDiet: (bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: '制定减脂饮食计划',
    description: '碳水递减策略，科学减脂不反弹',
    icon: 'salad',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),

  // BMR → 减脂饮食
  bmrToFatLossDiet: (weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: '制定减脂饮食计划',
    description: '碳水递减策略，适合普通人',
    icon: 'salad',
    params: { weight },
    type: 'next-step',
  }),

  // 碳循环 ↔ 减脂饮食 双向联动
  carbCyclingToFatLossDiet: (bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: '尝试碳水递减方案',
    description: '更简单的线性减脂策略，适合新手',
    icon: 'salad',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),
  fatLossDietToCarbCycling: (bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: '尝试碳循环方案',
    description: '高低碳日交替，适合有训练基础者',
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),

  // 高碳减脂相关联动
  skinfoldToHighCarbDiet: (bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/high-carb-diet-calculator',
    title: '制定高碳减脂计划',
    description: '高碳水低脂肪策略，适合训练量大者',
    icon: 'flame',
    params: { bodyFat, weight },
    type: 'next-step',
  }),
  bmrToHighCarbDiet: (weight: number, bodyFat?: number): ToolLinkProps => ({
    targetTool: '/tools/high-carb-diet-calculator',
    title: '制定高碳减脂计划',
    description: '高碳水低脂肪，保持训练表现',
    icon: 'flame',
    params: { weight, ...(bodyFat ? { bodyFat } : {}) },
    type: 'next-step',
  }),
  highCarbDietToCarbCycling: (bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: '尝试碳循环方案',
    description: '高低碳日交替，更灵活的减脂策略',
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),
};
