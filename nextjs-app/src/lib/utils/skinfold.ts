// 体脂夹计算器工具函数

export type Gender = 'male' | 'female';
export type MeasurementMode = 'simple' | 'precise';

// 简易模式（3点测量）输入
export interface SimpleSkinfoldInput {
  gender: Gender;
  age: number;
  // 男性: 胸部、腹部、大腿
  // 女性: 三头肌、髂骨上、大腿
  site1: number; // mm
  site2: number;
  site3: number;
}

// 精确模式（7点测量）输入
export interface PreciseSkinfoldInput {
  gender: Gender;
  age: number;
  chest: number;      // 胸部
  midaxillary: number; // 腋中线
  triceps: number;    // 三头肌
  subscapular: number; // 肩胛下
  abdominal: number;  // 腹部
  suprailiac: number; // 髂骨上
  thigh: number;      // 大腿
}

export interface SkinfoldOutput {
  bodyFatPercent: number;
  bodyDensity: number;
  fatMass: number;      // 脂肪重量 (kg)
  leanMass: number;     // 瘦体重 (kg)
  category: BodyFatCategory;
  interpretation: string;
}

export type BodyFatCategory = 
  | 'essential'    // 必需脂肪
  | 'athlete'      // 运动员
  | 'fitness'      // 健身
  | 'average'      // 平均
  | 'obese';       // 肥胖

// 男性体脂分类标准
const maleCategories: { max: number; category: BodyFatCategory; label: string }[] = [
  { max: 6, category: 'essential', label: '必需脂肪（可能过低）' },
  { max: 13, category: 'athlete', label: '运动员水平' },
  { max: 17, category: 'fitness', label: '健身水平' },
  { max: 24, category: 'average', label: '平均水平' },
  { max: 100, category: 'obese', label: '超重/肥胖' },
];

// 女性体脂分类标准
const femaleCategories: { max: number; category: BodyFatCategory; label: string }[] = [
  { max: 14, category: 'essential', label: '必需脂肪（可能过低）' },
  { max: 20, category: 'athlete', label: '运动员水平' },
  { max: 24, category: 'fitness', label: '健身水平' },
  { max: 31, category: 'average', label: '平均水平' },
  { max: 100, category: 'obese', label: '超重/肥胖' },
];

function getBodyFatCategory(bodyFatPercent: number, gender: Gender): { category: BodyFatCategory; label: string } {
  const categories = gender === 'male' ? maleCategories : femaleCategories;
  for (const cat of categories) {
    if (bodyFatPercent <= cat.max) {
      return { category: cat.category, label: cat.label };
    }
  }
  return { category: 'obese', label: '超重/肥胖' };
}

// Jackson-Pollock 3点公式计算体密度
function calculateBodyDensity3Site(input: SimpleSkinfoldInput): number {
  const sumOfSkinfolds = input.site1 + input.site2 + input.site3;
  const age = input.age;
  
  if (input.gender === 'male') {
    // 男性公式 (胸部、腹部、大腿)
    return 1.10938 - (0.0008267 * sumOfSkinfolds) + (0.0000016 * sumOfSkinfolds * sumOfSkinfolds) - (0.0002574 * age);
  } else {
    // 女性公式 (三头肌、髂骨上、大腿)
    return 1.0994921 - (0.0009929 * sumOfSkinfolds) + (0.0000023 * sumOfSkinfolds * sumOfSkinfolds) - (0.0001392 * age);
  }
}

// Jackson-Pollock 7点公式计算体密度
function calculateBodyDensity7Site(input: PreciseSkinfoldInput): number {
  const sumOfSkinfolds = input.chest + input.midaxillary + input.triceps + 
                         input.subscapular + input.abdominal + input.suprailiac + input.thigh;
  const age = input.age;
  
  if (input.gender === 'male') {
    return 1.112 - (0.00043499 * sumOfSkinfolds) + (0.00000055 * sumOfSkinfolds * sumOfSkinfolds) - (0.00028826 * age);
  } else {
    return 1.097 - (0.00046971 * sumOfSkinfolds) + (0.00000056 * sumOfSkinfolds * sumOfSkinfolds) - (0.00012828 * age);
  }
}

// Siri 公式：从体密度计算体脂率
function bodyDensityToBodyFat(density: number): number {
  return (495 / density) - 450;
}

