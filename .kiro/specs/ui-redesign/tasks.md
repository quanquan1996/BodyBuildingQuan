# Implementation Plan

## Phase 1: 基础设施

- [x] 1. 创建主题配置和全局样式



  - [x] 1.1 创建主题配置文件

    - 在 `src/lib/config/theme.ts` 创建主题配置
    - 定义 `toolGradients` 对象，包含10个工具的渐变色配置
    - 定义 `colors` 对象，包含主色、背景色、文字色
    - 定义 `spacing` 和 `borderRadius` 常量
    - 导出 `ToolId` 类型和辅助函数 `getGradientStyle(toolId)`
    - _Requirements: 1.1, 3.1, 3.2, 4.4_


  - [x] 1.2 更新全局CSS样式

    - 更新 `globals.css` 中的 CSS 变量
    - 修改 `--primary` 为健康绿 #4CAF50
    - 修改 `--background` 为浅灰 #F5F7FA
    - 添加新的圆角变量 `--radius-xl`, `--radius-2xl`
    - 添加渐变图标、区块卡片等通用样式类
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3_

## Phase 2: 核心UI组件

- [x] 2. 创建新UI组件



  - [x] 2.1 创建 GradientIcon 组件

    - 在 `src/components/ui/gradient-icon.tsx` 创建组件
    - 接收 `toolId` 和 `icon` 属性
    - 支持 `sm`(48px), `md`(56px), `lg`(64px) 三种尺寸
    - 使用 `toolGradients` 配置渲染渐变背景
    - 图标使用白色，居中显示
    - 添加 20px 圆角和轻微阴影
    - _Requirements: 1.1, 1.2, 1.3, 1.4_


  - [x] 2.2 创建 SectionCard 组件

    - 在 `src/components/ui/section-card.tsx` 创建组件
    - 接收 `title`, `icon`, `iconColor`, `bgColor` 属性
    - 左上角显示胶囊形状标题（图标+文字）
    - 标题背景使用对应颜色的10%透明度
    - 卡片使用白色背景、16px圆角、浅阴影
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 2.3 创建 DataCard 组件


    - 在 `src/components/ui/data-card.tsx` 创建组件
    - 支持 1-2 列布局
    - 每项包含：小标题(12px) + 大数字(32px) + 单位(14px)
    - 支持问号帮助图标，点击显示说明
    - 支持自定义背景色区分不同数据
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_


  - [x] 2.4 创建 GradientProgress 组件

    - 在 `src/components/ui/gradient-progress.tsx` 创建组件
    - 接收 `value`, `gradientFrom`, `gradientTo` 属性
    - 使用 8px 高度、999px 圆角
    - 支持显示百分比标签
    - _Requirements: 10.1, 10.2, 10.3_

## Phase 3: 更新现有组件

