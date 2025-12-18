# Implementation Plan

## Phase 1: 基础设施搭建

- [x] 1. 创建 i18n 核心配置和类型定义
  - [x] 1.1 创建 `src/lib/i18n/types.ts` 定义完整的翻译字典类型
    - 定义 Dictionary 接口，包含 common、nav、home、footer、whyChooseUs、useCases
    - 定义各工具页面的字典接口（FFMICalculatorDict 等）
    - _Requirements: 3.3, 3.4_
  - [x] 1.2 创建 `src/lib/i18n/index.ts` 配置文件
    - 导出 locales 数组 `['en', 'zh']`
    - 导出 defaultLocale 为 `'en'`
    - 实现 getDictionary 函数
    - 实现 getTranslation 辅助函数（带回退和警告）
    - _Requirements: 3.1, 3.4, 3.5_

- [x] 2. 创建英文翻译字典
  - [x] 2.1 创建 `src/lib/i18n/en.ts` 基础翻译
    - 翻译 common（站点名称、通用文本）
    - 翻译 nav（导航菜单分类）
    - 翻译 footer（页脚内容）
    - _Requirements: 5.3_
  - [x] 2.2 扩展 `src/lib/i18n/zh.ts` 补充缺失文本
    - 添加 nav 导航分类文本
    - 添加 whyChooseUs 板块文本
    - 添加 useCases 板块文本
    - 添加 footer 完整文本
    - _Requirements: 3.2_

- [x] 3. 创建 Middleware 语言检测
  - [x] 3.1 创建 `src/middleware.ts`
    - 实现路径语言前缀检测
    - 实现 IP 地理位置检测（CloudFront/Cloudflare/Vercel headers）
    - 实现 Accept-Language 解析
    - 实现重定向逻辑
    - 配置 matcher 排除静态资源
    - _Requirements: 1.3, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

## Phase 2: 路由结构重构

- [x] 4. 重构 App Router 目录结构
  - [x] 4.1 创建 `src/app/[locale]/layout.tsx`
    - 实现 generateStaticParams 生成语言参数
    - 验证 locale 参数有效性
    - 获取对应语言字典
    - 传递 locale 和 dict 给子组件
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 4.2 迁移首页到 `src/app/[locale]/page.tsx`
    - 从原 `src/app/page.tsx` 迁移内容
    - 更新组件调用，传入翻译参数
    - 更新 metadata 生成逻辑
    - _Requirements: 1.1, 1.2_
  - [x] 4.3 更新根 `src/app/layout.tsx`
    - 保留 html/body 结构
    - 移除 SiteHeader/Footer（移到 [locale]/layout.tsx）
    - _Requirements: 1.4_

## Phase 3: 布局组件国际化

- [x] 5. 改造导航组件
  - [x] 5.1 更新 `src/components/layout/site-header.tsx`
    - 添加 locale 和 dict 参数
    - 替换硬编码的导航分类文本
    - 替换 Logo 文字（轻核/MT）
    - 更新所有链接添加语言前缀
    - _Requirements: 2.5, 3.2_
  - [x] 5.2 更新 `src/components/layout/mobile-nav.tsx`
    - 添加 locale 和 dict 参数
    - 替换硬编码的菜单文本
    - 更新链接添加语言前缀
    - _Requirements: 3.2_
  - [x] 5.3 创建 `src/components/layout/language-switcher.tsx`
    - 实现语言切换按钮
    - 显示当前语言标识
    - 点击切换到另一语言版本
    - 保持当前页面路径
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 5.4 更新 `src/components/layout/footer.tsx`
    - 添加 locale 和 dict 参数
    - 替换所有硬编码中文文本
    - 更新链接添加语言前缀
    - _Requirements: 3.2, 5.3_

## Phase 4: 首页组件国际化

- [x] 6. 改造首页组件
  - [x] 6.1 更新 `src/components/home/hero-section.tsx`
    - 添加 dict 参数
    - 替换硬编码的统计数字文本（用户使用、专业工具）
    - 替换次要 CTA 按钮文本
    - _Requirements: 3.2, 5.2_
  - [x] 6.2 更新 `src/components/home/why-choose-us.tsx`
    - 添加 dict 参数
    - 替换标题和副标题
    - 替换四个特性卡片的标题和描述
    - _Requirements: 3.2, 5.2_
  - [x] 6.3 更新 `src/components/home/use-cases.tsx`
    - 添加 dict 参数
    - 替换标题和副标题
    - 替换四个人群卡片的内容和关键词
    - _Requirements: 3.2, 5.2_
  - [x] 6.4 更新 `src/components/home/feature-grid.tsx`
    - 添加 locale 参数
    - 更新工具链接添加语言前缀
    - _Requirements: 1.4_

## Phase 5: 工具页面国际化 - FFMI 计算器（示例）

