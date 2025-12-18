// 首页 - 中文

export interface HomeDict {
  heroTitle: string;
  heroDescription: string;
  heroSubtitle: string;
  ctaButton: string;
  secondaryCta: string;
  featuresTitle: string;
  whyTitle: string;
  whySubtitle: string;
  useCasesTitle: string;
  useCasesSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutGoalTitle: string;
  aboutGoalDescription: string;
  aboutPhilosophyTitle: string;
  aboutPhilosophyDescription: string;
  stats: {
    users: string;
    usersLabel: string;
    tools: string;
    toolsLabel: string;
  };
}

export interface WhyChooseUsDict {
  free: { title: string; description: string };
  ai: { title: string; description: string };
  scientific: { title: string; description: string };
  privacy: { title: string; description: string };
}

export interface UseCasesDict {
  beginner: { title: string; description: string; keywords: string[] };
  muscle: { title: string; description: string; keywords: string[] };
  fatLoss: { title: string; description: string; keywords: string[] };
  bodybuilding: { title: string; description: string; keywords: string[] };
}

export const home: HomeDict = {
  heroTitle: '轻核健身AI工具站',
  heroDescription: '免费在线健身工具，科学评估你的训练效果',
  heroSubtitle: 'FFMI计算 · 体脂率分析 · 健美造型评分 · 肌肉量评估',
  ctaButton: '开始使用',
  secondaryCta: '减脂饮食计算',
  featuresTitle: '热门健身工具',
  whyTitle: '为什么选择我们？',
  whySubtitle: '专业、免费、安全的健身数据分析平台',
  useCasesTitle: '适用人群与场景',
  useCasesSubtitle: '无论你是健身新手还是专业运动员，我们的工具都能帮助你更好地了解自己的身体',
  aboutTitle: '关于轻核健身AI工具站',
  aboutDescription: '轻核健身AI工具站是一个免费的在线健身计算器平台，为健身爱好者、健美运动员、私人教练提供专业的身体成分分析和训练评估工具。无需下载APP，打开网页即可使用。',
  aboutGoalTitle: '我们的目标',
  aboutGoalDescription: '让每一位健身爱好者都能获得专业级的数据分析工具，用科学的方法评估训练效果，制定合理的健身计划。',
  aboutPhilosophyTitle: '核心理念',
  aboutPhilosophyDescription: '数据驱动健身，科学指导训练。通过量化指标帮助你了解身体状况，避免盲目训练，提高健身效率。',
  stats: {
    users: '10,000+',
    usersLabel: '用户使用',
    tools: '10+',
    toolsLabel: '专业工具',
  },
};

export const whyChooseUs: WhyChooseUsDict = {
  free: { title: '完全免费', description: '永久免费，无需注册付费' },
  ai: { title: 'AI驱动', description: '先进AI技术，精准分析' },
  scientific: { title: '科学专业', description: '基于运动科学研究' },
  privacy: { title: '隐私安全', description: '数据本地处理，不上传' },
};

export const useCases: UseCasesDict = {
  beginner: {
    title: '健身新手',
    description: '了解自己的身体数据，制定科学的入门计划',
    keywords: ['健身入门', '新手计划', '基础知识'],
  },
  muscle: {
    title: '增肌人群',
    description: '追踪肌肉量变化，评估增肌效果',
    keywords: ['增肌计划', 'FFMI评估', '蛋白质摄入'],
  },
  fatLoss: {
    title: '减脂人群',
    description: '监控体脂变化，科学减脂不反弹',
    keywords: ['体脂率计算', '热量消耗', '有氧运动'],
  },
  bodybuilding: {
    title: '健美爱好者',
    description: 'AI评分系统帮助优化比赛造型',
    keywords: ['健美造型', 'AI评分', '比赛准备'],
  },
};