// 简易模式计算
export function calculateSimpleSkinfold(input: SimpleSkinfoldInput, weightKg: number): SkinfoldOutput {
  const bodyDensity = calculateBodyDensity3Site(input);
  const bodyFatPercent = bodyDensityToBodyFat(bodyDensity);
  const clampedBF = Math.max(3, Math.min(60, bodyFatPercent));
  
  const fatMass = weightKg * (clampedBF / 100);
  const leanMass = weightKg - fatMass;
  
  const { category, label } = getBodyFatCategory(clampedBF, input.gender);
  
  return {
    bodyFatPercent: Math.round(clampedBF * 10) / 10,
    bodyDensity: Math.round(bodyDensity * 10000) / 10000,
    fatMass: Math.round(fatMass * 10) / 10,
    leanMass: Math.round(leanMass * 10) / 10,
    category,
    interpretation: label,
  };
}

// 精确模式计算
export function calculatePreciseSkinfold(input: PreciseSkinfoldInput, weightKg: number): SkinfoldOutput {
  const bodyDensity = calculateBodyDensity7Site(input);
  const bodyFatPercent = bodyDensityToBodyFat(bodyDensity);
  const clampedBF = Math.max(3, Math.min(60, bodyFatPercent));
  
  const fatMass = weightKg * (clampedBF / 100);
  const leanMass = weightKg - fatMass;
  
  const { category, label } = getBodyFatCategory(clampedBF, input.gender);
  
  return {
    bodyFatPercent: Math.round(clampedBF * 10) / 10,
    bodyDensity: Math.round(bodyDensity * 10000) / 10000,
    fatMass: Math.round(fatMass * 10) / 10,
    leanMass: Math.round(leanMass * 10) / 10,
    category,
    interpretation: label,
  };
}

// 测量部位说明
export const measurementSites = {
  chest: {
    name: '胸部',
    emoji: '🫁',
    description: '在胸大肌与腋窝前缘连线的中点处，斜向捏起皮褶',
    tips: '男性常用测量点，皮褶方向与胸大肌纤维平行',
  },
  midaxillary: {
    name: '腋中线',
    emoji: '📍',
    description: '在腋窝中线与剑突水平线的交点处，垂直捏起皮褶',
    tips: '手臂自然下垂，在腋窝正下方测量',
  },
  triceps: {
    name: '三头肌',
    emoji: '💪',
    description: '在上臂后侧，肩峰与尺骨鹰嘴连线的中点处，垂直捏起皮褶',
    tips: '手臂自然下垂放松，测量上臂后侧中点',
  },
  subscapular: {
    name: '肩胛下',
    emoji: '🔙',
    description: '在肩胛骨下角下方约2cm处，斜向45度捏起皮褶',
    tips: '皮褶方向与肩胛骨下缘平行，约45度角',
  },
  abdominal: {
    name: '腹部',
    emoji: '🎯',
    description: '在肚脐旁约2-3cm处，垂直捏起皮褶',
    tips: '测量时保持腹部放松，不要收腹',
  },
  suprailiac: {
    name: '髂骨上',
    emoji: '📐',
    description: '在髂嵴上方，腋前线位置，斜向捏起皮褶',
    tips: '沿着髂嵴自然走向，约45度角捏起',
  },
  thigh: {
    name: '大腿',
    emoji: '🦵',
    description: '在大腿前侧，髌骨与腹股沟连线的中点处，垂直捏起皮褶',
    tips: '坐姿或站立，大腿放松，测量股四头肌中点',
  },
};

// 验证输入
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateSkinfoldInput(
  values: Record<string, number | undefined>,
  requiredFields: string[]
): ValidationResult {
  const errors: Record<string, string> = {};
  
  for (const field of requiredFields) {
    const value = values[field];
    if (value === undefined || isNaN(value)) {
      errors[field] = '请输入有效数值';
    } else if (field === 'age') {
      if (value < 18 || value > 80) {
        errors[field] = '年龄范围: 18-80岁';
      }
    } else if (field === 'weight') {
      if (value < 30 || value > 300) {
        errors[field] = '体重范围: 30-300 kg';
      }
    } else {
      // 皮褶厚度验证
      if (value < 1 || value > 80) {
        errors[field] = '皮褶厚度范围: 1-80 mm';
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
