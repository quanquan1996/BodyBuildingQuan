// FFMI 计算器 - 中文

export interface FFMIReferenceDict {
  title: string;
  headers: {
    range: string;
    maleRating: string;
    femaleRating: string;
  };
  rows: {
    range: string;
    rating: string;
    description: string;
  }[];
}

export interface FFMICalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    height: string;
    weight: string;
    bodyFat: string;
    bodyFatHint: string;
    gender: string;
    calculate: string;
  };
  result: {
    title: string;
    adjustedFfmi: string;
    ffmiRaw: string;
    leanMass: string;
    fatMass: string;
    muscleMass: string;
    bodyComposition: string;
    leanMassHelp: string;
    muscleHelp: string;
  };
  categories: {
    below_average: string;
    average: string;
    above_average: string;
    excellent: string;
    elite: string;
  };
  explanation: {
    title: string;
    whatIs: string;
    whatIsContent: string;
    advantages: string;
    advantagesList: string[];
    howToImprove: string;
    improvementList: string[];
    vsBmi: string;
    vsBmiContent: string;
    formula: string;
    formulaContent: string[];
  };
  reference: FFMIReferenceDict;
  validation: {
    heightRange: string;
    weightRange: string;
    bodyFatRange: string;
  };
}

export const ffmiCalculator: FFMICalculatorDict = {
  title: 'FFMI计算器',
  description: '计算你的无脂肪体重指数，评估肌肉发达程度',
  metaDescription: '免费FFMI计算器，输入身高、体重、体脂率，快速计算无脂肪体重指数，评估肌肉发达程度。',
  form: {
    basicInfo: '基本信息',
    height: '身高',
    weight: '体重',
    bodyFat: '体脂率',
    bodyFatHint: '不知道体脂率？用体脂夹测量',
    gender: '性别',
    calculate: '计算 FFMI 指数',
  },
  result: {
    title: '计算结果',
    adjustedFfmi: '校正后 FFMI',
    ffmiRaw: 'FFMI 原始值',
    leanMass: '瘦体重',
    fatMass: '脂肪质量',
    muscleMass: '估算肌肉量',
    bodyComposition: '身体成分',
    leanMassHelp: '去除脂肪后的体重，包括肌肉、骨骼、器官等',
    muscleHelp: '瘦体重的约85%为骨骼肌',
  },
  categories: {
    below_average: '低于平均',
    average: '平均水平',
    above_average: '高于平均',
    excellent: '优秀',
    elite: '精英级',
  },
  explanation: {
    title: 'FFMI 原理与意义',
    whatIs: '什么是 FFMI？',
    whatIsContent: 'FFMI（Fat-Free Mass Index，去脂体重指数）是一种用于评估肌肉发达程度的指标。与 BMI 不同，FFMI 排除了体脂的影响，更准确地反映了一个人的肌肉量水平。FFMI 特别适合用于评估健身者和运动员的肌肉发展情况。',
    advantages: 'FFMI 的优势特性',
    advantagesList: [
      '更准确地评估肌肉发达程度，不受体脂率影响',
      '经过身高校正，可以在不同身高的人之间进行比较',
      '可用于判断是否接近"自然极限"的肌肉量',
      '帮助设定合理的健身目标和期望',
    ],
    howToImprove: '如何提高 FFMI（增加肌肉量）',
    improvementList: [
      '力量训练：每周 3-5 次，注重复合动作',
      '蛋白质摄入：每公斤体重 1.6-2.2 克蛋白质',
      '充足睡眠：每晚 7-9 小时高质量睡眠',
      '渐进超负荷：逐步增加训练强度和重量',
    ],
    vsBmi: 'FFMI 与 BMI 的区别',
    vsBmiContent: 'BMI 仅考虑身高和体重，无法区分肌肉和脂肪。一个肌肉发达的运动员可能 BMI 超标，但实际上非常健康。FFMI 通过排除体脂，专注于评估瘦体重（主要是肌肉），因此对于健身人群来说是更有意义的指标。',
    formula: '计算公式',
    formulaContent: [
      '瘦体重 = 体重 × (1 - 体脂率/100)',
      'FFMI = 瘦体重 / 身高²',
      '校正FFMI = FFMI + 6.1 × (1.8 - 身高)',
    ],
  },
  reference: {
    title: 'FFMI 参考标准',
    headers: {
      range: 'FFMI 范围',
      maleRating: '男性评价',
      femaleRating: '女性评价',
    },
    rows: [
      { range: '< 15', rating: '低', description: '肌肉量严重不足' },
      { range: '16 - 17', rating: '低', description: '肌肉量不足' },
      { range: '17 - 19', rating: '正常', description: '标准肌肉量' },
      { range: '19 - 21', rating: '好', description: '高于平均肌肉量' },
      { range: '21 - 23', rating: '优秀', description: '肌肉发达' },
      { range: '> 23', rating: '精英', description: '接近自然极限或可疑' },
    ],
  },
  validation: {
    heightRange: '请输入有效身高 (100-250 cm)',
    weightRange: '请输入有效体重 (30-300 kg)',
    bodyFatRange: '请输入有效体脂率 (3-60%)',
  },
};
