// 中文翻译 - 模块索引
// 已迁移的模块从这里导出
// 用于 AI 编程时按需读取小文件，而非读取完整的 zh.ts

// === 已迁移模块 ===

// 通用文本
export { common, type CommonDict, type ToolLinksDict } from './common';

// 导航
export { nav, type NavDict } from './nav';

// 首页相关
export { home, whyChooseUs, useCases, type HomeDict, type WhyChooseUsDict, type UseCasesDict } from './home';

// 页脚
export { footer, type FooterDict } from './footer';

// FFMI 计算器
export { ffmiCalculator, type FFMICalculatorDict, type FFMIReferenceDict } from './ffmi';

// 体脂夹计算器
export {
  skinfoldCalculator,
  type SkinfoldCalculatorDict,
  type SkinfoldExplanationDict,
  type SkinfoldReferenceDict,
} from './skinfold';

// BMR 代谢计算器
export {
  bmrCalculator,
  type BMRCalculatorDict,
  type BMRExplanationDict,
  type BMRReferenceDict,
} from './bmr';

// 心率区间计算器
export {
  heartRateCalculator,
  type HeartRateCalculatorDict,
  type HeartRateExplanationDict,
} from './heart-rate';

// 健美造型评分器
export { poseComparator, type PoseComparatorDict } from './pose-comparator';

// 古典比例计算器
export {
  grecianCalculator,
  type GrecianCalculatorDict,
  type GrecianExplanationDict,
  type GrecianReferenceDict,
} from './grecian';

// 碳循环计算器
export {
  carbCyclingCalculator,
  type CarbCyclingCalculatorDict,
  type CarbCyclingExplanationDict,
  type CarbCyclingReferenceDict,
} from './carb-cycling';

// 减脂饮食计算器
export {
  fatLossDietCalculator,
  type FatLossDietCalculatorDict,
  type FatLossDietExplanationDict,
  type FatLossDietReferenceDict,
} from './fat-loss-diet';

// 高碳减脂计算器
export {
  highCarbDietCalculator,
  type HighCarbDietCalculatorDict,
  type HighCarbDietExplanationDict,
  type HighCarbDietReferenceDict,
} from './high-carb-diet';

// 代谢受损检测
export {
  metabolicDamageTest,
  type MetabolicDamageTestDict,
  type MetabolicDamageExplanationDict,
  type MetabolicDamageReferenceDict,
} from './metabolic-damage';

// === 使用说明 ===
// 
// AI 编程时，直接导入需要的模块：
//   import { ffmiCalculator } from '@/lib/i18n/locales/zh';
//
// 或读取单个文件：
//   读取 locales/zh/ffmi.ts
//
// 未迁移的模块请从主文件 zh.ts 中查找