- [x] 3. 更新基础UI组件样式



  - [x] 3.1 更新 Card 组件

    - 修改 `src/components/ui/card.tsx`
    - 更新圆角为 16px (`rounded-2xl`)
    - 移除边框，使用浅阴影
    - 调整内边距为 20px
    - _Requirements: 4.1_

  - [x] 3.2 更新 Button 组件


    - 修改 `src/components/ui/button.tsx`
    - 更新默认圆角为 12px
    - 添加 `gradient` variant，使用主色渐变背景
    - _Requirements: 4.2_


  - [x] 3.3 更新 Input 组件

    - 修改 `src/components/ui/input.tsx`
    - 更新为浅灰背景 (#F3F4F6)、无边框
    - 更新圆角为 12px
    - 聚焦时显示主色边框
    - _Requirements: 4.3, 7.2, 7.3_

## Phase 4: 布局组件更新

- [x] 4. 更新导航和布局组件



  - [x] 4.1 更新 SiteHeader 组件

    - 修改 `src/components/layout/site-header.tsx`
    - 更新背景为白色 + 毛玻璃效果
    - Logo 使用主色（健康绿）
    - 高度调整为 56px
    - _Requirements: 8.1, 8.2, 8.3_


  - [x] 4.2 更新 MobileNav 组件

    - 修改 `src/components/layout/mobile-nav.tsx`
    - 侧边栏使用 20px 圆角
    - 工具列表使用 GradientIcon 组件
    - 添加渐变色图标展示
    - _Requirements: 8.4, 8.5_


  - [x] 4.3 重写 FeatureGrid 组件

    - 修改 `src/components/home/feature-grid.tsx`
    - 移动端：横向滚动布局，每行5个工具图标
    - 使用 GradientIcon 组件显示工具图标
    - 工具名称使用 12px 字号，最多2行
    - 桌面端：2列网格，包含图标、标题、描述
    - 添加悬停上浮效果
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

## Phase 5: 首页更新

- [x] 5. 更新首页



  - [x] 5.1 更新 HeroSection 组件

    - 修改 `src/components/home/hero-section.tsx`
    - 添加主色调渐变背景装饰
    - 调整标题和副标题样式
    - _Requirements: 2.4_

  - [x] 5.2 更新首页整体布局


    - 修改 `src/app/page.tsx`
    - 更新背景色为浅灰
    - 调整各区块间距
    - _Requirements: 3.2_

## Phase 6: 工具页面模板更新

- [x] 6. 更新工具页面模板



  - [x] 6.1 创建工具页面 Hero 组件

    - 创建 `src/components/common/tool-hero.tsx`
    - 显示工具名称和对应的渐变色大图标(64px)
    - 显示工具简短描述
    - _Requirements: 9.1_

  - [x] 6.2 更新 FFMI 计算器页面（作为模板）


    - 修改 `src/app/tools/ffmi-calculator/page.tsx`
    - 使用 ToolHero 组件
    - 使用 SectionCard 包裹表单区域
    - 使用 DataCard 展示计算结果
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 6.3 更新 FFMI 表单组件


    - 修改 `src/components/ffmi-calculator/ffmi-form.tsx`
    - 使用 SectionCard 组件，标题为"基本信息"
    - 更新输入框为新样式
    - 分栏布局显示相关输入项
    - _Requirements: 7.1, 7.4, 7.5_

  - [x] 6.4 更新 FFMI 结果组件


    - 修改 `src/components/ffmi-calculator/ffmi-result.tsx`
    - 使用 SectionCard 组件，标题为"计算结果"
    - 使用 DataCard 展示 FFMI 值、瘦体重等数据
    - 添加 GradientProgress 显示等级进度
    - _Requirements: 6.1, 6.2, 10.1, 10.2_

## Phase 7: 批量更新其他工具页面

- [x] 7. 更新其他工具页面


  - [x] 7.1 更新体脂夹计算器页面


    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_


  - [x] 7.2 更新代谢计算器页面

    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 7.3 更新心率区间计算器页面


    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 7.4 更新健美造型评分器页面


    - 应用新的 SectionCard、DataCard 组件
    - 更新上传区域和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_


  - [x] 7.5 更新古典比例计算器页面

    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_


  - [x] 7.6 更新碳循环计算器页面

    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_

  - [x] 7.7 更新减脂饮食计算器页面


    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_


  - [x] 7.8 更新高碳减脂计算器页面

    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_


  - [x] 7.9 更新代谢受损检测器页面

    - 应用新的 SectionCard、DataCard 组件
    - 更新表单和结果展示样式
    - _Requirements: 9.2, 9.3, 9.4_

## Phase 8: 相关工具推荐

- [x] 8. 添加相关工具推荐组件



  - [x] 8.1 创建 RelatedTools 组件


    - 创建 `src/components/common/related-tools.tsx`
    - 横向滚动展示相关工具
    - 使用 GradientIcon 和工具名称
    - _Requirements: 9.5_


  - [x] 8.2 在各工具页面添加相关推荐

    - 在结果区域下方添加 RelatedTools 组件
    - 根据工具联动关系配置推荐列表
    - _Requirements: 9.5_
