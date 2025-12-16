import { type ActivityLevel } from './bmr';

export type RefeedFrequency = 'weekly' | 'biweekly' | 'none';
export type DeficitLevel = 'conservative' | 'standard' | 'aggressive';

export interface HighCarbDietInput {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: 'male' | 'female';
  bodyFatPercent?: number;
  activityLevel: ActivityLevel;
  deficitLevel: DeficitLevel;
  trainingDaysPerWeek: number;
  refeedFrequency: RefeedFrequency;
}

export interface DayPlan {
  dayType: 'training' | 'rest' | 'refeed';
  label: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  description: string;
}

export interface WeekSchedule {
  days: { day: string; type: 'training' | 'rest' | 'refeed' }[];
  trainingDays: number;
  restDays: number;
  refeedDays: number;
}

export interface HighCarbDietOutput {
  bmr: number;
  tdee: number;
  leanMass?: number;
  targetCalories: number;
  dayPlans: DayPlan[];
  weeklyAverage: number;
  weeklyDeficit: number;
  estimatedWeeklyLoss: number;
  weekSchedule: WeekSchedule;
}

// 活动系数
const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};


// 热量缺口
const deficitValues: Record<DeficitLevel, number> = {
  conservative: 300,
  standard: 500,
  aggressive: 700,
};

// 脂肪最低值 (g)
const minFatByGender = {
  male: 30,
  female: 35,
};

// 日期类型标签
const dayLabels = {
  training: '训练日',
  rest: '休息日',
  refeed: '再喂日',
};

// 日期类型描述
const dayDescriptions = {
  training: '高碳低脂，为训练提供充足能量',
  rest: '中碳低脂，减少碳水适应休息',
  refeed: '高碳中脂，恢复激素水平',
};

/**
 * Mifflin-St Jeor 公式计算 BMR
 */
function calculateMifflinBMR(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  }
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

/**
 * Katch-McArdle 公式计算 BMR（需要体脂率）
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
 * 计算训练日方案（高碳低脂）
 */
function calculateTrainingDay(
  targetCalories: number,
  weightKg: number,
  gender: 'male' | 'female'
): DayPlan {
  // 蛋白质: 2.2g/kg
  const protein = Math.round(weightKg * 2.2);
  const proteinCalories = protein * 4;

  // 脂肪: 0.5g/kg，但不低于最低值
  let fat = Math.round(weightKg * 0.5);
  const minFat = minFatByGender[gender];
  if (fat < minFat) fat = minFat;
  const fatCalories = fat * 9;

  // 碳水: 剩余热量
  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);

  const actualCalories = proteinCalories + carbCalories + fatCalories;

  return {
    dayType: 'training',
    label: dayLabels.training,
    calories: actualCalories,
    protein,
    carbs,
    fat,
    proteinPercent: Math.round((proteinCalories / actualCalories) * 100),
    carbsPercent: Math.round((carbCalories / actualCalories) * 100),
    fatPercent: Math.round((fatCalories / actualCalories) * 100),
    description: dayDescriptions.training,
  };
}


/**
 * 计算休息日方案（中碳低脂）
 */
function calculateRestDay(
  trainingDayPlan: DayPlan,
  weightKg: number,
  gender: 'male' | 'female'
): DayPlan {
  // 蛋白质保持不变
  const protein = trainingDayPlan.protein;
  const proteinCalories = protein * 4;

  // 脂肪略微提高: 0.6g/kg，但不低于最低值
  let fat = Math.round(weightKg * 0.6);
  const minFat = minFatByGender[gender] + 5; // 休息日脂肪下限+5g
  if (fat < minFat) fat = minFat;
  const fatCalories = fat * 9;

  // 碳水减少30%
  const carbs = Math.round(trainingDayPlan.carbs * 0.7);
  const carbCalories = carbs * 4;

  const actualCalories = proteinCalories + carbCalories + fatCalories;

  return {
    dayType: 'rest',
    label: dayLabels.rest,
    calories: actualCalories,
    protein,
    carbs,
    fat,
    proteinPercent: Math.round((proteinCalories / actualCalories) * 100),
    carbsPercent: Math.round((carbCalories / actualCalories) * 100),
    fatPercent: Math.round((fatCalories / actualCalories) * 100),
    description: dayDescriptions.rest,
  };
}

/**
 * 计算再喂日方案（高碳中脂）
 */
function calculateRefeedDay(
  tdee: number,
  trainingDayPlan: DayPlan,
  weightKg: number
): DayPlan {
  // 再喂日热量 = TDEE（维持热量）
  const targetCalories = tdee;

  // 蛋白质略降: 2.0g/kg
  const protein = Math.round(weightKg * 2.0);
  const proteinCalories = protein * 4;

  // 脂肪提升至正常: 1.0g/kg
  const fat = Math.round(weightKg * 1.0);
  const fatCalories = fat * 9;

  // 碳水增加20%
  const carbs = Math.round(trainingDayPlan.carbs * 1.2);
  const carbCalories = carbs * 4;

  const actualCalories = proteinCalories + carbCalories + fatCalories;

  return {
    dayType: 'refeed',
    label: dayLabels.refeed,
    calories: actualCalories,
    protein,
    carbs,
    fat,
    proteinPercent: Math.round((proteinCalories / actualCalories) * 100),
    carbsPercent: Math.round((carbCalories / actualCalories) * 100),
    fatPercent: Math.round((fatCalories / actualCalories) * 100),
    description: dayDescriptions.refeed,
  };
}

