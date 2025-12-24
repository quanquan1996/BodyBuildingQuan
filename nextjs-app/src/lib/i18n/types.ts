// i18n 类型定义

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// 工具联动翻译
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

// 通用文本
export interface CommonDict {
  siteName: string;
  siteNameShort: string; // Logo 短名称：轻核 / LC
  siteSlogan: string;
  home: string;
  tools: string;
  menu: string;
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
  // 通用表单标签
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
  // 活动水平
  activityLevels: {
    sedentary: { label: string; description: string };
    light: { label: string; description: string };
    moderate: { label: string; description: string };
    active: { label: string; description: string };
    veryActive: { label: string; description: string };
  };
  // 提示文本
  advancedModeHint: string;
  measurementLocation: string;
  enterValue: string;
  // 测量模式描述
  maleThreePoint: string;
  femaleThreePoint: string;
  sevenPointDescription: string;
}

// 导航
export interface NavDict {
  home: string;
  bodyAssessment: string;
  muscleAnatomy3D: string;
  dietCalculation: string;
  aiTools: string;
  trainingAssist: string;
}

// 首页
export interface HomeDict {
  heroTitle: string;
  heroDescription: string;
  heroSubtitle: string;
  ctaButton: string;
  secondaryCta: string;
  tertiaryCta: string;
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


// 为什么选择我们
export interface WhyChooseUsDict {
  free: { title: string; description: string };
  ai: { title: string; description: string };
  scientific: { title: string; description: string };
  privacy: { title: string; description: string };
}

// 适用人群
export interface UseCasesDict {
  beginner: { title: string; description: string; keywords: string[] };
  muscle: { title: string; description: string; keywords: string[] };
  fatLoss: { title: string; description: string; keywords: string[] };
  bodybuilding: { title: string; description: string; keywords: string[] };
}

// 页脚
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

// FFMI 参考标准
export interface FFMIReferenceDict {
  title: string;
  headers: {
    range: string;
    maleRating: string;
    femaleRating: string;
  };
  rows: {
    range: string;
    rating: string;
    description: string;
  }[];
}

// FFMI 计算器
export interface FFMICalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    height: string;
    weight: string;
    bodyFat: string;
    bodyFatHint: string;
    gender: string;
    calculate: string;
  };
  result: {
    title: string;
    adjustedFfmi: string;
    ffmiRaw: string;
    leanMass: string;
    fatMass: string;
    muscleMass: string;
    bodyComposition: string;
    leanMassHelp: string;
    muscleHelp: string;
  };
  categories: {
    below_average: string;
    average: string;
    above_average: string;
    excellent: string;
    elite: string;
  };
  explanation: {
    title: string;
    whatIs: string;
    whatIsContent: string;
    advantages: string;
    advantagesList: string[];
    howToImprove: string;
    improvementList: string[];
    vsBmi: string;
    vsBmiContent: string;
    formula: string;
    formulaContent: string[];
  };
  reference: FFMIReferenceDict;
  validation: {
    heightRange: string;
    weightRange: string;
    bodyFatRange: string;
  };
}

// 体脂夹计算器说明
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

// 体脂夹参考标准
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

// BMR 代谢计算器说明
export interface BMRExplanationDict {
  title: string;
  whatIs: string;
  whatIsContent: string;
  mifflinFormula: {
    title: string;
    male: string;
    maleFormula: string;
    female: string;
    femaleFormula: string;
  };
  tdee: {
    title: string;
    description: string;
    levels: string[];
  };
  factors: {
    title: string;
    items: { name: string; description: string }[];
  };
  tips: {
    title: string;
    items: string[];
  };
}

// BMR 参考标准
export interface BMRReferenceDict {
  title: string;
  maleTitle: string;
  femaleTitle: string;
  ageRanges: {
    young: string;
    middle: string;
    senior: string;
  };
  maleValues: {
    young: string;
    middle: string;
    senior: string;
  };
  femaleValues: {
    young: string;
    middle: string;
    senior: string;
  };
  tip: {
    title: string;
    description: string;
  };
}

// 心率区间计算器说明
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

