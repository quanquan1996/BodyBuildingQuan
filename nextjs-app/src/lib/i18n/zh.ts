export const zh = {
  common: {
    siteName: '轻核健身AI工具站',
    home: '首页',
    tools: '工具',
    loading: '加载中...',
    error: '出错了',
    retry: '重试',
  },
  home: {
    heroTitle: '轻核健身AI工具站',
    heroDescription: '免费在线健身工具，科学评估你的训练效果',
    heroSubtitle: 'FFMI计算 · 体脂率分析 · 健美造型评分 · 肌肉量评估',
    ctaButton: '开始使用',
    featuresTitle: '热门健身工具',
    whyTitle: '为什么选择我们？',
    keywordsTitle: '适用场景',
  },
  poseComparator: {
    title: '健美造型评分器',
    description: 'AI驱动的健美造型分析，评估你的健美姿势得分',
    metaDescription: '免费AI健美造型评分工具，上传你的健美造型照片，自动检测身体姿态并评分，帮助健美爱好者改进造型展示。',
    uploadReference: '上传参考造型',
    uploadUser: '上传你的造型',
    compare: '开始评分',
    result: '评分结果',
    noPoseDetected: '未能检测到人体姿态，请上传包含完整人体的图片',
    uploadHint: '点击或拖拽图片到此处',
  },
  skinfoldCalculator: {
    title: '体脂夹计算器',
    description: '皮褶厚度法测量体脂率，支持3点和7点测量模式',
  },
  bmrCalculator: {
    title: '代谢计算器',
    description: '计算每日基础代谢率(BMR)和总能量消耗(TDEE)',
  },
  heartRateCalculator: {
    title: '心率区间计算器',
    description: '计算有氧心率训练区间，科学指导运动强度',
  },
  grecianCalculator: {
    title: '古典比例计算器',
    description: '基于黄金分割率评估身材比例，找出你的弱项部位',
  },
  carbCyclingCalculator: {
    title: '碳循环计算器',
    description: '基于Katch-McArdle公式规划碳水循环减脂饮食',
  },
  fatLossDietCalculator: {
    title: '减脂饮食计算器',
    description: '碳水递减策略，适合普通人的减脂饮食计划',
  },
  highCarbDietCalculator: {
    title: '高碳减脂计算器',
    description: '高碳水低脂肪策略，适合训练量大的健身人群',
  },
  metabolicDamageTest: {
    title: '代谢受损检测',
    description: '评估代谢适应程度，获取反向节食恢复方案',
  },
  ffmiCalculator: {
    title: 'FFMI计算器',
    description: '计算你的无脂肪体重指数，评估肌肉发达程度',
    metaDescription: '免费FFMI计算器，输入身高、体重、体脂率，快速计算无脂肪体重指数，评估肌肉发达程度。',
    heightLabel: '身高 (cm)',
    weightLabel: '体重 (kg)',
    bodyFatLabel: '体脂率 (%)',
    calculate: '计算',
    result: '计算结果',
    ffmiValue: 'FFMI值',
    adjustedFfmi: '校正FFMI',
    interpretation: '解读',
    categories: {
      below_average: '低于平均',
      average: '平均水平',
      above_average: '高于平均',
      excellent: '优秀',
      elite: '精英/可疑',
    },
    validation: {
      heightRange: '请输入有效身高 (100-250 cm)',
      weightRange: '请输入有效体重 (30-300 kg)',
      bodyFatRange: '请输入有效体脂率 (3-60%)',
    },
  },
  footer: {
    copyright: '© 2024 轻核健身AI工具站. 保留所有权利。',
  },
} as const;

export type TextStrings = typeof zh;
