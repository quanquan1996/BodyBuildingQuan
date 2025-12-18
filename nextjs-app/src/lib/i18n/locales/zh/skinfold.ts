// 体脂夹计算器 - 中文

export interface SkinfoldExplanationDict {
  title: string;
  jacksonPollock: {
    title: string;
    description: string;
    formula: string;
    note: string;
  };
  siriFormula: {
    title: string;
    description: string;
    formula: string;
  };
  accuracy: {
    title: string;
    points: string[];
  };
  comparison: {
    title: string;
    headers: string[];
    methods: {
      name: string;
      accuracy: string;
      cost: string;
      convenience: string;
    }[];
  };
}

export interface SkinfoldReferenceDict {
  title: string;
  maleTitle: string;
  femaleTitle: string;
  categories: {
    essential: string;
    athletic: string;
    fitness: string;
    average: string;
    obese: string;
  };
  maleRanges: {
    essential: string;
    athletic: string;
    fitness: string;
    average: string;
    obese: string;
  };
  femaleRanges: {
    essential: string;
    athletic: string;
    fitness: string;
    average: string;
    obese: string;
  };
  source: string;
}

export interface SkinfoldCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    measurementMode: string;
    threePoint: string;
    sevenPoint: string;
    age: string;
    gender: string;
    chest: string;
    abdomen: string;
    thigh: string;
    triceps: string;
    subscapular: string;
    suprailiac: string;
    midaxillary: string;
    calculate: string;
  };
  result: {
    title: string;
    bodyFat: string;
    fatMass: string;
    leanMass: string;
    category: string;
  };
  categories: {
    essential: string;
    athletic: string;
    fitness: string;
    average: string;
    obese: string;
  };
  categoryLabels: {
    essential: string;
    athlete: string;
    fitness: string;
    average: string;
    obese: string;
  };
  guide: {
    title: string;
    tipsTitle: string;
    tips: string[];
    sitesTitle: string;
    modesTitle: string;
    simpleMode: {
      title: string;
      description: string;
      male: string;
      female: string;
    };
    preciseMode: {
      title: string;
      description: string;
      sites: string;
    };
    measurementSites: {
      chest: { name: string; description: string; tips: string };
      midaxillary: { name: string; description: string; tips: string };
      triceps: { name: string; description: string; tips: string };
      subscapular: { name: string; description: string; tips: string };
      abdominal: { name: string; description: string; tips: string };
      suprailiac: { name: string; description: string; tips: string };
      thigh: { name: string; description: string; tips: string };
    };
  };
  validation: {
    ageRange: string;
    measurementRange: string;
  };
  explanation: SkinfoldExplanationDict;
  reference: SkinfoldReferenceDict;
}

