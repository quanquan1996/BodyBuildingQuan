// 心率区间计算器 - 中文

export interface HeartRateExplanationDict {
  title: string;
  intro: string;
  zones: {
    title: string;
    items: {
      name: string;
      range: string;
      description: string;
      color: string;
    }[];
  };
  formulas: {
    standard: {
      title: string;
      maxHR: string;
      maxHRFormula: string;
      targetHR: string;
      targetHRFormula: string;
    };
    karvonen: {
      title: string;
      hrr: string;
      hrrFormula: string;
      targetHR: string;
      targetHRFormula: string;
    };
  };
  tips: {
    title: string;
    items: string[];
  };
}

export interface HeartRateCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    age: string;
    restingHR: string;
    maxHR: string;
    calculate: string;
  };
  result: {
    title: string;
    maxHR: string;
    zones: string;
    zone1: string;
    zone2: string;
    zone3: string;
    zone4: string;
    zone5: string;
  };
  explanation: HeartRateExplanationDict;
}

export const heartRateCalculator: HeartRateCalculatorDict = {
  title: '心率区间计算器',
  description: '计算有氧心率训练区间，科学指导运动强度',
  metaDescription: '免费心率区间计算器，根据年龄和静息心率计算最佳训练心率区间。',
  form: {
    age: '年龄',
    restingHR: '静息心率',
    maxHR: '最大心率（可选）',
    calculate: '计算区间',
  },
  result: {
    title: '计算结果',
    maxHR: '最大心率',
    zones: '训练区间',
    zone1: '区间1 - 恢复',
    zone2: '区间2 - 燃脂',
    zone3: '区间3 - 有氧',
    zone4: '区间4 - 阈值',
    zone5: '区间5 - 极限',
  },
  explanation: {
    title: '心率训练区间详解',
    intro:
      '心率训练区间是根据最大心率划分的不同强度范围，每个区间对应不同的训练效果。了解并利用心率区间可以让你的有氧训练更加科学高效。',
    zones: {
      title: '五大心率区间',
      items: [
        {
          name: 'Zone 1 - 热身区',
          range: '50-60%',
          description: '非常轻松的活动，适合热身、恢复训练。可以轻松交谈，几乎不出汗。',
          color: 'gray',
        },
        {
          name: 'Zone 2 - 燃脂区',
          range: '60-70%',
          description: '最佳脂肪燃烧区间，适合长时间有氧运动。可以说完整句子，微微出汗。',
          color: 'blue',
        },
        {
          name: 'Zone 3 - 有氧区',
          range: '70-80%',
          description: '提升心肺耐力的核心区间，中等强度。说话开始困难，明显出汗。',
          color: 'green',
        },
        {
          name: 'Zone 4 - 无氧区',
          range: '80-90%',
          description: '高强度训练，提升速度耐力和乳酸阈值。只能说几个词，大量出汗。',
          color: 'orange',
        },
        {
          name: 'Zone 5 - 极限区',
          range: '90-100%',
          description: '最大强度输出，只能维持很短时间。无法说话，全力冲刺。',
          color: 'red',
        },
      ],
    },
    formulas: {
      standard: {
        title: '标准公式',
        maxHR: '最大心率：',
        maxHRFormula: 'MHR = 220 - 年龄',
        targetHR: '目标心率：',
        targetHRFormula: 'THR = MHR × 强度%',
      },
      karvonen: {
        title: 'Karvonen 公式',
        hrr: '心率储备：',
        hrrFormula: 'HRR = MHR - 静息心率',
        targetHR: '目标心率：',
        targetHRFormula: 'THR = 静息心率 + HRR × 强度%',
      },
    },
    tips: {
      title: '训练建议',
      items: [
        '减脂为主：70-80% 时间在 Zone 2，偶尔 Zone 3',
        '提升耐力：主要在 Zone 3，配合 Zone 2 恢复',
        '提升速度：间歇训练，Zone 4-5 配合 Zone 1-2 恢复',
        '初学者建议从 Zone 2 开始，逐步增加强度',
      ],
    },
  },
};
