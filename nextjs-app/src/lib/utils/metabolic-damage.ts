/**
 * 代谢受损检测工具
 * 评估用户是否因长期节食导致代谢适应
 */

export type WeightTrend = 'losing' | 'stable' | 'gaining';
export type DietDuration = 'short' | 'medium' | 'long' | 'very_long';
export type DamageLevel = 'normal' | 'mild' | 'moderate' | 'severe';

export interface MetabolicDamageInput {
  // 基础信息
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female';
  // 当前饮食状况
  currentCalories: number;  // 当前每日摄入热量
  // 体重变化
  weightTrend: WeightTrend;
  // 节食时长
  dietDuration: DietDuration;
  // 可选：体脂率（更精准）
  bodyFatPercent?: number;
}

export interface MetabolicDamageOutput {
  // 理论值
  theoreticalBmr: number;      // 理论基础代谢
  theoreticalTdee: number;     // 理论每日消耗
  // 评估结果
  estimatedActualTdee: number; // 估算实际代谢
  metabolicGap: number;        // 代谢差距（理论-实际）
  metabolicGapPercent: number; // 代谢差距百分比
  // 受损等级
  damageLevel: DamageLevel;
  damageScore: number;         // 0-100 分数
  // 恢复建议
  recoveryWeeks: number;       // 建议恢复周数
  targetCalories: number;      // 目标恢复热量
  weeklyIncrease: number;      // 每周增加热量
  // 使用的公式
  formula: 'mifflin' | 'katch';
  leanMass?: number;
}

// 节食时长映射
export const dietDurationLabels: Record<DietDuration, { label: string; weeks: string }> = {
  short: { label: '短期', weeks: '少于4周' },
  medium: { label: '中期', weeks: '4-12周' },
  long: { label: '长期', weeks: '12-24周' },
  very_long: { label: '超长期', weeks: '超过24周' },
};

// 体重趋势映射
export const weightTrendLabels: Record<WeightTrend, { label: string; description: string }> = {
  losing: { label: '持续下降', description: '过去4周体重稳定下降' },
  stable: { label: '停滞不动', description: '过去4周体重几乎不变' },
  gaining: { label: '反弹上涨', description: '过去4周体重反而增加' },
};

// 受损等级描述
export const damageLevelInfo: Record<DamageLevel, { 
  label: string; 
  color: string; 
  description: string;
  emoji: string;
}> = {
  normal: { 
    label: '代谢正常', 
    color: 'green',
    description: '你的代谢功能正常，热量摄入与体重变化符合预期',
    emoji: '✅',
  },
  mild: { 
    label: '轻度适应', 
    color: 'yellow',
    description: '存在轻微代谢适应，建议适当增加热量或安排饮食休息日',
    emoji: '⚠️',
  },
  moderate: { 
    label: '中度受损', 
    color: 'orange',
    description: '代谢明显下降，建议进行反向节食，逐步恢复热量摄入',
    emoji: '🔶',
  },
  severe: { 
    label: '严重受损', 
    color: 'red',
    description: '代谢严重受损，强烈建议停止节食，进行系统性代谢恢复',
    emoji: '🔴',
  },
};

/**
 * 使用 Mifflin-St Jeor 公式计算 BMR
 */
