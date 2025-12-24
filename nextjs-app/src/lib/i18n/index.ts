// i18n 配置和工具函数
// 从模块化文件组装 Dictionary

import {
  common as zhCommon,
  nav as zhNav,
  home as zhHome,
  whyChooseUs as zhWhyChooseUs,
  useCases as zhUseCases,
  footer as zhFooter,
  ffmiCalculator as zhFfmiCalculator,
  skinfoldCalculator as zhSkinfoldCalculator,
  bmrCalculator as zhBmrCalculator,
  heartRateCalculator as zhHeartRateCalculator,
  poseComparator as zhPoseComparator,
  grecianCalculator as zhGrecianCalculator,
  carbCyclingCalculator as zhCarbCyclingCalculator,
  fatLossDietCalculator as zhFatLossDietCalculator,
  highCarbDietCalculator as zhHighCarbDietCalculator,
  metabolicDamageTest as zhMetabolicDamageTest,
  muscleAnatomy as zhMuscleAnatomy,
} from './locales/zh';

import {
  common as enCommon,
  nav as enNav,
  home as enHome,
  whyChooseUs as enWhyChooseUs,
  useCases as enUseCases,
  footer as enFooter,
  ffmiCalculator as enFfmiCalculator,
  skinfoldCalculator as enSkinfoldCalculator,
  bmrCalculator as enBmrCalculator,
  heartRateCalculator as enHeartRateCalculator,
  poseComparator as enPoseComparator,
  grecianCalculator as enGrecianCalculator,
  carbCyclingCalculator as enCarbCyclingCalculator,
  fatLossDietCalculator as enFatLossDietCalculator,
  highCarbDietCalculator as enHighCarbDietCalculator,
  metabolicDamageTest as enMetabolicDamageTest,
  muscleAnatomy as enMuscleAnatomy,
} from './locales/en';

import { type Dictionary, type Locale, locales, defaultLocale } from './types';

export { locales, defaultLocale };
export type { Locale, Dictionary };

// 从模块组装中文字典
const zh: Dictionary = {
  common: zhCommon,
  nav: zhNav,
  home: zhHome,
  whyChooseUs: zhWhyChooseUs,
  useCases: zhUseCases,
  footer: zhFooter,
  ffmiCalculator: zhFfmiCalculator,
  skinfoldCalculator: zhSkinfoldCalculator,
  bmrCalculator: zhBmrCalculator,
  heartRateCalculator: zhHeartRateCalculator,
  poseComparator: zhPoseComparator,
  grecianCalculator: zhGrecianCalculator,
  carbCyclingCalculator: zhCarbCyclingCalculator,
  fatLossDietCalculator: zhFatLossDietCalculator,
  highCarbDietCalculator: zhHighCarbDietCalculator,
  metabolicDamageTest: zhMetabolicDamageTest,
  muscleAnatomy: zhMuscleAnatomy,
};

// 从模块组装英文字典
const en: Dictionary = {
  common: enCommon,
  nav: enNav,
  home: enHome,
  whyChooseUs: enWhyChooseUs,
  useCases: enUseCases,
  footer: enFooter,
  ffmiCalculator: enFfmiCalculator,
  skinfoldCalculator: enSkinfoldCalculator,
  bmrCalculator: enBmrCalculator,
  heartRateCalculator: enHeartRateCalculator,
  poseComparator: enPoseComparator,
  grecianCalculator: enGrecianCalculator,
  carbCyclingCalculator: enCarbCyclingCalculator,
  fatLossDietCalculator: enFatLossDietCalculator,
  highCarbDietCalculator: enHighCarbDietCalculator,
  metabolicDamageTest: enMetabolicDamageTest,
  muscleAnatomy: enMuscleAnatomy,
};

// 获取翻译字典
export function getDictionary(locale: Locale): Dictionary {
  return locale === 'zh' ? zh : en;
}

// 验证 locale 是否有效
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// 获取翻译文本（带类型安全和回退）
export function getTranslation<T>(
  dict: Dictionary,
  path: string,
  fallback?: T
): T {
  const keys = path.split('.');
  let result: unknown = dict;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[i18n] Missing translation: ${path}`);
      }
      return fallback as T;
    }
  }

  return result as T;
}

// 获取当前路径的另一语言版本
export function getAlternateLocalePath(
  pathname: string,
  currentLocale: Locale,
  targetLocale: Locale
): string {
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
  return `/${targetLocale}${pathWithoutLocale || ''}`;
}

// 从路径中提取 locale
export function getLocaleFromPath(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}
