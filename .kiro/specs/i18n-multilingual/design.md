# Design Document: 多语言国际化 (i18n)

## Overview

本设计文档描述了为轻核健身AI工具站实现中英文多语言支持的技术方案。采用 Next.js 15 App Router 的动态路由段 `[locale]` 实现国际化路由，结合 Middleware 进行语言检测和重定向，使用类型安全的翻译字典管理多语言文本。

## Architecture

### 整体架构图

```mermaid
graph TB
    subgraph "用户请求"
        A[用户访问 URL] --> B[Next.js Middleware]
    end
    
    subgraph "语言检测层"
        B --> C{检测语言}
        C -->|IP检测| D[CloudFront/Cloudflare Header]
        C -->|浏览器| E[Accept-Language]
        C -->|默认| F[English]
    end
    
    subgraph "路由层"
        D --> G{中国IP?}
        G -->|是| H[重定向 /zh/...]
        G -->|否| I[检查浏览器语言]
        E --> I
        I -->|中文| H
        I -->|其他| J[重定向 /en/...]
        F --> J
    end
    
    subgraph "App Router"
        H --> K[/[locale]/page.tsx]
        J --> K
        K --> L[Layout with locale]
        L --> M[Page Components]
    end
    
    subgraph "翻译系统"
        M --> N[useTranslation Hook]
        N --> O[Translation Dictionary]
        O --> P[zh.ts]
        O --> Q[en.ts]
    end
```

### 目录结构变更

```
nextjs-app/src/
├── app/
│   ├── [locale]/                    # 新增：动态语言路由段
│   │   ├── layout.tsx               # 带语言参数的根布局
│   │   ├── page.tsx                 # 首页（从原 app/page.tsx 迁移）
│   │   └── tools/
│   │       ├── ffmi-calculator/
│   │       │   ├── layout.tsx       # 工具页 metadata
│   │       │   └── page.tsx
│   │       └── ...                  # 其他工具页面
│   ├── layout.tsx                   # 根布局（仅 html/body）
│   ├── sitemap.ts                   # 多语言 sitemap
│   └── robots.ts
├── lib/
│   ├── i18n/
│   │   ├── index.ts                 # i18n 配置和工具函数
│   │   ├── zh.ts                    # 中文翻译（扩展）
│   │   ├── en.ts                    # 新增：英文翻译
│   │   └── types.ts                 # 翻译类型定义
│   └── config/
│       └── site.ts                  # 多语言站点配置
├── components/
│   ├── layout/
│   │   ├── site-header.tsx          # 更新：支持多语言
│   │   ├── footer.tsx               # 更新：支持多语言
│   │   └── language-switcher.tsx    # 新增：语言切换组件
│   └── ...
└── middleware.ts                    # 新增：语言检测中间件
```

## Components and Interfaces

### 1. i18n 配置模块 (`src/lib/i18n/index.ts`)

```typescript
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// 获取翻译字典
export function getDictionary(locale: Locale) {
  return locale === 'zh' ? zh : en;
}

// 类型安全的翻译访问
export type Dictionary = typeof zh;
```

### 2. Middleware (`src/middleware.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 检查路径是否已包含语言前缀
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // 语言检测优先级：IP > Accept-Language > 默认
  const locale = detectLocale(request);
  
  // 重定向到带语言前缀的路径
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

function detectLocale(request: NextRequest): Locale {
  // 1. IP 地理位置检测
  const country = 
    request.headers.get('CloudFront-Viewer-Country') ||
    request.headers.get('CF-IPCountry') ||
    request.headers.get('x-vercel-ip-country');
  
  if (country === 'CN') return 'zh';
  
  // 2. 浏览器语言偏好
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage?.includes('zh')) return 'zh';
  
  // 3. 默认英文
  return defaultLocale;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
