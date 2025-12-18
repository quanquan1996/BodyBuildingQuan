// 页脚 - 中文

export interface FooterDict {
  description: string;
  bodyAssessment: string;
  dietCalculation: string;
  contact: string;
  contactLabel: string;
  hotTools: string;
  copyright: string;
  slogan: string;
  hotKeywords: string[];
}

export const footer: FooterDict = {
  description: '免费在线健身工具平台，提供FFMI计算、健美造型评分等专业工具，帮助健身爱好者科学评估训练效果。',
  bodyAssessment: '身体评估',
  dietCalculation: '饮食计算',
  contact: '联系我们',
  contactLabel: '合作/广告咨询：',
  hotTools: '热门工具',
  copyright: '© 2024 轻核健身AI工具站. 保留所有权利。',
  slogan: '🏋️ 科学健身，健康生活',
  hotKeywords: [
    'FFMI计算器',
    '体脂率计算',
    '肌肉量评估',
    '健美造型评分',
    '基础代谢计算',
    '心率区间',
    '碳循环减脂',
    '古典比例',
  ],
};
