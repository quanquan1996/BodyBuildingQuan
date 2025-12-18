'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, Ruler, Flame, Heart, Camera, Ratio, HelpCircle, Salad, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n';

export interface ToolLinkProps {
  targetTool: string;
  title: string;
  description: string;
  icon: 'calculator' | 'ruler' | 'flame' | 'heart' | 'camera' | 'ratio' | 'help' | 'salad' | 'activity';
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
  activity: Activity,
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

// 预定义的工具联动配置 - 使用 dict 获取翻译文本
export const toolLinks = {
  // 体脂夹 → 其他工具
  skinfoldToFfmi: (dict: Dictionary, bodyFat: number, weight: number, height: number): ToolLinkProps => ({
    targetTool: '/tools/ffmi-calculator',
    title: dict.common.toolLinks.skinfoldToFfmi.title,
    description: dict.common.toolLinks.skinfoldToFfmi.description,
    icon: 'calculator',
    params: { bodyFat, weight, height },
    type: 'next-step',
  }),
  skinfoldToBmr: (dict: Dictionary, bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/bmr-calculator',
    title: dict.common.toolLinks.skinfoldToBmr.title,
    description: dict.common.toolLinks.skinfoldToBmr.description,
    icon: 'flame',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),
  skinfoldToCarbCycling: (dict: Dictionary, bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: dict.common.toolLinks.skinfoldToCarbCycling.title,
    description: dict.common.toolLinks.skinfoldToCarbCycling.description,
    icon: 'flame',
    params: { bodyFat, weight },
    type: 'next-step',
  }),

  // BMR → 其他工具
  bmrToCarbCycling: (dict: Dictionary, bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: dict.common.toolLinks.bmrToCarbCycling.title,
    description: dict.common.toolLinks.bmrToCarbCycling.description,
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),
  bmrToHeartRate: (dict: Dictionary, age: number): ToolLinkProps => ({
    targetTool: '/tools/heart-rate-calculator',
    title: dict.common.toolLinks.bmrToHeartRate.title,
    description: dict.common.toolLinks.bmrToHeartRate.description,
    icon: 'heart',
    params: { age },
    type: 'next-step',
  }),

  // 需要体脂的工具 → 体脂夹
  needBodyFat: (dict: Dictionary): ToolLinkProps => ({
    targetTool: '/tools/skinfold-calculator',
    title: dict.common.toolLinks.needBodyFat.title,
    description: dict.common.toolLinks.needBodyFat.description,
    icon: 'ruler',
    type: 'prerequisite',
  }),

  // 古典比例 ↔ 健美造型
  grecianToPose: (dict: Dictionary): ToolLinkProps => ({
    targetTool: '/tools/pose-comparator',
    title: dict.common.toolLinks.grecianToPose.title,
    description: dict.common.toolLinks.grecianToPose.description,
    icon: 'camera',
    type: 'next-step',
  }),
  poseToGrecian: (dict: Dictionary): ToolLinkProps => ({
    targetTool: '/tools/grecian-calculator',
    title: dict.common.toolLinks.poseToGrecian.title,
    description: dict.common.toolLinks.poseToGrecian.description,
    icon: 'ratio',
    type: 'next-step',
  }),

  // 体脂夹 → 减脂饮食
  skinfoldToFatLossDiet: (dict: Dictionary, bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: dict.common.toolLinks.skinfoldToFatLossDiet.title,
    description: dict.common.toolLinks.skinfoldToFatLossDiet.description,
    icon: 'salad',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),

  // BMR → 减脂饮食
  bmrToFatLossDiet: (dict: Dictionary, weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: dict.common.toolLinks.bmrToFatLossDiet.title,
    description: dict.common.toolLinks.bmrToFatLossDiet.description,
    icon: 'salad',
    params: { weight },
    type: 'next-step',
  }),

  // 碳循环 ↔ 减脂饮食 双向联动
  carbCyclingToFatLossDiet: (dict: Dictionary, bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/fat-loss-diet-calculator',
    title: dict.common.toolLinks.carbCyclingToFatLossDiet.title,
    description: dict.common.toolLinks.carbCyclingToFatLossDiet.description,
    icon: 'salad',
    params: { bodyFat, weight, mode: 'advanced' },
    type: 'next-step',
  }),
  fatLossDietToCarbCycling: (dict: Dictionary, bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: dict.common.toolLinks.fatLossDietToCarbCycling.title,
    description: dict.common.toolLinks.fatLossDietToCarbCycling.description,
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),

  // 高碳减脂相关联动
  skinfoldToHighCarbDiet: (dict: Dictionary, bodyFat: number, weight: number): ToolLinkProps => ({
    targetTool: '/tools/high-carb-diet-calculator',
    title: dict.common.toolLinks.skinfoldToHighCarbDiet.title,
    description: dict.common.toolLinks.skinfoldToHighCarbDiet.description,
    icon: 'flame',
    params: { bodyFat, weight },
    type: 'next-step',
  }),
  bmrToHighCarbDiet: (dict: Dictionary, weight: number, bodyFat?: number): ToolLinkProps => ({
    targetTool: '/tools/high-carb-diet-calculator',
    title: dict.common.toolLinks.bmrToHighCarbDiet.title,
    description: dict.common.toolLinks.bmrToHighCarbDiet.description,
    icon: 'flame',
    params: { weight, ...(bodyFat ? { bodyFat } : {}) },
    type: 'next-step',
  }),
  highCarbDietToCarbCycling: (dict: Dictionary, bodyFat: number, weight: number, activityLevel: string): ToolLinkProps => ({
    targetTool: '/tools/carb-cycling-calculator',
    title: dict.common.toolLinks.highCarbDietToCarbCycling.title,
    description: dict.common.toolLinks.highCarbDietToCarbCycling.description,
    icon: 'flame',
    params: { bodyFat, weight, activityLevel },
    type: 'next-step',
  }),

  // 代谢受损检测相关联动
  toMetabolicDamageTest: (dict: Dictionary, weight: number, height?: number, age?: number, bodyFat?: number): ToolLinkProps => ({
    targetTool: '/tools/metabolic-damage-test',
    title: dict.common.toolLinks.toMetabolicDamageTest.title,
    description: dict.common.toolLinks.toMetabolicDamageTest.description,
    icon: 'activity',
    params: { 
      weight, 
      ...(height ? { height } : {}),
      ...(age ? { age } : {}),
      ...(bodyFat ? { bodyFat } : {}),
    },
    type: 'next-step',
  }),
  metabolicDamageToReverseDiet: (dict: Dictionary, weight: number, bodyFat?: number): ToolLinkProps => ({
    targetTool: '/tools/high-carb-diet-calculator',
    title: dict.common.toolLinks.metabolicDamageToReverseDiet.title,
    description: dict.common.toolLinks.metabolicDamageToReverseDiet.description,
    icon: 'flame',
    params: { weight, ...(bodyFat ? { bodyFat } : {}) },
    type: 'next-step',
  }),
};