- [x] 7. 改造 FFMI 计算器页面
  - [x] 7.1 添加 FFMI 计算器英文翻译到 `en.ts`
    - 翻译表单标签、按钮、验证消息
    - 翻译结果展示文本
    - 翻译说明和参考信息
    - _Requirements: 5.1, 5.4, 5.5_
  - [x] 7.2 迁移 FFMI 页面到 `src/app/[locale]/tools/ffmi-calculator/`
    - 创建 layout.tsx 导出多语言 metadata
    - 迁移 page.tsx 并添加翻译参数
    - _Requirements: 1.1, 1.2, 4.3_
  - [ ] 7.3 更新 `src/components/ffmi-calculator/ffmi-form.tsx`
    - 添加 dict 参数
    - 替换所有硬编码文本
    - _Requirements: 3.2, 5.4_
  - [ ] 7.4 更新 `src/components/ffmi-calculator/ffmi-result.tsx`
    - 添加 dict 参数
    - 替换结果标签和分类名称
    - _Requirements: 3.2, 5.1_
  - [ ] 7.5 更新 `src/components/ffmi-calculator/ffmi-explanation.tsx`
    - 添加 dict 参数
    - 替换所有说明文本
    - _Requirements: 3.2, 5.5_

## Phase 6: 其他工具页面国际化

- [x] 8. 改造体脂夹计算器
  - [x] 8.1 添加体脂夹计算器英文翻译
  - [x] 8.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 9. 改造代谢计算器
  - [x] 9.1 添加代谢计算器英文翻译
  - [x] 9.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 10. 改造心率区间计算器
  - [x] 10.1 添加心率区间计算器英文翻译
  - [x] 10.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 11. 改造健美造型评分器
  - [x] 11.1 添加健美造型评分器英文翻译
  - [x] 11.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 12. 改造古典比例计算器
  - [x] 12.1 添加古典比例计算器英文翻译
  - [x] 12.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 13. 改造碳循环计算器
  - [x] 13.1 添加碳循环计算器英文翻译
  - [x] 13.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 14. 改造减脂饮食计算器
  - [x] 14.1 添加减脂饮食计算器英文翻译
  - [x] 14.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 15. 改造高碳减脂计算器
  - [x] 15.1 添加高碳减脂计算器英文翻译
  - [x] 15.2 迁移页面并更新组件
    - _Requirements: 5.1_

- [x] 16. 改造代谢受损检测

  - [x] 16.1 添加代谢受损检测英文翻译
  - [x] 16.2 迁移页面并更新组件
    - _Requirements: 5.1_

## Phase 7: SEO 多语言优化

- [x] 17. 更新 SEO 配置
  - [x] 17.1 更新 `src/app/sitemap.ts` 生成多语言 sitemap
    - 为每个语言版本生成 URL
    - 添加 alternates.languages 属性
    - _Requirements: 4.2_
  - [x] 17.2 更新各页面 metadata 添加 hreflang
    - 在 layout.tsx 中添加 alternates.languages
    - 设置 x-default 指向英文版
    - _Requirements: 4.1, 4.3_
  - [x] 17.3 更新 `src/lib/config/site.ts` 支持多语言
    - 添加多语言站点名称配置
    - 添加多语言描述配置
    - _Requirements: 4.4_

## Phase 8: 开发规范更新

- [x] 18. 更新开发规范文档
  - [x] 18.1 更新 `.kiro/steering/nextjs-tech.md`
    - 添加多语言开发规范章节
    - 定义翻译键命名约定
    - 添加新增页面多语言检查清单
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

## 待完成任务

以下任务需要后续完成，以实现各工具组件的完整多语言支持：

- [x] 更新各工具的 form.tsx 组件接收 dict 参数
- [x] 更新各工具的 result.tsx 组件接收 dict 参数  
- [x] 更新各工具的 explanation.tsx 组件接收 dict 参数
- [x] 更新各工具的 reference.tsx 组件接收 dict 参数

### 已完成的 reference.tsx 组件更新

- [x] ffmi-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] skinfold-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] bmr-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] grecian-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] carb-cycling-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] fat-loss-diet-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] high-carb-diet-reference.tsx - 添加 dict 参数，使用翻译文本
- [x] metabolic-damage-reference.tsx - 添加 dict 参数，使用翻译文本

### 已完成的 explanation.tsx 组件更新

- [x] high-carb-diet-explanation.tsx - 添加 dict 参数，使用翻译文本
- [x] metabolic-damage-explanation.tsx - 添加 dict 参数，使用翻译文本

### 类型定义更新

- [x] 在 types.ts 中添加了各工具的 ReferenceDict 类型定义
- [x] 在各 CalculatorDict 接口中添加了 reference 字段

### 翻译文件更新

- [x] 在 zh.ts 中添加了所有工具的 reference 翻译
- [x] 在 en.ts 中添加了所有工具的 reference 翻译

### 页面更新

- [x] 更新了所有 [locale] 路由下的工具页面，传递 dict 参数给 explanation 和 reference 组件
- [x] 更新了所有旧的 /tools/ 路由下的页面，添加 dict 参数支持