```

### 3. 语言切换组件 (`src/components/layout/language-switcher.tsx`)

```typescript
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale, locales } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const switchLocale = (newLocale: Locale) => {
    // 替换路径中的语言前缀
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };
  
  return (
    <button onClick={() => switchLocale(currentLocale === 'zh' ? 'en' : 'zh')}>
      {currentLocale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
```

### 4. 动态路由布局 (`src/app/[locale]/layout.tsx`)

```typescript
import { Locale, getDictionary } from '@/lib/i18n';
import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/layout/footer';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
```

## Data Models

### 翻译字典结构 (`src/lib/i18n/types.ts`)

```typescript
export interface Dictionary {
  // 通用
  common: {
    siteName: string;
    siteNameShort: string;  // Logo 短名称：轻核 / MT
    home: string;
    tools: string;
    loading: string;
    error: string;
    retry: string;
  };
  
  // 导航
  nav: {
    home: string;
    bodyAssessment: string;
    dietCalculation: string;
    aiTools: string;
    trainingAssist: string;
  };
  
  // 首页
  home: {
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
    stats: {
      users: string;
      tools: string;
    };
  };
  
  // 为什么选择我们
  whyChooseUs: {
    free: { title: string; description: string };
    ai: { title: string; description: string };
    scientific: { title: string; description: string };
    privacy: { title: string; description: string };
  };
  
  // 适用人群
  useCases: {
    beginner: { title: string; description: string; keywords: string[] };
    muscle: { title: string; description: string; keywords: string[] };
    fatLoss: { title: string; description: string; keywords: string[] };
    bodybuilding: { title: string; description: string; keywords: string[] };
  };
  
  // 页脚
  footer: {
    description: string;
    bodyAssessment: string;
    dietCalculation: string;
    contact: string;
    contactEmail: string;
    hotTools: string;
    copyright: string;
    slogan: string;
  };
  
  // 各工具页面
  ffmiCalculator: FFMICalculatorDict;
  skinfoldCalculator: SkinfoldCalculatorDict;
  bmrCalculator: BMRCalculatorDict;
  // ... 其他工具
}

// 工具页面字典示例
interface FFMICalculatorDict {
  title: string;
  description: string;
  metaDescription: string;
  form: {
    basicInfo: string;
    height: string;
    weight: string;
    bodyFat: string;
    gender: string;
    male: string;
    female: string;
    calculate: string;
    bodyFatHint: string;
  };
  result: {
    title: string;
    adjustedFfmi: string;
    ffmiRaw: string;
    leanMass: string;
    fatMass: string;
    muscleMass: string;
    bodyComposition: string;
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
  };
  validation: {
    heightRange: string;
    weightRange: string;
    bodyFatRange: string;
  };
}
```

## Error Handling

### 语言回退机制

```typescript
// src/lib/i18n/index.ts
export function getTranslation<T>(
  dict: Dictionary,
  path: string,
  fallback?: T
): T {
  const keys = path.split('.');
  let result: any = dict;
  
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation: ${path}`);
      }
      return fallback as T;
    }
  }
  
  return result as T;
}
```

### 无效语言处理

```typescript
// src/app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/lib/i18n';

export default async function LocaleLayout({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  
  // 验证语言参数
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  
  // ...
}
```

## Testing Strategy

### 单元测试

1. **翻译字典完整性测试**
   - 验证 `en.ts` 和 `zh.ts` 具有相同的键结构
   - 检测缺失的翻译键

2. **语言检测测试**
   - 测试 IP 检测逻辑（CN 返回 zh）
   - 测试 Accept-Language 解析
   - 测试默认语言回退

### 集成测试

1. **路由测试**
   - 验证 `/zh/tools/ffmi-calculator` 返回中文页面
   - 验证 `/en/tools/ffmi-calculator` 返回英文页面
   - 验证无语言前缀路径正确重定向

2. **SEO 测试**
   - 验证 hreflang 标签正确生成
   - 验证 sitemap 包含所有语言版本 URL
   - 验证 canonical URL 正确设置

## SEO 多语言实现

### hreflang 标签

```typescript
// src/app/[locale]/layout.tsx
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;
  
  return {
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'zh': `${siteConfig.url}/zh`,
        'en': `${siteConfig.url}/en`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
  };
}
```

### 多语言 Sitemap

```typescript
// src/app/sitemap.ts
import { locales } from '@/lib/i18n';

export default function sitemap() {
  const tools = [
    'ffmi-calculator',
    'skinfold-calculator',
    // ...
  ];
  
  const urls = [];
  
  for (const locale of locales) {
    // 首页
    urls.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${siteConfig.url}/zh`,
          en: `${siteConfig.url}/en`,
        },
      },
    });
    
    // 工具页面
    for (const tool of tools) {
      urls.push({
        url: `${siteConfig.url}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            zh: `${siteConfig.url}/zh/tools/${tool}`,
            en: `${siteConfig.url}/en/tools/${tool}`,
          },
        },
      });
    }
  }
  
  return urls;
}
```

## 组件改造示例

### 改造前（硬编码）

```tsx
// site-header.tsx
<span className="text-white font-bold text-xs">轻核</span>
<span>健身<span className="text-primary">AI</span>工具站</span>
```

### 改造后（使用翻译）

```tsx
// site-header.tsx
interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  return (
    <Link href={`/${locale}`}>
      <span className="text-white font-bold text-xs">
        {dict.common.siteNameShort}
      </span>
      <span>{dict.common.siteName}</span>
    </Link>
  );
}
```

## 迁移策略

### 阶段 1：基础设施
1. 创建 middleware.ts
2. 创建 i18n 配置和类型
3. 创建 en.ts 翻译文件
4. 重构目录结构（添加 [locale] 动态段）

### 阶段 2：布局组件
1. 改造 site-header.tsx
2. 改造 footer.tsx
3. 改造 mobile-nav.tsx
4. 添加 language-switcher.tsx

### 阶段 3：首页
1. 改造 hero-section.tsx
2. 改造 why-choose-us.tsx
3. 改造 use-cases.tsx
4. 改造 feature-grid.tsx

### 阶段 4：工具页面（逐个迁移）
1. FFMI 计算器
2. 体脂夹计算器
3. 代谢计算器
4. ... 其他工具

### 阶段 5：SEO 优化
1. 更新 sitemap.ts
2. 添加 hreflang 标签
3. 更新各页面 metadata