// 古典比例计算器说明
export interface GrecianExplanationDict {
  title: string;
  faq: {
    whatIs: {
      question: string;
      answer: string[];
    };
    goldenRatio: {
      question: string;
      answer: string;
      points: string[];
    };
    wristMethod: {
      question: string;
      answer: string[];
    };
    symmetry: {
      question: string;
      answer: string[];
    };
    limitations: {
      question: string;
      intro: string;
      points: string[];
    };
  };
}

// 古典比例参考标准
export interface GrecianReferenceDict {
  title: string;
  goldenRatio: {
    title: string;
    description: string;
  };
  steveReeves: {
    title: string;
    description: string;
    standards: string[];
  };
  measurementGuide: {
    title: string;
    items: string[];
  };
  wristImportance: {
    title: string;
    description: string;
  };
}

// 碳循环计算器说明
export interface CarbCyclingExplanationDict {
  title: string;
  whatIs: {
    title: string;
    content: string;
  };
  formula: {
    title: string;
    description: string;
    bmr: string;
    leanMass: string;
  };
  benefits: {
    title: string;
    items: string[];
  };
  suitableFor: {
    title: string;
    content: string;
  };
  warnings: {
    title: string;
    items: string[];
  };
}

// 碳循环参考指南
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
  executionTips: {
    title: string;
    items: string[];
  };
}

// 减脂饮食计算器说明
export interface FatLossDietExplanationDict {
  title: string;
  intro: string;
  advantages: {
    title: string;
    items: string[];
  };
  warnings: {
    title: string;
    items: string[];
  };
  reasons: {
    title: string;
    items: { number: string; title: string; description: string }[];
  };
  foodSuggestions: {
    title: string;
    categories: { name: string; foods: string }[];
  };
}

// 减脂饮食参考
export interface FatLossDietReferenceDict {
  title: string;
  principle: {
    title: string;
    description: string;
  };
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
  suitableFor: {
    title: string;
    description: string;
  };
}

// 高碳减脂计算器说明
export interface HighCarbDietExplanationDict {
  title: string;
  faq: {
    question: string;
    answer: string;
  }[];
}

// 高碳减脂参考
export interface HighCarbDietReferenceDict {
  title: string;
  whatIs: {
    title: string;
    description: string;
  };
  science: {
    title: string;
    tef: { title: string; items: string[] };
    leptin: { title: string; description: string };
    performance: { title: string; description: string };
  };
  dayTypes: {
    title: string;
    training: { title: string; items: string[] };
    rest: { title: string; items: string[] };
    refeed: { title: string; items: string[] };
  };
  suitableFor: {
    title: string;
    items: string[];
  };
  warnings: {
    title: string;
    items: string[];
  };
}

// 代谢受损检测说明
export interface MetabolicDamageExplanationDict {
  title: string;
  faq: {
    question: string;
    intro?: string;
    points?: string[];
    conclusion?: string;
  }[];
}

// 代谢受损参考
export interface MetabolicDamageReferenceDict {
  title: string;
  whatIs: {
    title: string;
    description: string;
  };
  symptoms: {
    title: string;
    items: { emoji: string; text: string }[];
  };
  levels: {
    title: string;
    normal: { title: string; description: string };
    mild: { title: string; description: string };
    moderate: { title: string; description: string };
    severe: { title: string; description: string };
  };
  factors: {
    title: string;
    items: string[];
  };
  recovery: {
    title: string;
    strategies: { title: string; description: string }[];
  };
}

// 体脂夹计算器
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
    // 测量点
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


// BMR 代谢计算器
export interface BMRCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
    activityLevel: string;
    bodyFat: string;
    bodyFatOptional: string;
    calculate: string;
    activityLevels: {
      sedentary: string;
      light: string;
      moderate: string;
      active: string;
      veryActive: string;
    };
  };
  result: {
    title: string;
    bmr: string;
    tdee: string;
    protein: string;
    macros: string;
  };
  explanation: BMRExplanationDict;
  reference: BMRReferenceDict;
}

// 心率区间计算器
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

