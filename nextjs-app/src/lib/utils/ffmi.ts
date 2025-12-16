export interface FFMIInput {
  heightCm: number;
  weightKg: number;
  bodyFatPercent: number;
}

export type FFMICategory = 
  | 'below_average'  // < 18
  | 'average'        // 18-20
  | 'above_average'  // 20-22
  | 'excellent'      // 22-25
  | 'elite';         // > 25

export interface FFMIOutput {
  ffm: number;           // Fat-Free Mass (kg)
  ffmi: number;          // Raw FFMI
  adjustedFfmi: number;  // Height-adjusted FFMI
  category: FFMICategory;
  interpretation: string;
}

const categoryInterpretations: Record<FFMICategory, string> = {
  below_average: '低于平均水平，建议增加力量训练',
  average: '处于平均水平，继续保持训练',
  above_average: '高于平均水平，训练效果不错',
  excellent: '优秀水平，肌肉发达程度很高',
  elite: '精英水平，接近自然极限或可能使用了增强剂',
};

function getCategory(adjustedFfmi: number): FFMICategory {
  if (adjustedFfmi < 18) return 'below_average';
  if (adjustedFfmi < 20) return 'average';
  if (adjustedFfmi < 22) return 'above_average';
  if (adjustedFfmi < 25) return 'excellent';
  return 'elite';
}

export function calculateFFMI(input: FFMIInput): FFMIOutput {
  const heightM = input.heightCm / 100;
  const ffm = input.weightKg * (1 - input.bodyFatPercent / 100);
  const ffmi = ffm / (heightM * heightM);
  const adjustedFfmi = ffmi + 6.1 * (1.8 - heightM);
  const category = getCategory(adjustedFfmi);
  
  return {
    ffm: Math.round(ffm * 10) / 10,
    ffmi: Math.round(ffmi * 10) / 10,
    adjustedFfmi: Math.round(adjustedFfmi * 10) / 10,
    category,
    interpretation: categoryInterpretations[category],
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    height?: string;
    weight?: string;
    bodyFat?: string;
  };
}

export function validateFFMIInput(input: Partial<FFMIInput>): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  
  if (input.heightCm === undefined || input.heightCm < 100 || input.heightCm > 250) {
    errors.height = '请输入有效身高 (100-250 cm)';
  }
  
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
