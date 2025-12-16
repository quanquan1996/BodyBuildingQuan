# Requirements Document

## Introduction

碳循环减脂计算器是一个基于 Katch-McArdle 公式的营养规划工具，帮助用户根据自身代谢数据制定科学的碳水化合物循环饮食计划。工具提供两种模式：简易版（高碳/低碳两档）和进阶版（高碳/中碳/低碳三档），让不同需求的用户都能获得个性化的碳循环方案。

## Glossary

- **Carb_Cycling_Calculator**: 碳循环减脂计算器系统
- **BMR**: 基础代谢率 (Basal Metabolic Rate)，身体在完全静息状态下维持生命所需的最低能量消耗
- **TDEE**: 每日总能量消耗 (Total Daily Energy Expenditure)，BMR 乘以活动系数
- **Katch-McArdle 公式**: BMR = 370 + (21.6 × 瘦体重kg)，基于瘦体重计算 BMR 的公式
- **瘦体重 (Lean Body Mass)**: 体重减去脂肪后的重量，计算公式为：体重 × (1 - 体脂率/100)
- **碳循环 (Carb Cycling)**: 一种饮食策略，通过在不同日期交替摄入高、中、低碳水化合物来优化减脂效果
- **高碳日**: 碳水化合物摄入较高的日子，通常安排在高强度训练日
- **中碳日**: 碳水化合物摄入中等的日子，通常安排在中等强度训练日
- **低碳日**: 碳水化合物摄入较低的日子，通常安排在休息日或低强度活动日
- **热量缺口**: 每日热量摄入低于 TDEE 的差值，用于减脂

## Requirements

### Requirement 1: 用户数据输入

**User Story:** As a 健身用户, I want 输入我的身体数据和活动水平, so that 系统能够计算出适合我的碳循环方案。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 提供体重输入字段，接受 30-300 kg 范围内的数值。
2. THE Carb_Cycling_Calculator SHALL 提供体脂率输入字段，接受 3-60% 范围内的数值。
3. THE Carb_Cycling_Calculator SHALL 提供活动水平选择器，包含久坐不动、轻度活动、中度活动、积极活动、非常活跃五个选项。
4. WHEN 用户输入无效数据, THE Carb_Cycling_Calculator SHALL 显示具体的错误提示信息。
5. THE Carb_Cycling_Calculator SHALL 提供模式切换功能，允许用户在简易版和进阶版之间切换。

### Requirement 2: 基础代谢计算

**User Story:** As a 健身用户, I want 系统使用 Katch-McArdle 公式计算我的基础代谢, so that 我能获得基于瘦体重的精确代谢数据。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 使用公式 BMR = 370 + (21.6 × 瘦体重) 计算基础代谢率。
2. THE Carb_Cycling_Calculator SHALL 使用公式 瘦体重 = 体重 × (1 - 体脂率/100) 计算瘦体重。
3. THE Carb_Cycling_Calculator SHALL 根据用户选择的活动水平乘以对应系数计算 TDEE。
4. THE Carb_Cycling_Calculator SHALL 显示计算得出的 BMR、瘦体重和 TDEE 数值。

### Requirement 3: 简易版碳循环计算

**User Story:** As a 碳循环新手, I want 使用简易的高碳/低碳两档方案, so that 我能轻松开始碳循环饮食。

#### Acceptance Criteria

1. WHILE 用户选择简易版模式, THE Carb_Cycling_Calculator SHALL 计算高碳日和低碳日两种方案。
2. WHILE 用户选择简易版模式, THE Carb_Cycling_Calculator SHALL 将高碳日热量设置为 TDEE 的 100%。
3. WHILE 用户选择简易版模式, THE Carb_Cycling_Calculator SHALL 将低碳日热量设置为 TDEE 的 80%。
4. WHILE 用户选择简易版模式, THE Carb_Cycling_Calculator SHALL 显示每种日期类型的碳水、蛋白质、脂肪克数。

### Requirement 4: 进阶版碳循环计算

**User Story:** As a 有经验的健身者, I want 使用高碳/中碳/低碳三档方案, so that 我能更精细地控制碳水摄入。

#### Acceptance Criteria

1. WHILE 用户选择进阶版模式, THE Carb_Cycling_Calculator SHALL 计算高碳日、中碳日和低碳日三种方案。
2. WHILE 用户选择进阶版模式, THE Carb_Cycling_Calculator SHALL 将高碳日热量设置为 TDEE 的 110%。
3. WHILE 用户选择进阶版模式, THE Carb_Cycling_Calculator SHALL 将中碳日热量设置为 TDEE 的 100%。
4. WHILE 用户选择进阶版模式, THE Carb_Cycling_Calculator SHALL 将低碳日热量设置为 TDEE 的 80%。
5. WHILE 用户选择进阶版模式, THE Carb_Cycling_Calculator SHALL 显示每种日期类型的碳水、蛋白质、脂肪克数。

### Requirement 5: 宏量营养素分配

**User Story:** As a 健身用户, I want 获得每日的蛋白质、碳水、脂肪具体克数, so that 我能准确执行饮食计划。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 将蛋白质摄入量设置为每公斤体重 2.0-2.2 克。
2. THE Carb_Cycling_Calculator SHALL 根据日期类型调整碳水化合物占比：高碳日 50%、中碳日 35%、低碳日 20%。
3. THE Carb_Cycling_Calculator SHALL 将剩余热量分配给脂肪，确保脂肪摄入不低于每公斤体重 0.8 克。
4. THE Carb_Cycling_Calculator SHALL 显示每种宏量营养素的热量贡献（蛋白质 4 kcal/g、碳水 4 kcal/g、脂肪 9 kcal/g）。

### Requirement 6: 周计划建议

**User Story:** As a 健身用户, I want 获得一周的碳循环安排建议, so that 我能合理规划训练和饮食。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 提供简易版的周计划建议，包含高碳日和低碳日的分配。
2. THE Carb_Cycling_Calculator SHALL 提供进阶版的周计划建议，包含高碳日、中碳日和低碳日的分配。
3. THE Carb_Cycling_Calculator SHALL 说明每种日期类型适合的训练安排。
4. THE Carb_Cycling_Calculator SHALL 计算并显示周平均每日热量摄入。

### Requirement 7: 结果展示与导出

**User Story:** As a 健身用户, I want 清晰地查看计算结果, so that 我能理解并执行碳循环方案。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 以卡片形式分别展示每种日期类型的营养数据。
2. THE Carb_Cycling_Calculator SHALL 使用颜色区分不同的日期类型（高碳、中碳、低碳）。
3. THE Carb_Cycling_Calculator SHALL 显示宏量营养素的百分比分布图表。
4. THE Carb_Cycling_Calculator SHALL 提供碳循环原理和执行建议的说明内容。

### Requirement 8: SEO 和页面结构

**User Story:** As a 网站运营者, I want 页面具有良好的 SEO 结构, so that 用户能通过搜索引擎找到这个工具。

#### Acceptance Criteria

1. THE Carb_Cycling_Calculator SHALL 包含 JSON-LD 结构化数据（SoftwareApplication 和 FAQPage 类型）。
2. THE Carb_Cycling_Calculator SHALL 包含语义化的 HTML 标签结构（h1、h2、section、article）。
3. THE Carb_Cycling_Calculator SHALL 包含隐藏的 SEO 关键词区域。
4. THE Carb_Cycling_Calculator SHALL 遵循现有工具页面的双栏布局结构。
