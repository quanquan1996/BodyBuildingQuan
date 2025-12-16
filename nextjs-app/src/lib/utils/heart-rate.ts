export interface HeartRateInput {
  age: number;
  restingHR?: number; // 静息心率，用于 Karvonen 公式
}

export interface HeartRateZone {
  zone: number;
  name: string;
  description: string;
  minPercent: number;
  maxPercent: number;
  minHR: number;
  maxHR: number;
  color: string;
}

export interface HeartRateOutput {
  maxHR: number;
  restingHR?: number;
  heartRateReserve?: number;
  zones: HeartRateZone[];
  formula: 'standard' | 'karvonen';
}

const zoneDefinitions = [
  {
    zone: 1,
    name: '热身区',
    description: '轻松活动，恢复训练',
    minPercent: 50,
    maxPercent: 60,
    color: 'bg-gray-400',
  },
  {
    zone: 2,
    name: '燃脂区',
    description: '最佳脂肪燃烧，长时间有氧',
    minPercent: 60,
    maxPercent: 70,
    color: 'bg-blue-400',
  },
  {
    zone: 3,
    name: '有氧区',
    description: '提升心肺耐力，中等强度',
    minPercent: 70,
    maxPercent: 80,
    color: 'bg-green-500',
  },
  {
    zone: 4,
    name: '无氧区',
    description: '提升速度耐力，高强度间歇',
    minPercent: 80,
    maxPercent: 90,
    color: 'bg-orange-500',
  },
  {
    zone: 5,
    name: '极限区',
    description: '最大输出，短时间冲刺',
    minPercent: 90,
    maxPercent: 100,
    color: 'bg-red-500',
  },
];

/**
 * 计算最大心率 (220 - 年龄)
 */
function calculateMaxHR(age: number): number {
  return 220 - age;
}

/**
 * 标准公式：基于最大心率百分比
 */
function calculateStandardZones(maxHR: number): HeartRateZone[] {
  return zoneDefinitions.map((zone) => ({
    ...zone,
    minHR: Math.round(maxHR * (zone.minPercent / 100)),
    maxHR: Math.round(maxHR * (zone.maxPercent / 100)),
  }));
}

/**
 * Karvonen 公式：基于心率储备
 * 目标心率 = 静息心率 + (心率储备 × 强度百分比)
 */
function calculateKarvonenZones(maxHR: number, restingHR: number): HeartRateZone[] {
  const hrReserve = maxHR - restingHR;
  return zoneDefinitions.map((zone) => ({
    ...zone,
    minHR: Math.round(restingHR + hrReserve * (zone.minPercent / 100)),
    maxHR: Math.round(restingHR + hrReserve * (zone.maxPercent / 100)),
  }));
}

export function calculateHeartRateZones(input: HeartRateInput): HeartRateOutput {
  const maxHR = calculateMaxHR(input.age);

  if (input.restingHR && input.restingHR > 0) {
    const hrReserve = maxHR - input.restingHR;
    return {
      maxHR,
      restingHR: input.restingHR,
      heartRateReserve: hrReserve,
      zones: calculateKarvonenZones(maxHR, input.restingHR),
      formula: 'karvonen',
    };
  }

  return {
    maxHR,
    zones: calculateStandardZones(maxHR),
    formula: 'standard',
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    age?: string;
    restingHR?: string;
  };
}

export function validateHeartRateInput(input: Partial<HeartRateInput>): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (input.age === undefined || input.age < 10 || input.age > 100) {
    errors.age = '请输入有效年龄 (10-100 岁)';
  }

  if (input.restingHR !== undefined && (input.restingHR < 30 || input.restingHR > 120)) {
    errors.restingHR = '请输入有效静息心率 (30-120 bpm)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
