// 古典比例计算器 - 中文

export interface GrecianExplanationDict {
  title: string;
  faq: {
    whatIs: { question: string; answer: string[] };
    goldenRatio: { question: string; answer: string; points: string[] };
    wristMethod: { question: string; answer: string[] };
    symmetry: { question: string; answer: string[] };
    limitations: { question: string; intro: string; points: string[] };
  };
}

export interface GrecianReferenceDict {
  title: string;
  goldenRatio: { title: string; description: string };
  steveReeves: { title: string; description: string; standards: string[] };
  measurementGuide: { title: string; items: string[] };
  wristImportance: { title: string; description: string };
}

export interface GrecianCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    wrist: string;
    measurements: string;
    chest: string;
    waist: string;
    hips: string;
    biceps: string;
    forearm: string;
    thigh: string;
    calf: string;
    neck: string;
    calculate: string;
  };
  result: {
    title: string;
    ideal: string;
    current: string;
    difference: string;
    score: string;
  };
  explanation: GrecianExplanationDict;
  reference: GrecianReferenceDict;
}

export const grecianCalculator: GrecianCalculatorDict = {
  title: '古典比例计算器',
  description: '基于黄金分割率评估身材比例，找出你的弱项部位',
  metaDescription: '免费古典比例计算器，根据手腕围度和黄金分割原理计算理想身材围度。',
  form: {
    wrist: '手腕围度',
    measurements: '当前围度',
    chest: '胸围',
    waist: '腰围',
    hips: '臀围',
    biceps: '上臂围',
    forearm: '前臂围',
    thigh: '大腿围',
    calf: '小腿围',
    neck: '颈围',
    calculate: '计算理想比例',
  },
  result: {
    title: '计算结果',
    ideal: '理想值',
    current: '当前值',
    difference: '差距',
    score: '比例得分',
  },
  explanation: {
    title: '关于古典比例计算器',
    faq: {
      whatIs: {
        question: '什么是希腊雕塑比例（Grecian Ideal）？',
        answer: [
          '希腊雕塑比例源自古希腊对人体美学的研究，认为完美的人体应该符合特定的数学比例关系。这些比例以黄金分割率（φ = 1.618）为核心，被广泛应用于古希腊雕塑和建筑中。',
          '在现代健美运动中，这些古典比例被重新发现并应用，成为评判身材对称性和美感的重要标准。传奇健美运动员如 Steve Reeves、Frank Zane 等都以接近古典比例而闻名。',
        ],
      },
      goldenRatio: {
        question: '黄金分割率在健美中的应用',
        answer:
          '黄金分割率（约 1.618）是自然界中最常见的比例关系，被认为是最具美感的比例。在健美中，主要应用于以下方面：',
        points: [
          '肩腰比：理想的肩围应该是腰围的 1.618 倍，形成经典的 V 型身材',
          '胸腰比：胸围与腰围的比例也应接近 1.618',
          '上下身比例：腿长与上身的比例',
        ],
      },
      wristMethod: {
        question: '为什么用手腕围度作为基准？',
        answer: [
          '手腕是人体中几乎没有肌肉和脂肪覆盖的部位，其围度主要由骨骼大小决定。因此，手腕围度是衡量个人骨架大小的可靠指标。',
          '基于手腕围度计算理想身材比例的方法由 John McCallum 在 1960 年代提出，后来被 Steve Reeves 等健美运动员广泛采用。这种方法考虑了个体差异，为不同骨架大小的人提供了个性化的目标。',
        ],
      },
      symmetry: {
        question: '对称性在健美中的重要性',
        answer: [
          '健美比赛评分中，对称性（Symmetry）是三大评判标准之一（另外两个是肌肉量和线条）。对称性不仅指左右对称，更重要的是上下身、前后身的比例协调。',
          '古典比例计算器帮助你识别身材中的弱项，让你能够针对性地训练，而不是盲目追求某个部位的肌肉量。记住：健美的本质是雕塑，而不是堆砌。',
        ],
      },
      limitations: {
        question: '计算器的局限性',
        intro: '本计算器基于经典公式和黄金分割率，但需要注意：',
        points: [
          '每个人的骨骼结构和肌肉附着点不同，理想比例会有个体差异',
          '测量误差会影响结果准确性，建议多次测量取平均值',
          '古典比例更适合追求美感的健体/古典健美，而非追求极限肌肉量的健美',
          '女性的理想比例与男性有所不同，本计算器主要针对男性设计',
        ],
      },
    },
  },
  reference: {
    title: '古典比例参考标准',
    goldenRatio: {
      title: '黄金分割率 (φ = 1.618)',
      description:
        '古希腊人认为 1.618 是最完美的比例，广泛应用于建筑、艺术和人体美学。在健美中，理想的肩腰比和胸腰比都应接近这个数值。',
    },
    steveReeves: {
      title: 'Steve Reeves 标准',
      description: '传奇健美运动员 Steve Reeves 被认为拥有最接近古典理想的身材比例：',
      standards: [
        '上臂围 = 颈围 = 小腿围',
        '胸围 = 手腕围 × 6.5',
        '腰围 = 手腕围 × 4.0',
        '肩围 = 腰围 × 1.618',
      ],
    },
    measurementGuide: {
      title: '测量方法',
      items: [
        '手腕围：在手腕最细处测量（骨头突出处）',
        '肩围：双臂下垂，绕肩膀最宽处一圈',
        '胸围：乳头水平位置，正常呼吸时测量',
        '腰围：肚脐水平位置，放松状态测量',
        '上臂围：屈臂时二头肌最高点',
        '大腿围：大腿根部最粗处',
        '小腿围：小腿最粗处',
      ],
    },
    wristImportance: {
      title: '为什么手腕围度很重要？',
      description:
        '手腕围度反映了你的骨架大小，是计算理想身材比例的基准。骨架较大的人自然需要更多的肌肉量才能达到视觉上的平衡。',
    },
  },
};
