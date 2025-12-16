// 希腊雕塑比例（Grecian Ideal）计算器
// 基于黄金分割率 1.618 和古典健美比例标准

export const GOLDEN_RATIO = 1.618;

export interface GrecianIdealInput {
  heightCm: number;
  wristCm: number;        // 手腕围度
  chestCm: number;        // 胸围
  waistCm: number;        // 腰围
  hipCm: number;          // 臀围
  shoulderCm: number;     // 肩围
  neckCm: number;         // 颈围
  bicepCm: number;        // 上臂围（屈臂）
  forearmCm: number;      // 前臂围
  thighCm: number;        // 大腿围
  calfCm: number;         // 小腿围
}

export interface IdealMeasurement {
  current: number;
  ideal: number;
  difference: number;     // 正数表示需要增加，负数表示需要减少
  percentageOff: number;  // 偏离理想值的百分比
  status: 'perfect' | 'close' | 'needs_work';
}

export interface GrecianIdealOutput {
  overallScore: number;   // 0-100 总体比例得分
  category: GrecianCategory;
  measurements: {
    chest: IdealMeasurement;
    waist: IdealMeasurement;
    hip: IdealMeasurement;
    shoulder: IdealMeasurement;
    neck: IdealMeasurement;
    bicep: IdealMeasurement;
    forearm: IdealMeasurement;
    thigh: IdealMeasurement;
    calf: IdealMeasurement;
  };
  keyRatios: {
    shoulderToWaist: { current: number; ideal: number; score: number };
    chestToWaist: { current: number; ideal: number; score: number };
    armToNeck: { current: number; ideal: number; score: number };
    calfToNeck: { current: number; ideal: number; score: number };
  };
  recommendations: string[];
}

export type GrecianCategory = 
  | 'legendary'    // 95-100
  | 'excellent'    // 85-94
  | 'good'         // 70-84
  | 'average'      // 50-69
  | 'developing';  // < 50

const categoryLabels: Record<GrecianCategory, string> = {
  legendary: '传奇比例 - 接近古典雕塑标准',
  excellent: '优秀比例 - 非常接近黄金分割',
  good: '良好比例 - 有明显的对称美感',
  average: '一般比例 - 有提升空间',
  developing: '发展中 - 需要针对性训练',
};

// 基于手腕围度计算理想围度（Steve Reeves 公式变体）
function calculateIdealMeasurements(wristCm: number) {
  // 基于手腕围度的理想比例系数
  const wristFactor = wristCm;
  
  return {
    chest: wristFactor * 6.5,           // 胸围 = 手腕 × 6.5
    waist: wristFactor * 4.0,           // 腰围 = 手腕 × 4.0 (黄金比例: 胸围/腰围 ≈ 1.618)
    hip: wristFactor * 5.3,             // 臀围 = 手腕 × 5.3
    shoulder: wristFactor * 4.0 * GOLDEN_RATIO, // 肩围 = 腰围 × 1.618
    neck: wristFactor * 2.3,            // 颈围 = 手腕 × 2.3
    bicep: wristFactor * 2.3,           // 上臂围 = 颈围 (经典比例)
    forearm: wristFactor * 1.88,        // 前臂围 = 手腕 × 1.88
    thigh: wristFactor * 3.5,           // 大腿围 = 手腕 × 3.5
    calf: wristFactor * 2.3,            // 小腿围 = 颈围 (经典比例)
  };
}

function getMeasurementStatus(percentageOff: number): IdealMeasurement['status'] {
  const absOff = Math.abs(percentageOff);
  if (absOff <= 3) return 'perfect';
  if (absOff <= 10) return 'close';
  return 'needs_work';
}

function calculateMeasurement(current: number, ideal: number): IdealMeasurement {
  const difference = ideal - current;
  const percentageOff = ((current - ideal) / ideal) * 100;
  
  return {
    current: Math.round(current * 10) / 10,
    ideal: Math.round(ideal * 10) / 10,
    difference: Math.round(difference * 10) / 10,
    percentageOff: Math.round(percentageOff * 10) / 10,
    status: getMeasurementStatus(percentageOff),
  };
}

function calculateRatioScore(current: number, ideal: number): number {
  const deviation = Math.abs(current - ideal) / ideal;
  return Math.max(0, 100 - deviation * 100);
}

function getCategory(score: number): GrecianCategory {
  if (score >= 95) return 'legendary';
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'average';
  return 'developing';
}

function generateRecommendations(measurements: GrecianIdealOutput['measurements']): string[] {
  const recommendations: string[] = [];
  
  // 检查各部位并生成建议
  if (measurements.shoulder.difference > 2) {
    recommendations.push(`肩围需要增加约 ${measurements.shoulder.difference.toFixed(1)} cm，建议加强侧平举和推举训练`);
  }
  
  if (measurements.waist.difference < -2) {
    recommendations.push(`腰围需要减少约 ${Math.abs(measurements.waist.difference).toFixed(1)} cm，建议控制饮食并增加有氧运动`);
  }
  
  if (measurements.chest.difference > 2) {
    recommendations.push(`胸围需要增加约 ${measurements.chest.difference.toFixed(1)} cm，建议加强卧推和飞鸟训练`);
  }
  
  if (measurements.bicep.difference > 1) {
    recommendations.push(`上臂围需要增加约 ${measurements.bicep.difference.toFixed(1)} cm，建议加强弯举训练`);
  }
  
  if (measurements.thigh.difference > 2) {
    recommendations.push(`大腿围需要增加约 ${measurements.thigh.difference.toFixed(1)} cm，建议加强深蹲和腿举训练`);
  }
  
  if (measurements.calf.difference > 1) {
    recommendations.push(`小腿围需要增加约 ${measurements.calf.difference.toFixed(1)} cm，建议加强提踵训练`);
  }
  
  if (recommendations.length === 0) {
    recommendations.push('你的身材比例非常接近古典理想标准，继续保持！');
  }
  
  return recommendations.slice(0, 5); // 最多返回5条建议
}

