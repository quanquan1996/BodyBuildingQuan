# Implementation Plan

## 已完成任务（MVP版本）

- [x] 1. 项目依赖安装与基础设置
- [x] 2. 创建肌肉数据和 i18n 翻译
- [x] 3. 创建 3D 场景核心组件
- [x] 4. 创建主客户端组件和页面
- [x] 5. 更新导航和站点配置
- [x] 6. 获取和配置 3D 模型

---

## 新功能任务：肌肉层级系统 + 3-Tab 详情面板

- [x] 7. 更新肌肉数据层添加层级分类



  - [x] 7.1 更新 muscles.ts 添加层级分类

    - 定义 SUPERFICIAL_MUSCLES 表层肌肉数组
    - 定义 DEEP_MUSCLES 深层肌肉数组
    - 添加 getMuscleLayer() 函数判断肌肉层级
    - 更新 MuscleInfo 接口添加 layer 字段
    - _Requirements: 3.1_

- [x] 8. 更新 i18n 翻译文件



  - [x] 8.1 更新中文翻译模块
    - 添加 controls.superficialLayer 和 controls.deepLayer 翻译
    - 添加 detailPanel 对象（tabs、placeholder、close）
    - 添加 muscleDetails 对象结构（description、functions、exercises）
    - 为主要肌肉（胸大肌、肱二头肌、背阔肌等）填充示例数据
    - _Requirements: 5.3, 5.4, 5.7, 5.8_


  - [x] 8.2 更新英文翻译模块

    - 结构与中文模块一致
    - 为主要肌肉填充英文示例数据
    - _Requirements: 5.3, 5.4, 5.7_


  - [x] 8.3 更新 i18n 类型定义

    - 更新 MuscleAnatomyDict 接口添加新字段
    - 添加 MuscleDetailDict 类型
    - _Requirements: 7.3_

- [x] 9. 实现肌肉层级切换功能


  - [x] 9.1 更新 MuscleControls 组件

    - 添加层级切换按钮（表层/深层）
    - 使用 Toggle 样式显示当前选中层级
    - 添加 muscleLayer 和 onLayerChange props
    - _Requirements: 3.2, 3.3, 3.4, 3.5_


  - [x] 9.2 更新 MuscleModel 组件

    - 根据 muscleLayer prop 显示/隐藏对应层级肌肉
    - 实现 opacity 过渡动画效果
    - 确保深层肌肉可以被点击交互
    - _Requirements: 3.3, 3.4, 3.6, 4.4_


  - [x] 9.3 更新 MuscleScene 组件

    - 添加 muscleLayer prop 并传递给 MuscleModel
    - _Requirements: 3.3_


  - [x] 9.4 更新 MuscleAnatomyClient 组件

    - 添加 muscleLayer 状态管理
    - 传递层级相关 props 给子组件
    - _Requirements: 3.2_


- [x] 10. 创建 3-Tab 肌肉详情面板



  - [x] 10.1 创建 MuscleDetailPanel 组件

    - 使用 Shadcn Tabs 组件实现三个标签页
    - 实现简介 Tab：显示肌肉名称和描述
    - 实现功能 Tab：以编号列表形式显示功能
    - 实现训练动作 Tab：以图标列表形式显示动作
    - 处理数据缺失时显示占位符
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.8_

  - [x] 10.2 集成详情面板到主组件


    - 替换原有的 MuscleTooltip 为 MuscleDetailPanel
    - 在信息面板区域显示详情
    - 添加关闭按钮功能
    - _Requirements: 5.1, 4.2_


  - [x] 10.3 移动端适配

    - 在移动端以底部抽屉形式显示详情面板
    - 使用 Shadcn Sheet 组件
    - _Requirements: 8.3_

---

## 新功能任务：骨骼显示、腹部肌肉修复、3-Tab内容完善

- [x] 11. 显示骨骼但禁用交互




  - [x] 11.1 更新 MuscleModel 组件识别骨骼

    - 添加 BONE_KEYWORDS 骨骼关键词列表
    - 添加 isBone() 函数判断是否为骨骼
    - 骨骼使用半透明米白色材质渲染
    - 禁用骨骼的射线检测（layers.disable(0)）
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 12. 修复腹部肌肉点击交互




  - [x] 12.1 调试并识别腹部肌肉 mesh 名称

    - 在模型加载时输出腹部相关 mesh 名称
    - 确认 rectus_abdominis、serratus_anterior 等的实际名称
    - _Requirements: 12.1, 12.2, 12.3_



  - [ ] 12.2 更新肌肉识别逻辑
    - 扩展 muscleKeywords 列表添加腹部肌肉关键词
    - 更新 muscleAliases 映射添加腹部肌肉别名



    - 确保腹部肌肉的射线检测正确启用


    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [-] 13. 完善主要肌群的3-Tab详情内容


  - [x] 13.1 完善上肢肌群中文内容

    - 三角肌前束、中束、后束
    - 肱二头肌长头、短头
    - 肱三头肌长头、外侧头、内侧头
    - 前臂屈肌群、伸肌群、肱桡肌
    - _Requirements: 10.1, 10.2, 10.3, 10.4_


  - [x] 13.2 完善躯干肌群中文内容

    - 胸大肌（锁骨部、胸肋部）、胸小肌
    - 背阔肌、斜方肌（上/中/下部）
    - 腹直肌、腹外斜肌、腹内斜肌、腹横肌
    - 前锯肌、竖脊肌、菱形肌
    - _Requirements: 10.1, 10.2, 10.3, 10.4_




  - [ ] 13.3 完善下肢肌群中文内容
    - 臀大肌、臀中肌、臀小肌

    - 股四头肌（股直肌、股外侧肌、股内侧肌、股中间肌）
    - 腘绳肌（股二头肌、半腱肌、半膜肌）
    - 内收肌群（大收肌、长收肌、短收肌）

    - 腓肠肌、比目鱼肌、胫骨前肌
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 13.4 完善上肢肌群英文内容


    - 与中文内容结构一致
    - _Requirements: 10.5_


  - [ ] 13.5 完善躯干肌群英文内容
    - 与中文内容结构一致
    - _Requirements: 10.5_


  - [ ] 13.6 完善下肢肌群英文内容

    - 与中文内容结构一致
    - _Requirements: 10.5_

