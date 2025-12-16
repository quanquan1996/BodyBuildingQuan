export type CalculationMode = 'basic' | 'advanced';

export interface BMRInputBasic {
  mode: 'basic';
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
}

export interface BMRInputAdvanced {
  mode: 'advanced';
  weightKg: number;
  bodyFatPercent: number;
  activityLevel: ActivityLevel;
}

export type BMRInput = BMRInputBasic | BMRInputAdvanced;

export type ActivityLevel = 
  | 'sedentary'      // 久坐不动
  | 'light'          // 轻度活动
  | 'moderate'       // 中度活动
  | 'active'         // 积极活动
  | 'very_active';   // 非常活跃

export interface BMROutput {
  bmr: number;           // 基础代谢率 (kcal/day)
  tdee: number;          // 每日总能量消耗 (kcal/day)
  activityMultiplier: number;
  formula: 'mifflin' | 'katch';
  leanMass?: number;     // 瘦体重 (kg)，仅进阶模式
}

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,      // 久坐，几乎不运动
  light: 1.375,        // 轻度运动 1-3天/周
  moderate: 1.55,      // 中度运动 3-5天/周
  active: 1.725,       // 高强度运动 6-7天/周
  very_active: 1.9,    // 非常高强度运动或体力劳动
};

export const activityLevelLabels: Record<ActivityLevel, { label: string; description: string }> = {
  sedentary: { label: '久坐不动', description: '办公室工作，几乎不运动' },
  light: { label: '轻度活动', description: '轻度运动 1-3 天/周' },
  moderate: { label: '中度活动', description: '中度运动 3-5 天/周' },
  active: { label: '积极活动', description: '高强度运动 6-7 天/周' },
  very_active: { label: '非常活跃', description: '高强度运动 + 体力劳动' },
};

/**
 * 基础模式：使用 Mifflin-St Jeor 公式计算基础代谢率
 */
function calculateMifflin(input: BMRInputBasic): BMROutput {
  let bmr: number;
  
  if (input.gender === 'male') {
    // 男性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 + 5
    bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + 5;
  } else {
    // 女性: BMR = 10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 - 161
    bmr = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age - 161;
  }
  
  const activityMultiplier = activityMultipliers[input.activityLevel];
  const tdee = bmr * activityMultiplier;
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    activityMultiplier,
    formula: 'mifflin',
  };
}

/**
 * 进阶模式：使用 Katch-McArdle 公式计算基础代谢率
 * 基于瘦体重，对健身人群更准确
 */
function calculateKatch(input: BMRInputAdvanced): BMROutput {
  // 计算瘦体重
  const leanMass = input.weightKg * (1 - input.bodyFatPercent / 100);
  
  // Katch-McArdle 公式: BMR = 370 + (21.6 × 瘦体重)
  const bmr = 370 + 21.6 * leanMass;
  
  const activityMultiplier = activityMultipliers[input.activityLevel];
  const tdee = bmr * activityMultiplier;
  
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    activityMultiplier,
    formula: 'katch',
    leanMass: Math.round(leanMass * 10) / 10,
  };
}

/**
 * 计算基础代谢率
 */
export function calculateBMR(input: BMRInput): BMROutput {
  if (input.mode === 'advanced') {
    return calculateKatch(input);
  }
  return calculateMifflin(input);
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    height?: string;
    weight?: string;
    age?: string;
    bodyFat?: string;
  };
}

export function validateBMRInputBasic(input: Partial<BMRInputBasic>): ValidationResult {
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
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBMRInputAdvanced(input: Partial<BMRInputAdvanced>): ValidationResult {
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
