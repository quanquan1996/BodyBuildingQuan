// 代谢受损检测 - 中文

export interface MetabolicDamageExplanationDict {
  title: string;
  faq: {
    question: string;
    intro?: string;
    points?: string[];
    conclusion?: string;
  }[];
}

export interface MetabolicDamageReferenceDict {
  title: string;
  whatIs: { title: string; description: string };
  symptoms: { title: string; items: { emoji: string; text: string }[] };
  levels: {
    title: string;
    normal: { title: string; description: string };
    mild: { title: string; description: string };
    moderate: { title: string; description: string };
    severe: { title: string; description: string };
  };
  factors: { title: string; items: string[] };
  recovery: { title: string; strategies: { title: string; description: string }[] };
}

export interface MetabolicDamageTestDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    currentCalories: string;
    weight: string;
    bodyFat: string;
    dietDuration: string;
    symptoms: string;
    calculate: string;
    symptomsList: {
      fatigue: string;
      coldHands: string;
      hairLoss: string;
      lowLibido: string;
      poorSleep: string;
      noProgress: string;
    };
  };
  result: {
    title: string;
    damageLevel: string;
    expectedBMR: string;
    actualIntake: string;
    deficit: string;
    recommendation: string;
    levels: { none: string; mild: string; moderate: string; severe: string };
  };
  explanation: MetabolicDamageExplanationDict;
  reference: MetabolicDamageReferenceDict;
}