function calculateMifflinBmr(
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
 * 使用 Katch-McArdle 公式计算 BMR（基于瘦体重）
 */
function calculateKatchBmr(weightKg: number, bodyFatPercent: number): number {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  return 370 + 21.6 * leanMass;
}

/**
 * 计算代谢受损程度
 */
export function calculateMetabolicDamage(input: MetabolicDamageInput): MetabolicDamageOutput {
  const { heightCm, weightKg, age, gender, currentCalories, weightTrend, dietDuration, bodyFatPercent } = input;
  
  // 计算理论 BMR
  let theoreticalBmr: number;
  let formula: 'mifflin' | 'katch';
  let leanMass: number | undefined;
  
  if (bodyFatPercent !== undefined) {
    theoreticalBmr = calculateKatchBmr(weightKg, bodyFatPercent);
    formula = 'katch';
    leanMass = Math.round(weightKg * (1 - bodyFatPercent / 100) * 10) / 10;
  } else {
    theoreticalBmr = calculateMifflinBmr(heightCm, weightKg, age, gender);
    formula = 'mifflin';
  }
  
  // 假设轻度活动水平计算 TDEE（1.375 系数）
  const theoreticalTdee = theoreticalBmr * 1.375;
  
  // 根据体重趋势和摄入热量估算实际代谢
  let estimatedActualTdee: number;
  
  if (weightTrend === 'losing') {
    // 体重下降：实际代谢 = 摄入 + 缺口（假设每周减0.5kg = 每天缺口550卡）
    estimatedActualTdee = currentCalories + 400;
  } else if (weightTrend === 'stable') {
    // 体重稳定：实际代谢 ≈ 摄入
    estimatedActualTdee = currentCalories;
  } else {
    // 体重上涨：实际代谢 < 摄入（假设每周涨0.3kg = 每天盈余330卡）
    estimatedActualTdee = currentCalories - 250;
  }
  
  // 计算代谢差距
  const metabolicGap = theoreticalTdee - estimatedActualTdee;
  const metabolicGapPercent = Math.round((metabolicGap / theoreticalTdee) * 100);
  
  // 计算受损分数（0-100）
  let damageScore = 0;
  
  // 因素1：摄入低于 BMR 的程度（最高40分）
  if (currentCalories < theoreticalBmr) {
    const bmrDeficit = (theoreticalBmr - currentCalories) / theoreticalBmr;
    damageScore += Math.min(40, bmrDeficit * 100);
  }
  
  // 因素2：体重趋势（最高30分）
  if (weightTrend === 'stable' && currentCalories < theoreticalTdee - 300) {
    damageScore += 20; // 低热量但体重不降
  } else if (weightTrend === 'gaining' && currentCalories < theoreticalTdee) {
    damageScore += 30; // 低热量反而涨体重
  }
  
  // 因素3：节食时长（最高30分）
  const durationScores: Record<DietDuration, number> = {
    short: 5,
    medium: 15,
    long: 25,
    very_long: 30,
  };
  damageScore += durationScores[dietDuration];
  
  // 确定受损等级
  let damageLevel: DamageLevel;
  if (damageScore < 25) {
    damageLevel = 'normal';
  } else if (damageScore < 50) {
    damageLevel = 'mild';
  } else if (damageScore < 75) {
    damageLevel = 'moderate';
  } else {
    damageLevel = 'severe';
  }
  
  // 计算恢复建议
  const recoveryWeeks = Math.max(4, Math.ceil(damageScore / 10) * 2);
  const targetCalories = Math.round(theoreticalTdee);
  const weeklyIncrease = Math.round((targetCalories - currentCalories) / recoveryWeeks / 7) * 7;
  
  return {
    theoreticalBmr: Math.round(theoreticalBmr),
    theoreticalTdee: Math.round(theoreticalTdee),
    estimatedActualTdee: Math.round(estimatedActualTdee),
    metabolicGap: Math.round(metabolicGap),
    metabolicGapPercent,
    damageLevel,
    damageScore: Math.round(damageScore),
    recoveryWeeks,
    targetCalories,
    weeklyIncrease: Math.max(50, weeklyIncrease),
    formula,
    leanMass,
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    height?: string;
    weight?: string;
    age?: string;
    calories?: string;
    bodyFat?: string;
  };
}

export function validateMetabolicDamageInput(input: Partial<MetabolicDamageInput>): ValidationResult {
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
  
  if (input.currentCalories === undefined || input.currentCalories < 500 || input.currentCalories > 10000) {
    errors.calories = '请输入有效热量 (500-10000 千卡)';
  }
  
  if (input.bodyFatPercent !== undefined && (input.bodyFatPercent < 3 || input.bodyFatPercent > 60)) {
    errors.bodyFat = '请输入有效体脂率 (3-60%)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
