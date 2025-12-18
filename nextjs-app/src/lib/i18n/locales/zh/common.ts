// 通用文本 - 中文

export interface ToolLinksDict {
  exploreMore: string;
  otherFatLossPlans: string;
  skinfoldToFfmi: { title: string; description: string };
  skinfoldToBmr: { title: string; description: string };
  skinfoldToCarbCycling: { title: string; description: string };
  bmrToCarbCycling: { title: string; description: string };
  bmrToHeartRate: { title: string; description: string };
  needBodyFat: { title: string; description: string };
  grecianToPose: { title: string; description: string };
  poseToGrecian: { title: string; description: string };
  skinfoldToFatLossDiet: { title: string; description: string };
  bmrToFatLossDiet: { title: string; description: string };
  carbCyclingToFatLossDiet: { title: string; description: string };
  fatLossDietToCarbCycling: { title: string; description: string };
  skinfoldToHighCarbDiet: { title: string; description: string };
  bmrToHighCarbDiet: { title: string; description: string };
  highCarbDietToCarbCycling: { title: string; description: string };
  toMetabolicDamageTest: { title: string; description: string };
  metabolicDamageToReverseDiet: { title: string; description: string };
}

export interface CommonDict {
  siteName: string;
  siteNameShort: string;
  siteSlogan: string;
  home: string;
  tools: string;
  loading: string;
  error: string;
  retry: string;
  calculate: string;
  result: string;
  male: string;
  female: string;
  relatedTools: string;
  viewAll: string;
  toolLinks: ToolLinksDict;
  basicInfo: string;
  bodyComposition: string;
  calculationMode: string;
  basicMode: string;
  advancedMode: string;
  gender: string;
  age: string;
  ageUnit: string;
  height: string;
  weight: string;
  bodyFat: string;
  bodyFatHint: string;
  activityLevel: string;
  weeks: string;
  weeksUnit: string;
  days: string;
  activityLevels: {
    sedentary: { label: string; description: string };
    light: { label: string; description: string };
    moderate: { label: string; description: string };
    active: { label: string; description: string };
    veryActive: { label: string; description: string };
  };
  advancedModeHint: string;
  measurementLocation: string;
  enterValue: string;
  maleThreePoint: string;
  femaleThreePoint: string;
  sevenPointDescription: string;
}

export const common: CommonDict = {
  siteName: '轻核健身AI工具站',
  siteNameShort: '轻核',
  siteSlogan: '健身AI工具站',
  home: '首页',
  tools: '工具',
  loading: '加载中...',
  error: '出错了',
  retry: '重试',
  calculate: '计算',
  result: '结果',
  male: '男性',
  female: '女性',
  relatedTools: '相关工具推荐',
  viewAll: '查看全部',
  basicInfo: '基本信息',
  bodyComposition: '身体成分',
  calculationMode: '计算模式',
  basicMode: '基础计算',
  advancedMode: '进阶计算',
  gender: '性别',
  age: '年龄',
  ageUnit: '岁',
  height: '身高',
  weight: '体重',
  bodyFat: '体脂率',
  bodyFatHint: '不知道体脂率？用体脂夹测量',
  activityLevel: '活动水平',
  weeks: '周',
  weeksUnit: '周',
  days: '天',
  activityLevels: {
    sedentary: { label: '久坐', description: '几乎不运动' },
    light: { label: '轻度活动', description: '每周1-3天运动' },
    moderate: { label: '中度活动', description: '每周3-5天运动' },
    active: { label: '活跃', description: '每周6-7天运动' },
    veryActive: { label: '非常活跃', description: '每天高强度运动' },
  },
  advancedModeHint: '进阶模式使用体脂率计算瘦体重，对健身人群更准确',
  measurementLocation: '测量位置',
  enterValue: '输入测量值',
  maleThreePoint: '男性3点测量：胸部、腹部、大腿',
  femaleThreePoint: '女性3点测量：三头肌、髂骨上、大腿',
  sevenPointDescription: '7点测量法提供更精确的体脂率估算',
  toolLinks: {
    exploreMore: '🔗 继续探索',
    otherFatLossPlans: '🔗 其他减脂方案',
    skinfoldToFfmi: { title: '计算 FFMI 肌肉指数', description: '用测得的体脂率评估肌肉发达程度' },
    skinfoldToBmr: { title: '计算精准基础代谢', description: '基于体脂率的 Katch-McArdle 公式更准确' },
    skinfoldToCarbCycling: { title: '制定碳循环饮食计划', description: '根据体脂率定制高低碳日方案' },
    bmrToCarbCycling: { title: '制定碳循环饮食计划', description: '基于代谢数据定制饮食方案' },
    bmrToHeartRate: { title: '计算训练心率区间', description: '了解不同强度的目标心率' },
    needBodyFat: { title: '不知道体脂率？', description: '用体脂夹测量你的体脂率' },
    grecianToPose: { title: '评估健美造型', description: '上传照片评估你的造型表现' },
    poseToGrecian: { title: '计算理想围度', description: '了解古典黄金比例的理想身材' },
    skinfoldToFatLossDiet: { title: '制定减脂饮食计划', description: '碳水递减策略，科学减脂不反弹' },
    bmrToFatLossDiet: { title: '制定减脂饮食计划', description: '碳水递减策略，适合普通人' },
    carbCyclingToFatLossDiet: { title: '尝试碳水递减方案', description: '更简单的线性减脂策略，适合新手' },
    fatLossDietToCarbCycling: { title: '尝试碳循环方案', description: '高低碳日交替，适合有训练基础者' },
    skinfoldToHighCarbDiet: { title: '制定高碳减脂计划', description: '高碳水低脂肪策略，适合训练量大者' },
    bmrToHighCarbDiet: { title: '制定高碳减脂计划', description: '高碳水低脂肪，保持训练表现' },
    highCarbDietToCarbCycling: { title: '尝试碳循环方案', description: '高低碳日交替，更灵活的减脂策略' },
    toMetabolicDamageTest: { title: '检测代谢受损程度', description: '评估是否存在代谢适应，获取恢复方案' },
    metabolicDamageToReverseDiet: { title: '制定恢复饮食计划', description: '高碳水策略帮助恢复代谢' },
  },
};