export const metabolicDamageTest: MetabolicDamageTestDict = {
  title: '代谢受损检测',
  description: '评估代谢适应程度，获取反向节食恢复方案',
  metaDescription: '免费代谢受损评估工具，评估你的代谢是否因长期低热量而适应，并获取恢复方案。',
  form: {
    currentCalories: '当前每日热量',
    weight: '体重',
    bodyFat: '体脂率',
    dietDuration: '节食时长（周）',
    symptoms: '症状',
    calculate: '评估受损程度',
    symptomsList: {
      fatigue: '慢性疲劳',
      coldHands: '手脚冰凉',
      hairLoss: '脱发',
      lowLibido: '性欲降低',
      poorSleep: '睡眠质量差',
      noProgress: '低热量却无进展',
    },
  },
  result: {
    title: '评估结果',
    damageLevel: '受损程度',
    expectedBMR: '预期基础代谢',
    actualIntake: '实际摄入',
    deficit: '缺口',
    recommendation: '建议',
    levels: {
      none: '无受损',
      mild: '轻度适应',
      moderate: '中度受损',
      severe: '严重受损',
    },
  },
  explanation: {
    title: '常见问题',
    faq: [
      {
        question: '代谢受损是真的吗？还是借口？',
        intro: '代谢适应是经过科学验证的生理现象，不是借口。研究表明，长期热量限制会导致：',
        points: [
          '非运动性活动产热(NEAT)下降 - 你会不自觉地减少日常活动',
          '甲状腺激素T3下降 - 直接影响代谢率',
          '瘦素水平降低 - 增加饥饿感，降低能量消耗',
          '肌肉蛋白合成减少 - 可能导致肌肉流失',
        ],
        conclusion: '但这不意味着你无法减脂，只是需要更科学的方法。',
      },
      {
        question: '为什么吃很少还是不瘦？',
        intro: '可能的原因包括：',
        points: [
          '热量计算不准确 - 低估了实际摄入（最常见原因）',
          '代谢适应 - 身体降低了能量消耗',
          '水分波动 - 体重变化被水分掩盖',
          '压力和睡眠 - 皮质醇升高导致水肿',
          '周末放纵 - 抵消了工作日的缺口',
        ],
        conclusion: '建议先确认热量计算是否准确，再考虑代谢适应问题。',
      },
      {
        question: '什么是反向节食？怎么做？',
        intro:
          '反向节食(Reverse Dieting)是一种逐步增加热量摄入的策略，目的是恢复代谢而不大幅增加体脂。具体做法：',
        points: [
          '每周增加50-100千卡热量（主要来自碳水化合物）',
          '保持蛋白质摄入稳定（1.6-2.2g/kg体重）',
          '继续力量训练，维持肌肉量',
          '监控体重变化，允许小幅上涨（主要是糖原和水分）',
          '持续4-16周，直到达到维持热量',
        ],
      },
      {
        question: '代谢恢复需要多长时间？',
        intro: '恢复时间取决于代谢适应的程度：',
        points: [
          '轻度适应：2-4周饮食休息即可恢复',
          '中度受损：4-8周反向节食',
          '严重受损：8-16周甚至更长',
        ],
        conclusion: '研究表明，大多数代谢适应可以在恢复正常饮食后逆转，但需要耐心。',
      },
      {
        question: '如何避免代谢受损？',
        intro: '预防代谢适应的策略：',
        points: [
          '适度热量缺口：每天300-500千卡，不要太激进',
          '定期饮食休息：每4-8周安排1-2周维持期',
          '保持蛋白质：高蛋白饮食保护肌肉',
          '力量训练：维持肌肉量是关键',
          '控制有氧量：避免过度有氧消耗',
          '充足睡眠：7-9小时优质睡眠',
          '管理压力：高压力会加速代谢下降',
        ],
      },
      {
        question: '这个检测准确吗？',
        intro: '此检测基于以下因素进行评估：',
        points: [
          '当前热量摄入与理论BMR的对比',
          '体重变化趋势与热量缺口的匹配度',
          '节食持续时间',
        ],
        conclusion:
          '局限性：这是一个估算工具，不能替代专业的代谢测试（如间接测热法）。实际代谢率受很多因素影响，包括遗传、激素水平、肌肉量等。如果你有严重的代谢问题，建议咨询医生或营养师进行专业评估。',
      },
    ],
  },
  reference: {
    title: '代谢受损参考',
    whatIs: {
      title: '什么是代谢受损？',
      description:
        '代谢受损（Metabolic Adaptation）是指长期热量限制后，身体为了生存而降低能量消耗的适应性反应。这不是真正的"损伤"，而是身体的保护机制。',
    },
    symptoms: {
      title: '代谢适应的常见表现',
      items: [
        { emoji: '⚖️', text: '体重停滞不降' },
        { emoji: '🥶', text: '经常感到寒冷' },
        { emoji: '😴', text: '疲劳感增加' },
        { emoji: '💪', text: '力量下降' },
        { emoji: '🍽️', text: '饥饿感强烈' },
        { emoji: '😤', text: '情绪波动大' },
        { emoji: '💤', text: '睡眠质量差' },
        { emoji: '🏃', text: '运动表现下降' },
      ],
    },
    levels: {
      title: '受损等级说明',
      normal: {
        title: '✅ 代谢正常 (0-24分)',
        description: '热量摄入与体重变化符合预期，代谢功能正常',
      },
      mild: {
        title: '⚠️ 轻度适应 (25-49分)',
        description: '存在轻微代谢适应，建议安排饮食休息日或适当增加热量',
      },
      moderate: {
        title: '🔶 中度受损 (50-74分)',
        description: '代谢明显下降，建议进行4-8周的反向节食恢复',
      },
      severe: {
        title: '🔴 严重受损 (75-100分)',
        description: '代谢严重受损，强烈建议停止节食，进行8-16周系统性恢复',
      },
    },
    factors: {
      title: '影响代谢适应的因素',
      items: [
        '热量缺口大小',
        '节食持续时间',
        '蛋白质摄入量',
        '力量训练频率',
        '睡眠质量',
        '压力水平',
      ],
    },
    recovery: {
      title: '恢复策略',
      strategies: [
        { title: '反向节食', description: '每周增加50-100千卡，逐步恢复到维持热量' },
        { title: '饮食休息', description: '在维持热量水平吃2-4周，让身体恢复' },
        { title: '力量训练', description: '保持或增加力量训练，维持肌肉量' },
        { title: '充足睡眠', description: '每晚7-9小时高质量睡眠' },
      ],
    },
  },
};
