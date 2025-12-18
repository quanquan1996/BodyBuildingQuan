// BMR 代谢计算器 - 中文

export interface BMRExplanationDict {
  title: string;
  whatIs: string;
  whatIsContent: string;
  mifflinFormula: {
    title: string;
    male: string;
    maleFormula: string;
    female: string;
    femaleFormula: string;
  };
  tdee: {
    title: string;
    description: string;
    levels: string[];
  };
  factors: {
    title: string;
    items: { name: string; description: string }[];
  };
  tips: {
    title: string;
    items: string[];
  };
}

export interface BMRReferenceDict {
  title: string;
  maleTitle: string;
  femaleTitle: string;
  ageRanges: {
    young: string;
    middle: string;
    senior: string;
  };
  maleValues: {
    young: string;
    middle: string;
    senior: string;
  };
  femaleValues: {
    young: string;
    middle: string;
    senior: string;
  };
  tip: {
    title: string;
    description: string;
  };
}

export interface BMRCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
    activityLevel: string;
    bodyFat: string;
    bodyFatOptional: string;
    calculate: string;
    activityLevels: {
      sedentary: string;
      light: string;
      moderate: string;
      active: string;
      veryActive: string;
    };
  };
  result: {
    title: string;
    bmr: string;
    tdee: string;
    protein: string;
    macros: string;
  };
  explanation: BMRExplanationDict;
  reference: BMRReferenceDict;
}

export const bmrCalculator: BMRCalculatorDict = {
  title: '代谢计算器',
  description: '计算每日基础代谢率(BMR)和总能量消耗(TDEE)',
  metaDescription:
    '免费BMR和TDEE计算器，根据年龄、身高、体重和活动水平计算每日热量需求。',
  form: {
    basicInfo: '基本信息',
    age: '年龄',
    height: '身高',
    weight: '体重',
    gender: '性别',
    activityLevel: '活动水平',
    bodyFat: '体脂率',
    bodyFatOptional: '可选，用于更精确计算',
    calculate: '计算代谢',
    activityLevels: {
      sedentary: '久坐（几乎不运动）',
      light: '轻度活动（每周1-3天运动）',
      moderate: '中度活动（每周3-5天运动）',
      active: '活跃（每周6-7天运动）',
      veryActive: '非常活跃（每天高强度运动）',
    },
  },
  result: {
    title: '计算结果',
    bmr: '基础代谢率',
    tdee: '每日总消耗',
    protein: '蛋白质',
    macros: '宏量营养素',
  },
  explanation: {
    title: '什么是基础代谢率 (BMR)？',
    whatIs: '基础代谢率定义',
    whatIsContent:
      '基础代谢率 (BMR, Basal Metabolic Rate) 是指人体在完全静息状态下，维持生命所需的最低能量消耗。这包括呼吸、血液循环、细胞生长、体温调节等基本生理功能所需的能量。',
    mifflinFormula: {
      title: 'Mifflin-St Jeor 公式',
      male: '男性：',
      maleFormula: 'BMR = 10×体重(kg) + 6.25×身高(cm) - 5×年龄 + 5',
      female: '女性：',
      femaleFormula: 'BMR = 10×体重(kg) + 6.25×身高(cm) - 5×年龄 - 161',
    },
    tdee: {
      title: 'TDEE 计算',
      description: '每日总能量消耗 (TDEE) = BMR × 活动系数',
      levels: [
        '久坐不动：×1.2',
        '轻度活动：×1.375',
        '中度活动：×1.55',
        '积极活动：×1.725',
        '非常活跃：×1.9',
      ],
    },
    factors: {
      title: '影响 BMR 的因素',
      items: [
        { name: '年龄', description: '随年龄增长，BMR 逐渐下降' },
        { name: '性别', description: '男性通常比女性 BMR 更高' },
        { name: '肌肉量', description: '肌肉越多，BMR 越高' },
        { name: '体重', description: '体重越大，BMR 通常越高' },
      ],
    },
    tips: {
      title: '实用建议',
      items: [
        '减脂时，每日热量摄入建议比 TDEE 低 300-500 千卡',
        '增肌时，每日热量摄入建议比 TDEE 高 200-300 千卡',
        '不建议热量摄入低于 BMR，以免影响基础代谢',
        '增加肌肉量可以提高 BMR，有助于长期体重管理',
      ],
    },
  },
  reference: {
    title: 'BMR 参考范围',
    maleTitle: '男性 BMR 参考值',
    femaleTitle: '女性 BMR 参考值',
    ageRanges: {
      young: '18-30 岁',
      middle: '31-50 岁',
      senior: '51+ 岁',
    },
    maleValues: {
      young: '1600-1800 千卡',
      middle: '1500-1700 千卡',
      senior: '1400-1600 千卡',
    },
    femaleValues: {
      young: '1300-1500 千卡',
      middle: '1200-1400 千卡',
      senior: '1100-1300 千卡',
    },
    tip: {
      title: '💡 提示',
      description:
        '以上为一般参考范围，实际 BMR 因个体差异（身高、体重、肌肉量等）会有所不同。',
    },
  },
};
