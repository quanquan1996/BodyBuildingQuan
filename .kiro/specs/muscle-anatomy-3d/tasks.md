# Implementation Plan

- [x] 1. 项目依赖安装与基础设置

  - [x] 1.1 安装 React Three Fiber 相关依赖


    - 安装 `three`、`@react-three/fiber`、`@react-three/drei`
    - 安装 `@types/three` 开发依赖
    - _Requirements: 1.1_

- [x] 2. 创建肌肉数据和 i18n 翻译

  - [x] 2.1 创建肌肉数据文件


    - 创建 `src/lib/data/muscles.ts`
    - 定义 MuscleInfo 接口和肌肉数据数组
    - 实现 getMuscleById 和 getMuscleName 工具函数
    - _Requirements: 3.3, 5.2_
  - [x] 2.2 创建中文翻译模块


    - 创建 `src/lib/i18n/locales/zh/muscle-anatomy.ts`
    - 包含标题、描述、控制按钮、说明内容
    - _Requirements: 5.1, 5.3_

  - [x] 2.3 创建英文翻译模块

    - 创建 `src/lib/i18n/locales/en/muscle-anatomy.ts`
    - 结构与中文模块一致
    - _Requirements: 5.1, 5.3_
  - [x] 2.4 更新 i18n 类型定义和索引


    - 更新 `types.ts` 添加 MuscleAnatomyDict 接口
    - 更新 `locales/zh/index.ts` 和 `locales/en/index.ts` 导出新模块
    - 更新 `src/lib/i18n/index.ts` 组装新模块
    - _Requirements: 5.1_

- [x] 3. 创建 3D 场景核心组件
  - [x] 3.1 创建 MuscleScene 组件


    - 创建 `src/components/muscle-anatomy/muscle-scene.tsx`
    - 实现 Canvas、灯光、OrbitControls 配置
    - 支持触摸手势操作
    - _Requirements: 1.1, 2.1, 2.2, 2.3, 6.2_

  - [x] 3.2 创建 MuscleModel 组件

    - 创建 `src/components/muscle-anatomy/muscle-model.tsx`
    - 使用 useGLTF 加载模型
    - 实现悬停高亮效果
    - 实现点击事件处理
    - _Requirements: 1.1, 3.1, 3.2, 3.3_
  - [x] 3.3 创建 MuscleControls 组件


    - 创建 `src/components/muscle-anatomy/muscle-controls.tsx`
    - 实现正面/背面视图切换按钮
    - 实现重置视角按钮
    - _Requirements: 2.4, 4.1, 4.2_


  - [x] 3.4 创建 MuscleTooltip 组件
    - 创建 `src/components/muscle-anatomy/muscle-tooltip.tsx`
    - 显示肌肉中英文名称
    - 跟随鼠标位置显示
    - _Requirements: 3.2, 5.2_

- [x] 4. 创建主客户端组件和页面

  - [x] 4.1 创建 MuscleAnatomyClient 主组件


    - 创建 `src/components/muscle-anatomy/muscle-anatomy-client.tsx`
    - 整合 MuscleScene、MuscleControls、MuscleTooltip
    - 实现 WebGL 支持检测
    - 实现加载状态显示
    - _Requirements: 1.2, 1.3, 6.1_

  - [x] 4.2 创建 MuscleExplanation 说明组件

    - 创建 `src/components/muscle-anatomy/muscle-explanation.tsx`
    - SEO 友好的说明内容
    - _Requirements: 7.1_
  - [x] 4.3 创建页面和 layout


    - 创建 `src/app/[locale]/tools/muscle-anatomy/page.tsx`
    - 创建 `src/app/[locale]/tools/muscle-anatomy/layout.tsx` 导出 metadata
    - 包含 JSON-LD 结构化数据
    - _Requirements: 7.1, 7.2_

- [x] 5. 更新导航和站点配置

  - [x] 5.1 更新导航配置


    - 更新 `src/lib/config/navigation.ts` 添加新工具
    - 更新首页工具列表
    - 更新 `feature-grid.tsx` 的 iconMap
    - 更新 `mobile-nav.tsx` 的 iconMap
    - _Requirements: 7.1_
  - [x] 5.2 更新 sitemap


    - 更新 `src/app/sitemap.ts` 添加新页面 URL
    - _Requirements: 7.1_

- [x] 6. 获取和配置 3D 模型


  - [x] 6.1 准备 3D 肌肉模型


    - 从开源资源获取人体肌肉 GLTF 模型
    - 确保模型中每块肌肉为独立 mesh
    - 放置到 `public/models/muscle-anatomy.glb`
    - _Requirements: 1.1, 3.3_
