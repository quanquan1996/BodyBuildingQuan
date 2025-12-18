// i18n 配置和工具函数

import { zh } from './zh';
import { en } from './en';
import { type Dictionary, type Locale, locales, defaultLocale } from './types';

export { locales, defaultLocale };
export type { Locale, Dictionary };

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
  // 替换路径中的语言前缀
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
