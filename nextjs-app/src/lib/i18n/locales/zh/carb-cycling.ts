// 碳循环计算器 - 中文

export interface CarbCyclingExplanationDict {
  title: string;
  whatIs: { title: string; content: string };
  formula: { title: string; description: string; bmr: string; leanMass: string };
  benefits: { title: string; items: string[] };
  suitableFor: { title: string; content: string };
  warnings: { title: string; items: string[] };
}

export interface CarbCyclingReferenceDict {
  title: string;
  simplePlan: {
    title: string;
    highCarb: string;
    highCarbDays: string;
    lowCarb: string;
    lowCarbDays: string;
  };
  advancedPlan: {
    title: string;
    highCarb: string;
    highCarbDays: string;
    mediumCarb: string;
    mediumCarbDays: string;
    lowCarb: string;
    lowCarbDays: string;
  };
  trainingTips: {
    title: string;
    highCarb: { title: string; description: string };
    mediumCarb: { title: string; description: string };
    lowCarb: { title: string; description: string };
  };
  executionTips: { title: string; items: string[] };
}

export interface CarbCyclingCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    weight: string;
    bodyFat: string;
    activityLevel: string;
    goal: string;
    calculate: string;
    goals: { fatLoss: string; maintain: string; muscle: string };
  };
  result: {
    title: string;
    highCarb: string;
    lowCarb: string;
    noCarb: string;
    protein: string;
    fat: string;
    carbs: string;
    calories: string;
  };
  explanation: CarbCyclingExplanationDict;
  reference: CarbCyclingReferenceDict;
}

export const carbCyclingCalculator: CarbCyclingCalculatorDict = {
  title: '碳循环计算器',
  description: '基于Katch-McArdle公式规划碳水循环减脂饮食',
  metaDescription: '免费碳循环计算器，规划高碳、低碳、无碳日，有效减脂同时保持肌肉。',
  form: {
    weight: '体重',
    bodyFat: '体脂率',
    activityLevel: '活动水平',
    goal: '目标',
    calculate: '计算方案',
    goals: {
      fatLoss: '减脂',
      maintain: '维持',
      muscle: '增肌',
    },
  },
  result: {
    title: '计算结果',
    highCarb: '高碳日',
    lowCarb: '低碳日',
    noCarb: '无碳日',
    protein: '蛋白质',
    fat: '脂肪',
    carbs: '碳水',
    calories: '热量',
  },
  explanation: {
    title: '碳循环原理',
    whatIs: {
      title: '什么是碳循环饮食？',
      content:
        '碳循环（Carb Cycling）是一种饮食策略，通过在不同日期交替摄入高、中、低碳水化合物，来优化身体的能量利用和激素水平。高碳日补充糖原、促进训练表现，低碳日促进脂肪燃烧，两者结合可以在减脂的同时保持肌肉和训练状态。',
    },
    formula: {
      title: 'Katch-McArdle 公式',
      description:
        '本计算器使用 Katch-McArdle 公式计算基础代谢率，该公式基于瘦体重（去脂体重）计算，对于健身人群和体脂率已知的用户更为准确。',
      bmr: 'BMR = 370 + (21.6 × 瘦体重)',
      leanMass: '瘦体重 = 体重 × (1 - 体脂率/100)',
    },
    benefits: {
      title: '碳循环的优势',
      items: [
        '避免长期低碳导致的代谢适应和平台期',
        '高碳日补充糖原，保持训练强度和表现',
        '低碳日促进脂肪氧化，提高减脂效率',
        '心理上更容易坚持，有"放松日"的感觉',
        '保持瘦素和甲状腺激素水平稳定',
      ],
    },
    suitableFor: {
      title: '适合人群',
      content:
        '碳循环适合有一定健身基础、希望在减脂期保持训练表现的人群。如果你是健身新手，建议先从简单的热量控制开始，熟悉后再尝试碳循环。',
    },
    warnings: {
      title: '注意事项',
      items: [
        '计算结果仅供参考，实际需求因人而异',
        '建议根据体重变化和训练感受调整',
        '如有健康问题，请咨询专业营养师',
      ],
    },
  },
  reference: {
    title: '碳循环指南',
    simplePlan: {
      title: '简易版周计划 (2高5低)',
      highCarb: '🟢 高碳日',
      highCarbDays: '周三、周六',
      lowCarb: '🟠 低碳日',
      lowCarbDays: '周一、二、四、五、日',
    },
    advancedPlan: {
      title: '进阶版周计划 (2高2中3低)',
      highCarb: '🟢 高碳日',
      highCarbDays: '周三、周六',
      mediumCarb: '🔵 中碳日',
      mediumCarbDays: '周一、周五',
      lowCarb: '🟠 低碳日',
      lowCarbDays: '周二、四、日',
    },
    trainingTips: {
      title: '训练安排建议',
      highCarb: {
        title: '🟢 高碳日',
        description: '安排大肌群训练（腿、背、胸），高强度力量训练',
      },
      mediumCarb: {
        title: '🔵 中碳日',
        description: '安排小肌群训练（肩、手臂），中等强度训练',
      },
      lowCarb: {
        title: '🟠 低碳日',
        description: '休息日或低强度有氧，如快走、瑜伽',
      },
    },
    executionTips: {
      title: '💡 执行要点',
      items: [
        '高碳日碳水来源选择复合碳水（燕麦、糙米、红薯）',
        '低碳日增加蔬菜摄入，保持饱腹感',
        '蛋白质每天保持稳定，分散到每餐',
        '根据训练反馈灵活调整，不必严格固定',
      ],
    },
  },
};