// 健美造型评分器
export interface PoseComparatorDict {
  title: string;
  description: string;
  metaDescription: string;
  uploadReference: string;
  uploadUser: string;
  compare: string;
  result: string;
  noPoseDetected: string;
  uploadHint: string;
  scoring: {
    title: string;
    overall: string;
    symmetry: string;
    proportion: string;
    pose: string;
  };
  categories: {
    frontDouble: string;
    frontLat: string;
    sideChest: string;
    backDouble: string;
    backLat: string;
    abdominal: string;
    mostMuscular: string;
  };
  scoreRatings: {
    excellent: string;
    good: string;
    fair: string;
    needsWork: string;
  };
  angleRatings: {
    perfect: string;
    good: string;
    acceptable: string;
    needsAdjustment: string;
  };
  angleNames: {
    leftElbow: string;
    rightElbow: string;
    leftShoulder: string;
    rightShoulder: string;
    leftKnee: string;
    rightKnee: string;
  };
  angleDescriptions: {
    biceps: string;
    armRaise: string;
    legBend: string;
  };
  explanation: {
    title: string;
    aiDetection: {
      title: string;
      description: string;
    };
    angleComparison: {
      title: string;
      description: string;
      referenceLabel: string;
      userLabel: string;
    };
    scoringSystem: {
      title: string;
      description: string;
    };
    symmetryScore: {
      title: string;
      description: string;
    };
  };
  poseCategories: {
    title: string;
    keyPointsLabel: string;
    tipsLabel: string;
    poses: {
      frontDoubleBiceps: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      frontLatSpread: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      sideChest: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      backDoubleBiceps: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      backLatSpread: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      abdominalAndThigh: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
      mostMuscular: {
        name: string;
        keyPoints: string[];
        tips: string[];
      };
    };
  };
  limitations: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
    conclusion: string;
  };
}

// 古典比例计算器
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

// 碳循环计算器
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
    goals: {
      fatLoss: string;
      maintain: string;
      muscle: string;
    };
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


// 减脂饮食计算器
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

// 高碳减脂计算器
export interface HighCarbDietCalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    weight: string;
    bodyFat: string;
    activityLevel: string;
    trainingDays: string;
    calculate: string;
  };
  result: {
    title: string;
    trainingDay: string;
    restDay: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  explanation: HighCarbDietExplanationDict;
  reference: HighCarbDietReferenceDict;
}

// 代谢受损检测
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
    levels: {
      none: string;
      mild: string;
      moderate: string;
      severe: string;
    };
  };
  explanation: MetabolicDamageExplanationDict;
  reference: MetabolicDamageReferenceDict;
}

// 3D肌肉解剖
export interface MuscleAnatomyDict {
  title: string;
  description: string;
  metaDescription: string;
  controls: {
    frontView: string;
    backView: string;
    reset: string;
  };
  loading: string;
  webglError: string;
  clickToView: string;
  selectedMuscle: string;
  muscleGroups: {
    upper: string;
    torso: string;
    lower: string;
  };
  explanation: {
    title: string;
    whatIs: string;
    whatIsContent: string;
    benefits: string;
    benefitsList: string[];
    howToUse: string;
    howToUseList: string[];
  };
  // 肌肉名称翻译（动态键）
  muscles: Record<string, string>;
}

// 完整字典类型
export interface Dictionary {
  common: CommonDict;
  nav: NavDict;
  home: HomeDict;
  whyChooseUs: WhyChooseUsDict;
  useCases: UseCasesDict;
  footer: FooterDict;
  ffmiCalculator: FFMICalculatorDict;
  skinfoldCalculator: SkinfoldCalculatorDict;
  bmrCalculator: BMRCalculatorDict;
  heartRateCalculator: HeartRateCalculatorDict;
  poseComparator: PoseComparatorDict;
  grecianCalculator: GrecianCalculatorDict;
  carbCyclingCalculator: CarbCyclingCalculatorDict;
  fatLossDietCalculator: FatLossDietCalculatorDict;
  highCarbDietCalculator: HighCarbDietCalculatorDict;
  metabolicDamageTest: MetabolicDamageTestDict;
  muscleAnatomy: MuscleAnatomyDict;
}
