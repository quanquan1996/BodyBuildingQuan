# Implementation Plan

- [x] 1. 创建碳循环计算逻辑模块


  - [x] 1.1 创建 `src/lib/utils/carb-cycling.ts` 文件


    - 定义 `CarbCyclingMode`、`CarbCyclingInput`、`DayPlan`、`CarbCyclingOutput` 类型接口
    - 实现 Katch-McArdle 公式计算 BMR 和瘦体重
    - 实现 TDEE 计算（复用现有活动系数）
    - 实现简易版碳循环计算（高碳100%、低碳80%）
    - 实现进阶版碳循环计算（高碳110%、中碳100%、低碳80%）
    - 实现宏量营养素分配逻辑（蛋白质2.0-2.2g/kg，碳水按比例，脂肪补足）
    - 实现输入验证函数
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3_

- [x] 2. 创建表单组件


  - [x] 2.1 创建 `src/components/carb-cycling-calculator/carb-cycling-form.tsx`


    - 实现模式切换（简易版/进阶版）
    - 实现体重输入字段（30-300 kg）
    - 实现体脂率输入字段（3-60%）
    - 实现活动水平选择器（复用 `activityLevelLabels`）
    - 实现表单验证和错误提示
    - 实现计算按钮和提交逻辑
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_


- [x] 3. 创建结果展示组件

  - [x] 3.1 创建 `src/components/carb-cycling-calculator/carb-cycling-result.tsx`


    - 显示 BMR、TDEE、瘦体重基础数据
    - 实现高碳日卡片（绿色主题）显示热量和宏量营养素
    - 实现中碳日卡片（蓝色主题，仅进阶版）
    - 实现低碳日卡片（橙色主题）
    - 显示宏量营养素百分比分布
    - 显示周平均每日热量
    - _Requirements: 2.4, 3.4, 4.5, 5.4, 6.4, 7.1, 7.2, 7.3_

- [x] 4. 创建参考信息和说明组件


  - [x] 4.1 创建 `src/components/carb-cycling-calculator/carb-cycling-reference.tsx`


    - 显示简易版周计划建议（2高5低）
    - 显示进阶版周计划建议（2高2中3低）
    - 说明各日期类型适合的训练安排
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 4.2 创建 `src/components/carb-cycling-calculator/carb-cycling-explanation.tsx`


    - 编写碳循环原理介绍
    - 说明 Katch-McArdle 公式
    - 添加执行建议内容
    - _Requirements: 7.4_

- [x] 5. 创建页面入口



  - [x] 5.1 创建 `src/app/tools/carb-cycling-calculator/page.tsx`

    - 添加 JSON-LD 结构化数据（SoftwareApplication + FAQPage）
    - 实现 Hero Section（标题 + 描述）
    - 实现双栏布局（表单/结果 + 参考信息）
    - 集成所有组件
    - 添加 SEO 内容区域和隐藏关键词
    - _Requirements: 8.1, 8.2, 8.3, 8.4_


- [x] 6. 更新现有配置文件


  - [x] 6.1 更新导航和首页配置


    - 更新 `src/lib/config/navigation.ts` 添加碳循环计算器链接
    - 更新 `src/app/page.tsx` 的 features 数组添加新工具
    - 更新 `src/lib/i18n/zh.ts` 添加国际化文本
    - _Requirements: 8.4_
  - [x] 6.2 更新图标配置


    - 更新 `src/components/home/feature-grid.tsx` 的 iconMap 添加图标
    - 更新 `src/components/layout/mobile-nav.tsx` 的 iconMap 添加图标
    - _Requirements: 8.4_