export const skinfoldCalculator: SkinfoldCalculatorDict = {
  title: '体脂夹计算器',
  description: '皮褶厚度法测量体脂率，支持3点和7点测量模式',
  metaDescription:
    '免费体脂夹计算器，使用Jackson-Pollock公式，通过皮褶厚度测量精确计算体脂率。',
  form: {
    basicInfo: '基本信息',
    measurementMode: '测量模式',
    threePoint: '3点法',
    sevenPoint: '7点法',
    age: '年龄',
    gender: '性别',
    chest: '胸部',
    abdomen: '腹部',
    thigh: '大腿',
    triceps: '肱三头肌',
    subscapular: '肩胛下',
    suprailiac: '髂上',
    midaxillary: '腋中线',
    calculate: '计算体脂率',
  },
  result: {
    title: '计算结果',
    bodyFat: '体脂率',
    fatMass: '脂肪质量',
    leanMass: '瘦体重',
    category: '分类',
  },
  categories: {
    essential: '必需脂肪',
    athletic: '运动员',
    fitness: '健身',
    average: '平均',
    obese: '肥胖',
  },
  categoryLabels: {
    essential: '必需脂肪（可能过低）',
    athlete: '运动员水平',
    fitness: '健身水平',
    average: '平均水平',
    obese: '超重/肥胖',
  },
  guide: {
    title: '测量部位详解',
    tipsTitle: '测量技巧',
    tips: [
      '使用专业体脂夹，确保刻度清晰可读',
      '用拇指和食指捏起皮褶，距离约 1cm',
      '在捏起后 2-3 秒内读取数值',
      '每个部位测量 2-3 次取平均值',
      '测量时保持肌肉放松',
      '建议在相同时间、相同条件下测量',
    ],
    sitesTitle: '各测量部位说明',
    modesTitle: '测量模式说明',
    simpleMode: {
      title: '简易模式 (3点测量)',
      description: '适合日常快速评估，准确度约 ±3-4%',
      male: '男性：胸部、腹部、大腿',
      female: '女性：三头肌、髂骨上、大腿',
    },
    preciseMode: {
      title: '精确模式 (7点测量)',
      description: '更全面的评估，准确度约 ±2-3%',
      sites: '测量全部7个部位：胸部、腋中线、三头肌、肩胛下、腹部、髂骨上、大腿',
    },
    measurementSites: {
      chest: {
        name: '胸部',
        description: '在胸大肌与腋窝前缘连线的中点处，斜向捏起皮褶',
        tips: '男性常用测量点，皮褶方向与胸大肌纤维平行',
      },
      midaxillary: {
        name: '腋中线',
        description: '在腋窝中线与剑突水平线的交点处，垂直捏起皮褶',
        tips: '手臂自然下垂，在腋窝正下方测量',
      },
      triceps: {
        name: '三头肌',
        description: '在上臂后侧，肩峰与尺骨鹰嘴连线的中点处，垂直捏起皮褶',
        tips: '手臂自然下垂放松，测量上臂后侧中点',
      },
      subscapular: {
        name: '肩胛下',
        description: '在肩胛骨下角下方约2cm处，斜向45度捏起皮褶',
        tips: '皮褶方向与肩胛骨下缘平行，约45度角',
      },
      abdominal: {
        name: '腹部',
        description: '在肚脐旁约2-3cm处，垂直捏起皮褶',
        tips: '测量时保持腹部放松，不要收腹',
      },
      suprailiac: {
        name: '髂骨上',
        description: '在髂嵴上方，腋前线位置，斜向捏起皮褶',
        tips: '沿着髂嵴自然走向，约45度角捏起',
      },
      thigh: {
        name: '大腿',
        description: '在大腿前侧，髌骨与腹股沟连线的中点处，垂直捏起皮褶',
        tips: '坐姿或站立，大腿放松，测量股四头肌中点',
      },
    },
  },
  validation: {
    ageRange: '请输入有效年龄 (18-80)',
    measurementRange: '请输入有效测量值 (1-100 mm)',
  },
  explanation: {
    title: '计算原理',
    jacksonPollock: {
      title: 'Jackson-Pollock 公式',
      description:
        '本计算器使用 Jackson-Pollock 公式，这是目前最广泛使用的皮褶厚度体脂率估算方法。该公式通过测量特定部位的皮下脂肪厚度来估算全身体脂率。',
      formula: '体密度 = a - b×(皮褶总和) + c×(皮褶总和)² - d×(年龄)',
      note: '其中 a, b, c, d 为性别相关系数',
    },
    siriFormula: {
      title: 'Siri 公式',
      description:
        '计算出体密度后，使用 Siri 公式将体密度转换为体脂率百分比。这个公式假设脂肪组织密度为 0.9 g/cm³，瘦体组织密度为 1.1 g/cm³。',
      formula: '体脂率(%) = (495 / 体密度) - 450',
    },
    accuracy: {
      title: '准确性说明',
      points: [
        '皮褶厚度法的标准误差约为 ±3-4%',
        '测量技术和体脂夹质量会影响结果',
        '对于体脂率极低或极高的人群，准确性可能下降',
        '建议作为趋势追踪工具，而非绝对值参考',
        '如需精确测量，建议使用 DEXA 或水下称重法',
      ],
    },
    comparison: {
      title: '体脂测量方法对比',
      headers: ['方法', '准确度', '成本', '便捷性'],
      methods: [
        {
          name: 'DEXA 扫描',
          accuracy: '⭐⭐⭐⭐⭐',
          cost: '💰💰💰',
          convenience: '需专业设备',
        },
        {
          name: '水下称重',
          accuracy: '⭐⭐⭐⭐⭐',
          cost: '💰💰💰',
          convenience: '需专业设备',
        },
        {
          name: '皮褶厚度法',
          accuracy: '⭐⭐⭐⭐',
          cost: '💰',
          convenience: '便携易用',
        },
        {
          name: '生物电阻抗',
          accuracy: '⭐⭐⭐',
          cost: '💰💰',
          convenience: '方便快捷',
        },
        {
          name: '目测/照片',
          accuracy: '⭐⭐',
          cost: '免费',
          convenience: '最便捷',
        },
      ],
    },
  },
  reference: {
    title: '体脂率参考标准',
    maleTitle: '男性体脂率标准',
    femaleTitle: '女性体脂率标准',
    categories: {
      essential: '必需脂肪',
      athletic: '运动员',
      fitness: '健身水平',
      average: '平均水平',
      obese: '肥胖',
    },
    maleRanges: {
      essential: '2-5%',
      athletic: '6-13%',
      fitness: '14-17%',
      average: '18-24%',
      obese: '>25%',
    },
    femaleRanges: {
      essential: '10-13%',
      athletic: '14-20%',
      fitness: '21-24%',
      average: '25-31%',
      obese: '>32%',
    },
    source: '* 参考标准来自美国运动医学会 (ACSM)',
  },
};
