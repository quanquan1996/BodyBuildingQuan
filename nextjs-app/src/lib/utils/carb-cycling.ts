import { type ActivityLevel } from './bmr';

export type CarbCyclingMode = 'simple' | 'advanced';

export interface CarbCyclingInput {
  mode: CarbCyclingMode;
  weightKg: number;
  bodyFatPercent: number;
  activityLevel: ActivityLevel;
}

export interface DayPlan {
  dayType: 'high' | 'medium' | 'low';
  label: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  trainingAdvice: string;
}

export interface WeekSchedule {
  days: { day: string; type: 'high' | 'medium' | 'low' }[];
  highDays: number;
  mediumDays: number;
  lowDays: number;
}

export interface CarbCyclingOutput {
  bmr: number;
  tdee: number;
  leanMass: number;
  mode: CarbCyclingMode;
  dayPlans: DayPlan[];
  weeklyAverage: number;
  weekSchedule: WeekSchedule;
}

// 活动系数（复用 BMR 模块的定义）
const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};


// 热量分配比例
const calorieRatios = {
  simple: {
    high: 1.0,   // 100% TDEE
    low: 0.8,    // 80% TDEE
  },
  advanced: {
    high: 1.1,   // 110% TDEE
    medium: 1.0, // 100% TDEE
    low: 0.8,    // 80% TDEE
  },
};

// 碳水占热量比例
const carbRatios = {
  high: 0.5,    // 50%
  medium: 0.35, // 35%
  low: 0.2,     // 20%
};

// 蛋白质系数 (g/kg)
const proteinPerKg = {
  high: 2.0,
  medium: 2.0,
  low: 2.2,
};

// 最低脂肪系数 (g/kg)
const minFatPerKg = 0.8;

// 日期类型标签
const dayLabels = {
  high: '高碳日',
  medium: '中碳日',
  low: '低碳日',
};

// 训练建议
const trainingAdvice = {
  high: '适合高强度力量训练或大肌群训练日',
  medium: '适合中等强度训练或小肌群训练日',
  low: '适合休息日或低强度有氧运动',
};

/**
 * 使用 Katch-McArdle 公式计算 BMR
 */
function calculateKatchBMR(weightKg: number, bodyFatPercent: number): { bmr: number; leanMass: number } {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  const bmr = 370 + 21.6 * leanMass;
  return {
    bmr: Math.round(bmr),
    leanMass: Math.round(leanMass * 10) / 10,
  };
}

/**
 * 计算单日营养方案
 */
function calculateDayPlan(
  dayType: 'high' | 'medium' | 'low',
  tdee: number,
  weightKg: number,
  calorieRatio: number
): DayPlan {
  const calories = Math.round(tdee * calorieRatio);
  
  // 蛋白质固定 (g/kg)
  const protein = Math.round(weightKg * proteinPerKg[dayType]);
  const proteinCalories = protein * 4;
  
  // 碳水按比例
  const carbCalories = Math.round(calories * carbRatios[dayType]);
  const carbs = Math.round(carbCalories / 4);
  
  // 脂肪补足剩余热量
  let fatCalories = calories - proteinCalories - carbCalories;
  let fat = Math.round(fatCalories / 9);
  
  // 确保脂肪不低于最低值
  const minFat = Math.round(weightKg * minFatPerKg);
  if (fat < minFat) {
    fat = minFat;
    fatCalories = fat * 9;
  }
  
  // 重新计算实际热量和百分比
  const actualCalories = proteinCalories + carbCalories + fatCalories;
  
  return {
    dayType,
    label: dayLabels[dayType],
    calories: actualCalories,
    protein,
    carbs,
    fat,
    proteinPercent: Math.round((proteinCalories / actualCalories) * 100),
    carbsPercent: Math.round((carbCalories / actualCalories) * 100),
    fatPercent: Math.round((fatCalories / actualCalories) * 100),
    trainingAdvice: trainingAdvice[dayType],
  };
}


/**
 * 获取周计划安排
 */
function getWeekSchedule(mode: CarbCyclingMode): WeekSchedule {
  if (mode === 'simple') {
    // 简易版：2高5低
    return {
      days: [
        { day: '周一', type: 'low' },
        { day: '周二', type: 'low' },
        { day: '周三', type: 'high' },
        { day: '周四', type: 'low' },
        { day: '周五', type: 'low' },
        { day: '周六', type: 'high' },
        { day: '周日', type: 'low' },
      ],
      highDays: 2,
      mediumDays: 0,
      lowDays: 5,
    };
  }
  
  // 进阶版：2高2中3低
  return {
    days: [
      { day: '周一', type: 'medium' },
      { day: '周二', type: 'low' },
      { day: '周三', type: 'high' },
      { day: '周四', type: 'low' },
      { day: '周五', type: 'medium' },
      { day: '周六', type: 'high' },
      { day: '周日', type: 'low' },
    ],
    highDays: 2,
    mediumDays: 2,
    lowDays: 3,
  };
}

/**
 * 计算碳循环方案
 */
export function calculateCarbCycling(input: CarbCyclingInput): CarbCyclingOutput {
  const { mode, weightKg, bodyFatPercent, activityLevel } = input;
  
  // 计算 BMR 和瘦体重
  const { bmr, leanMass } = calculateKatchBMR(weightKg, bodyFatPercent);
  
  // 计算 TDEE
  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);
  
  // 计算各日期类型的营养方案
  const dayPlans: DayPlan[] = [];
  
  if (mode === 'simple') {
    dayPlans.push(calculateDayPlan('high', tdee, weightKg, calorieRatios.simple.high));
    dayPlans.push(calculateDayPlan('low', tdee, weightKg, calorieRatios.simple.low));
  } else {
    dayPlans.push(calculateDayPlan('high', tdee, weightKg, calorieRatios.advanced.high));
    dayPlans.push(calculateDayPlan('medium', tdee, weightKg, calorieRatios.advanced.medium));
    dayPlans.push(calculateDayPlan('low', tdee, weightKg, calorieRatios.advanced.low));
  }
  
  // 获取周计划
  const weekSchedule = getWeekSchedule(mode);
  
  // 计算周平均热量
  let totalWeeklyCalories = 0;
  weekSchedule.days.forEach(({ type }) => {
    const plan = dayPlans.find(p => p.dayType === type);
    if (plan) {
      totalWeeklyCalories += plan.calories;
    }
  });
  const weeklyAverage = Math.round(totalWeeklyCalories / 7);
  
  return {
    bmr,
    tdee,
    leanMass,
    mode,
    dayPlans,
    weeklyAverage,
    weekSchedule,
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    weight?: string;
    bodyFat?: string;
  };
}

export function validateCarbCyclingInput(input: Partial<CarbCyclingInput>): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  
  if (input.weightKg === undefined || input.weightKg < 30 || input.weightKg > 300) {
    errors.weight = '请输入有效体重 (30-300 kg)';
  }
  
  if (input.bodyFatPercent === undefined || input.bodyFatPercent < 3 || input.bodyFatPercent > 60) {
    errors.bodyFat = '请输入有效体脂率 (3-60%)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
