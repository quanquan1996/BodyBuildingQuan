import { type ActivityLevel } from './bmr';

export type FatLossDietMode = 'basic' | 'advanced';

export interface FatLossDietInputBasic {
  mode: 'basic';
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
  weeks: number; // 减脂周数
}

export interface FatLossDietInputAdvanced {
  mode: 'advanced';
  weightKg: number;
  bodyFatPercent: number;
  activityLevel: ActivityLevel;
  weeks: number;
}

export type FatLossDietInput = FatLossDietInputBasic | FatLossDietInputAdvanced;

export interface WeekPlan {
  week: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  carbReduction: number; // 相比第一周减少的碳水克数
  deficit: number; // 热量缺口
}

export interface FatLossDietOutput {
  bmr: number;
  tdee: number;
  formula: 'mifflin' | 'katch';
  leanMass?: number;
  weekPlans: WeekPlan[];
  totalDeficit: number; // 总热量缺口
  estimatedFatLoss: number; // 预估减脂量 (kg)
  proteinPerKg: number;
  initialCarbs: number;
  finalCarbs: number;
}

// 活动系数
const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// 蛋白质系数 (g/kg 体重)
const PROTEIN_PER_KG = 2.0;

// 脂肪最低系数 (g/kg 体重)
const MIN_FAT_PER_KG = 0.8;

// 每周碳水递减比例
const CARB_REDUCTION_PER_WEEK = 0.08; // 每周减少8%

// 初始碳水占热量比例
const INITIAL_CARB_RATIO = 0.45; // 45%

// 最低碳水占热量比例
const MIN_CARB_RATIO = 0.20; // 20%

// 初始热量缺口
const INITIAL_DEFICIT = 300; // 第一周减少300卡

// 每周增加的热量缺口
const DEFICIT_INCREMENT = 50; // 每周多减50卡

// 最大热量缺口
const MAX_DEFICIT = 600;

/**
 * Mifflin-St Jeor 公式计算 BMR
 */
function calculateMifflinBMR(
  heightCm: number,
  weightKg: number,
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

/**
 * Katch-McArdle 公式计算 BMR
 */
function calculateKatchBMR(
  weightKg: number,
  bodyFatPercent: number
): { bmr: number; leanMass: number } {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  const bmr = 370 + 21.6 * leanMass;
  return {
    bmr: Math.round(bmr),
    leanMass: Math.round(leanMass * 10) / 10,
  };
}

/**
 * 计算单周营养方案
 */
function calculateWeekPlan(
  week: number,
  tdee: number,
  weightKg: number,
  initialCarbCalories: number
): WeekPlan {
  // 计算当周热量缺口（递增）
  const deficit = Math.min(INITIAL_DEFICIT + (week - 1) * DEFICIT_INCREMENT, MAX_DEFICIT);
  const calories = Math.round(tdee - deficit);

  // 蛋白质固定
  const protein = Math.round(weightKg * PROTEIN_PER_KG);
  const proteinCalories = protein * 4;

  // 碳水递减
  const carbReductionRatio = Math.min((week - 1) * CARB_REDUCTION_PER_WEEK, 1 - MIN_CARB_RATIO / INITIAL_CARB_RATIO);
  const currentCarbCalories = Math.round(initialCarbCalories * (1 - carbReductionRatio));
  const carbs = Math.round(currentCarbCalories / 4);
  const carbReduction = Math.round((initialCarbCalories - currentCarbCalories) / 4);

  // 脂肪补足剩余热量
  let fatCalories = calories - proteinCalories - currentCarbCalories;
  let fat = Math.round(fatCalories / 9);

  // 确保脂肪不低于最低值
  const minFat = Math.round(weightKg * MIN_FAT_PER_KG);
  if (fat < minFat) {
    fat = minFat;
  }

  return {
    week,
    calories,
    protein,
    carbs,
    fat,
    carbReduction,
    deficit,
  };
}

/**
 * 计算减脂饮食方案
 */
export function calculateFatLossDiet(input: FatLossDietInput): FatLossDietOutput {
  let bmr: number;
  let leanMass: number | undefined;
  let formula: 'mifflin' | 'katch';

  if (input.mode === 'advanced') {
    const result = calculateKatchBMR(input.weightKg, input.bodyFatPercent);
    bmr = result.bmr;
    leanMass = result.leanMass;
    formula = 'katch';
  } else {
    bmr = Math.round(calculateMifflinBMR(input.heightCm, input.weightKg, input.age, input.gender));
    formula = 'mifflin';
  }

  const tdee = Math.round(bmr * activityMultipliers[input.activityLevel]);

  // 计算初始碳水热量
  const initialCarbCalories = Math.round(tdee * INITIAL_CARB_RATIO);
  const initialCarbs = Math.round(initialCarbCalories / 4);

  // 生成每周计划
  const weekPlans: WeekPlan[] = [];
  for (let week = 1; week <= input.weeks; week++) {
    weekPlans.push(calculateWeekPlan(week, tdee, input.weightKg, initialCarbCalories));
  }

  // 计算总热量缺口
  const totalDeficit = weekPlans.reduce((sum, plan) => sum + plan.deficit * 7, 0);

  // 预估减脂量 (7700卡 ≈ 1kg 脂肪)
  const estimatedFatLoss = Math.round((totalDeficit / 7700) * 10) / 10;

  // 最终碳水
  const finalCarbs = weekPlans[weekPlans.length - 1]?.carbs || initialCarbs;

  return {
    bmr,
    tdee,
    formula,
    leanMass,
    weekPlans,
    totalDeficit,
    estimatedFatLoss,
    proteinPerKg: PROTEIN_PER_KG,
    initialCarbs,
    finalCarbs,
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    height?: string;
    weight?: string;
    age?: string;
    bodyFat?: string;
    weeks?: string;
  };
}

export function validateFatLossDietInputBasic(
  input: Partial<FatLossDietInputBasic>
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (input.heightCm === undefined || input.heightCm < 100 || input.heightCm > 250) {
    errors.height = '请输入有效身高 (100-250 cm)';
  }

  if (input.weightKg === undefined || input.weightKg < 30 || input.weightKg > 300) {
    errors.weight = '请输入有效体重 (30-300 kg)';
  }

  if (input.age === undefined || input.age < 10 || input.age > 120) {
    errors.age = '请输入有效年龄 (10-120 岁)';
  }

  if (input.weeks === undefined || input.weeks < 1 || input.weeks > 12) {
    errors.weeks = '请输入有效周数 (1-12 周)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateFatLossDietInputAdvanced(
  input: Partial<FatLossDietInputAdvanced>
): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (input.weightKg === undefined || input.weightKg < 30 || input.weightKg > 300) {
    errors.weight = '请输入有效体重 (30-300 kg)';
  }

  if (input.bodyFatPercent === undefined || input.bodyFatPercent < 3 || input.bodyFatPercent > 60) {
    errors.bodyFat = '请输入有效体脂率 (3-60%)';
  }

  if (input.weeks === undefined || input.weeks < 1 || input.weeks > 12) {
    errors.weeks = '请输入有效周数 (1-12 周)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