/**
 * 生成周计划
 */
function generateWeekSchedule(
  trainingDaysPerWeek: number,
  refeedFrequency: RefeedFrequency
): WeekSchedule {
  const days: { day: string; type: 'training' | 'rest' | 'refeed' }[] = [];
  const dayNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 默认训练日安排（根据训练天数）
  const trainingPatterns: Record<number, number[]> = {
    3: [0, 2, 4],           // 周一三五
    4: [0, 1, 3, 4],        // 周一二四五
    5: [0, 1, 2, 3, 4],     // 周一到周五
    6: [0, 1, 2, 3, 4, 5],  // 周一到周六
  };

  const trainingDayIndices = trainingPatterns[trainingDaysPerWeek] || trainingPatterns[4];
  
  // 再喂日安排在周六
  const refeedDayIndex = refeedFrequency !== 'none' ? 5 : -1;

  for (let i = 0; i < 7; i++) {
    let type: 'training' | 'rest' | 'refeed' = 'rest';
    
    if (i === refeedDayIndex && refeedFrequency !== 'none') {
      type = 'refeed';
    } else if (trainingDayIndices.includes(i)) {
      type = 'training';
    }
    
    days.push({ day: dayNames[i], type });
  }

  const trainingCount = days.filter(d => d.type === 'training').length;
  const refeedCount = refeedFrequency === 'weekly' ? 1 : (refeedFrequency === 'biweekly' ? 0.5 : 0);
  const restCount = 7 - trainingCount - (refeedFrequency === 'weekly' ? 1 : 0);

  return {
    days,
    trainingDays: trainingCount,
    restDays: restCount,
    refeedDays: refeedFrequency === 'weekly' ? 1 : 0,
  };
}


/**
 * 计算高碳减脂方案
 */
export function calculateHighCarbDiet(input: HighCarbDietInput): HighCarbDietOutput {
  const {
    weightKg,
    heightCm,
    age,
    gender,
    bodyFatPercent,
    activityLevel,
    deficitLevel,
    trainingDaysPerWeek,
    refeedFrequency,
  } = input;

  // 计算 BMR
  let bmr: number;
  let leanMass: number | undefined;

  if (bodyFatPercent !== undefined && bodyFatPercent > 0) {
    const katchResult = calculateKatchBMR(weightKg, bodyFatPercent);
    bmr = katchResult.bmr;
    leanMass = katchResult.leanMass;
  } else {
    bmr = Math.round(calculateMifflinBMR(weightKg, heightCm, age, gender));
  }

  // 计算 TDEE
  const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

  // 计算目标热量（训练日）
  const deficit = deficitValues[deficitLevel];
  const targetCalories = tdee - deficit;

  // 计算各日期类型方案
  const trainingDayPlan = calculateTrainingDay(targetCalories, weightKg, gender);
  const restDayPlan = calculateRestDay(trainingDayPlan, weightKg, gender);
  const refeedDayPlan = calculateRefeedDay(tdee, trainingDayPlan, weightKg);

  const dayPlans: DayPlan[] = [trainingDayPlan, restDayPlan];
  if (refeedFrequency !== 'none') {
    dayPlans.push(refeedDayPlan);
  }

  // 生成周计划
  const weekSchedule = generateWeekSchedule(trainingDaysPerWeek, refeedFrequency);

  // 计算周平均热量
  let totalWeeklyCalories = 0;
  weekSchedule.days.forEach(({ type }) => {
    const plan = dayPlans.find(p => p.dayType === type);
    if (plan) {
      totalWeeklyCalories += plan.calories;
    }
  });

  // 如果是双周一次再喂，需要调整计算
  if (refeedFrequency === 'biweekly') {
    // 每两周一次再喂，平均每周0.5次
    const refeedCaloriesDiff = refeedDayPlan.calories - restDayPlan.calories;
    totalWeeklyCalories += refeedCaloriesDiff * 0.5;
  }

  const weeklyAverage = Math.round(totalWeeklyCalories / 7);
  const weeklyDeficit = (tdee - weeklyAverage) * 7;
  const estimatedWeeklyLoss = Math.round((weeklyDeficit / 7700) * 100) / 100; // 7700 kcal ≈ 1kg 脂肪

  return {
    bmr,
    tdee,
    leanMass,
    targetCalories,
    dayPlans,
    weeklyAverage,
    weeklyDeficit,
    estimatedWeeklyLoss,
    weekSchedule,
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    weight?: string;
    height?: string;
    age?: string;
    bodyFat?: string;
    trainingDays?: string;
  };
}

export function validateHighCarbDietInput(input: Partial<HighCarbDietInput>): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (input.weightKg === undefined || input.weightKg < 30 || input.weightKg > 300) {
    errors.weight = '请输入有效体重 (30-300 kg)';
  }

  if (input.heightCm === undefined || input.heightCm < 100 || input.heightCm > 250) {
    errors.height = '请输入有效身高 (100-250 cm)';
  }

  if (input.age === undefined || input.age < 14 || input.age > 100) {
    errors.age = '请输入有效年龄 (14-100 岁)';
  }

  if (input.bodyFatPercent !== undefined && (input.bodyFatPercent < 3 || input.bodyFatPercent > 60)) {
    errors.bodyFat = '请输入有效体脂率 (3-60%)';
  }

  if (input.trainingDaysPerWeek === undefined || input.trainingDaysPerWeek < 3 || input.trainingDaysPerWeek > 6) {
    errors.trainingDays = '请选择每周训练天数 (3-6 天)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