export function calculateGrecianIdeal(input: GrecianIdealInput): GrecianIdealOutput {
  const ideals = calculateIdealMeasurements(input.wristCm);
  
  const measurements = {
    chest: calculateMeasurement(input.chestCm, ideals.chest),
    waist: calculateMeasurement(input.waistCm, ideals.waist),
    hip: calculateMeasurement(input.hipCm, ideals.hip),
    shoulder: calculateMeasurement(input.shoulderCm, ideals.shoulder),
    neck: calculateMeasurement(input.neckCm, ideals.neck),
    bicep: calculateMeasurement(input.bicepCm, ideals.bicep),
    forearm: calculateMeasurement(input.forearmCm, ideals.forearm),
    thigh: calculateMeasurement(input.thighCm, ideals.thigh),
    calf: calculateMeasurement(input.calfCm, ideals.calf),
  };
  
  // 计算关键比例
  const shoulderToWaistCurrent = input.shoulderCm / input.waistCm;
  const chestToWaistCurrent = input.chestCm / input.waistCm;
  const armToNeckCurrent = input.bicepCm / input.neckCm;
  const calfToNeckCurrent = input.calfCm / input.neckCm;
  
  const keyRatios = {
    shoulderToWaist: {
      current: Math.round(shoulderToWaistCurrent * 100) / 100,
      ideal: GOLDEN_RATIO,
      score: calculateRatioScore(shoulderToWaistCurrent, GOLDEN_RATIO),
    },
    chestToWaist: {
      current: Math.round(chestToWaistCurrent * 100) / 100,
      ideal: GOLDEN_RATIO,
      score: calculateRatioScore(chestToWaistCurrent, GOLDEN_RATIO),
    },
    armToNeck: {
      current: Math.round(armToNeckCurrent * 100) / 100,
      ideal: 1.0,
      score: calculateRatioScore(armToNeckCurrent, 1.0),
    },
    calfToNeck: {
      current: Math.round(calfToNeckCurrent * 100) / 100,
      ideal: 1.0,
      score: calculateRatioScore(calfToNeckCurrent, 1.0),
    },
  };
  
  // 计算总体得分（加权平均）
  const measurementScores = Object.values(measurements).map(m => 
    Math.max(0, 100 - Math.abs(m.percentageOff) * 2)
  );
  const ratioScores = Object.values(keyRatios).map(r => r.score);
  
  const allScores = [...measurementScores, ...ratioScores];
  const overallScore = Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length);
  
  return {
    overallScore,
    category: getCategory(overallScore),
    measurements,
    keyRatios,
    recommendations: generateRecommendations(measurements),
  };
}

export function getCategoryLabel(category: GrecianCategory): string {
  return categoryLabels[category];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof GrecianIdealInput, string>>;
}

export function validateGrecianInput(input: Partial<GrecianIdealInput>): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  
  if (!input.heightCm || input.heightCm < 100 || input.heightCm > 250) {
    errors.heightCm = '请输入有效身高 (100-250 cm)';
  }
  if (!input.wristCm || input.wristCm < 10 || input.wristCm > 30) {
    errors.wristCm = '请输入有效手腕围度 (10-30 cm)';
  }
  if (!input.chestCm || input.chestCm < 50 || input.chestCm > 200) {
    errors.chestCm = '请输入有效胸围 (50-200 cm)';
  }
  if (!input.waistCm || input.waistCm < 40 || input.waistCm > 150) {
    errors.waistCm = '请输入有效腰围 (40-150 cm)';
  }
  if (!input.hipCm || input.hipCm < 50 || input.hipCm > 180) {
    errors.hipCm = '请输入有效臀围 (50-180 cm)';
  }
  if (!input.shoulderCm || input.shoulderCm < 80 || input.shoulderCm > 180) {
    errors.shoulderCm = '请输入有效肩围 (80-180 cm)';
  }
  if (!input.neckCm || input.neckCm < 25 || input.neckCm > 60) {
    errors.neckCm = '请输入有效颈围 (25-60 cm)';
  }
  if (!input.bicepCm || input.bicepCm < 20 || input.bicepCm > 60) {
    errors.bicepCm = '请输入有效上臂围 (20-60 cm)';
  }
  if (!input.forearmCm || input.forearmCm < 15 || input.forearmCm > 50) {
    errors.forearmCm = '请输入有效前臂围 (15-50 cm)';
  }
  if (!input.thighCm || input.thighCm < 30 || input.thighCm > 100) {
    errors.thighCm = '请输入有效大腿围 (30-100 cm)';
  }
  if (!input.calfCm || input.calfCm < 20 || input.calfCm > 60) {
    errors.calfCm = '请输入有效小腿围 (20-60 cm)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
