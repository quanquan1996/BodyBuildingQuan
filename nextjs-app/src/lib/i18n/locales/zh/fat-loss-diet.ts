// 减脂饮食计算器 - 中文

export interface FatLossDietExplanationDict {
  title: string;
  intro: string;
  advantages: { title: string; items: string[] };
  warnings: { title: string; items: string[] };
  reasons: {
    title: string;
    items: { number: string; title: string; description: string }[];
  };
  foodSuggestions: {
    title: string;
    categories: { name: string; foods: string }[];
  };
}

export interface FatLossDietReferenceDict {
  title: string;
  principle: { title: string; description: string };
  strategy: {
    title: string;
    initialCarb: { label: string; value: string };
    weeklyReduction: { label: string; value: string };
    minCarb: { label: string; value: string };
    protein: { label: string; value: string };
    minFat: { label: string; value: string };
  };
  deficitStrategy: {
    title: string;
    week1: { label: string; value: string };
    weeklyIncrease: { label: string; value: string };
    maxDeficit: { label: string; value: string };
  };
  suitableFor: { title: string; description: string };
}

export interface FatLossDietCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    weight: string;
    bodyFat: string;
    activityLevel: string;
    phase: string;
    calculate: string;
    phases: {
      week1_2: string;
      week3_4: string;
      week5_6: string;
      week7_8: string;
    };
  };
  result: {
    title: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    deficit: string;
  };
  explanation: FatLossDietExplanationDict;
  reference: FatLossDietReferenceDict;
}

export const fatLossDietCalculator: FatLossDietCalculatorDict = {
  title: '减脂饮食计算器',
  description: '碳水递减策略，适合普通人的减脂饮食计划',
  metaDescription:
    '免费减脂饮食计算器，获取个性化热量和宏量营养素方案，通过渐进式碳水递减实现可持续减脂。',
  form: {
    weight: '体重',
    bodyFat: '体脂率',
    activityLevel: '活动水平',
    phase: '饮食阶段',
    calculate: '计算方案',
    phases: {
      week1_2: '第1-2周',
      week3_4: '第3-4周',
      week5_6: '第5-6周',
      week7_8: '第7-8周',
    },
  },
  result: {
    title: '计算结果',
    calories: '每日热量',
    protein: '蛋白质',
    carbs: '碳水',
    fat: '脂肪',
    deficit: '热量缺口',
  },
  explanation: {
    title: '什么是碳水递减减脂法？',
    intro:
      '碳水递减减脂法是一种科学的渐进式减脂策略。与传统的固定热量减脂不同，它通过逐周降低碳水化合物摄入，让身体平稳过渡到燃脂状态，同时保持高蛋白摄入以保护肌肉。',
    advantages: {
      title: '优点',
      items: [
        '避免代谢适应和平台期',
        '减少饥饿感和暴食风险',
        '保护肌肉量',
        '心理负担小，易于坚持',
        '适合普通人执行',
      ],
    },
    warnings: {
      title: '注意事项',
      items: [
        '不适合极低体脂人群',
        '需要配合力量训练',
        '建议每周监测体重变化',
        '出现不适应及时调整',
        '减脂周期不宜过长',
      ],
    },
    reasons: {
      title: '为什么选择碳水递减？',
      items: [
        {
          number: '1',
          title: '避免代谢适应',
          description: '突然大幅减少热量会导致代谢下降，渐进式减少让身体有时间适应',
        },
        {
          number: '2',
          title: '保护肌肉',
          description: '高蛋白摄入配合渐进减碳，最大程度保留肌肉量',
        },
        {
          number: '3',
          title: '稳定血糖',
          description: '逐渐降低碳水有助于稳定血糖，减少饥饿感和情绪波动',
        },
        {
          number: '4',
          title: '易于执行',
          description: '每周只需小幅调整，比极端饮食更容易坚持',
        },
      ],
    },
    foodSuggestions: {
      title: '食物选择建议',
      categories: [
        { name: '蛋白质来源', foods: '鸡胸肉、牛肉、鱼虾、鸡蛋、豆腐、蛋白粉' },
        { name: '优质碳水', foods: '糙米、燕麦、红薯、全麦面包、藜麦' },
        { name: '健康脂肪', foods: '坚果、牛油果、橄榄油、深海鱼' },
      ],
    },
  },
  reference: {
    title: '碳水递减参考',
    principle: {
      title: '碳水递减原理',
      description:
        '碳水递减是一种渐进式减脂策略，通过逐周降低碳水化合物摄入，让身体逐渐适应低碳水状态，避免代谢适应和平台期。',
    },
    strategy: {
      title: '本计算器策略',
      initialCarb: { label: '初始碳水比例', value: '45%' },
      weeklyReduction: { label: '每周递减', value: '8%' },
      minCarb: { label: '最低碳水比例', value: '20%' },
      protein: { label: '蛋白质', value: '2.0g/kg 体重' },
      minFat: { label: '最低脂肪', value: '0.8g/kg 体重' },
    },
    deficitStrategy: {
      title: '热量缺口策略',
      week1: { label: '第1周', value: '-300 千卡' },
      weeklyIncrease: { label: '每周递增', value: '+50 千卡' },
      maxDeficit: { label: '最大缺口', value: '-600 千卡' },
    },
    suitableFor: {
      title: '💡 适用人群',
      description:
        '本计划适合普通健身爱好者和减脂新手。如果你是专业运动员或有特殊健康状况，建议咨询专业营养师。',
    },
  },
};
