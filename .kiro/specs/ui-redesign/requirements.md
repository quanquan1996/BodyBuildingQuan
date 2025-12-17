# Requirements Document

## Introduction

本需求文档定义了健身AI工具站的UI重设计规范，参考薄荷健康App的设计风格，实现柔和渐变色图标、圆润卡片、清爽配色的现代化UI体验。目标是让网站看起来与参考App风格几乎一致，同时合理适配现有的10个健身工具功能。

## Glossary

- **GradientIcon**: 带有双色渐变背景的圆角图标容器组件
- **ToolCard**: 工具入口卡片，包含渐变图标和标题
- **SectionCard**: 带左上角小字标题的内容区块卡片
- **DataCard**: 展示数据的卡片，支持分栏布局
- **ColorPalette**: 定义各工具专属渐变色的配色方案
- **FeatureGrid**: 首页展示所有工具入口的网格组件
- **MobileNav**: 移动端导航组件
- **FormCard**: 表单输入区域的卡片容器
- **ResultCard**: 计算结果展示的卡片容器

---

## Requirements

### Requirement 1: 渐变色图标系统

**User Story:** As a 用户, I want 每个工具有独特的渐变色图标, so that 我能快速识别和区分不同工具。

#### Acceptance Criteria

1. THE GradientIcon SHALL 为每个工具定义独特的双色渐变背景，具体配色如下：
   - FFMI计算器: 橙粉渐变 (#FF9A8B → #FF6B8A)
   - 体脂夹计算器: 蓝绿渐变 (#4FACFE → #00F2FE)
   - 代谢计算器: 橙黄渐变 (#FFD93D → #FF9500)
   - 心率区间计算器: 粉红渐变 (#FF758C → #FF7EB3)
   - 健美造型评分器: 紫粉渐变 (#A18CD1 → #FBC2EB)
   - 古典比例计算器: 金橙渐变 (#F6D365 → #FDA085)
   - 碳循环计算器: 绿青渐变 (#11998E → #38EF7D)
   - 减脂饮食计算器: 浅绿渐变 (#96E6A1 → #D4FC79)
   - 高碳减脂计算器: 麦黄渐变 (#F5AF19 → #F12711)
   - 代谢受损检测器: 蓝紫渐变 (#667EEA → #764BA2)

2. THE GradientIcon SHALL 使用 20px 圆角的正方形容器（移动端 48x48px，桌面端 56x56px）

3. THE GradientIcon SHALL 在容器内居中显示白色图标（移动端 24px，桌面端 28px）

4. THE GradientIcon SHALL 支持渐变方向为 135deg（左上到右下）

---

### Requirement 2: 首页工具网格重设计

**User Story:** As a 用户, I want 首页工具网格采用清爽的卡片式布局, so that 我能获得更好的视觉体验和操作便利性。

#### Acceptance Criteria

1. WHEN 用户在移动端访问首页, THE FeatureGrid SHALL 显示横向滚动的工具卡片行，每行显示5个工具图标

2. THE ToolCard SHALL 采用垂直排列布局：渐变图标在上（48x48px）、工具名称在下（12px字号，最多2行）

3. THE ToolCard SHALL 使用纯白色背景、16px圆角、极浅阴影（shadow-sm）

4. WHEN 用户在桌面端访问首页, THE FeatureGrid SHALL 显示2列网格布局，每个卡片包含图标、标题和描述

5. WHEN 用户点击或悬停在ToolCard上, THE ToolCard SHALL 显示轻微上浮效果（translateY -2px）和阴影增强

---

### Requirement 3: 整体配色方案

**User Story:** As a 用户, I want 网站采用清爽柔和的配色方案, so that 长时间使用不会视觉疲劳。

#### Acceptance Criteria

1. THE ColorPalette SHALL 定义主色调为健康绿色 (#4CAF50)，用于品牌标识和主要操作按钮

2. THE Background SHALL 使用浅灰色 (#F5F7FA) 作为页面背景色

3. THE Card SHALL 使用纯白色 (#FFFFFF) 背景，配合 0 1px 3px rgba(0,0,0,0.08) 的极浅阴影

4. THE Text SHALL 使用深灰色 (#1F2937) 作为主文字颜色，浅灰色 (#6B7280) 作为次要文字颜色

5. THE ColorPalette SHALL 在深色模式下保持渐变色的饱和度，背景色调整为 (#1A1A2E)

---

### Requirement 4: 圆润设计语言

**User Story:** As a 用户, I want 所有UI元素采用圆润的设计风格, so that 界面看起来更加友好和现代。

#### Acceptance Criteria

1. THE Card SHALL 使用 16-20px 的圆角

2. THE Button SHALL 使用 12px 的圆角，主要按钮使用主色渐变背景

3. THE Input SHALL 使用 12px 的圆角，浅灰色背景 (#F3F4F6)，无边框设计

4. THE GradientIcon SHALL 使用 20px 的圆角

5. THE Tag/Badge SHALL 使用 999px 的圆角（胶囊形状）

---

### Requirement 5: 模块标题设计（左上角小字标题）

**User Story:** As a 用户, I want 每个功能模块有清晰的标题标识, so that 我能快速理解每个区块的用途。

#### Acceptance Criteria

1. THE SectionCard SHALL 在左上角显示模块标题，使用胶囊形状背景

2. THE SectionCard标题 SHALL 包含彩色小图标（16px）+ 标题文字（14px，font-medium）

3. THE SectionCard标题背景 SHALL 使用对应模块的渐变色的10%透明度版本

4. THE SectionCard标题文字 SHALL 使用对应模块的渐变色主色

5. WHEN 模块为表单输入区, THE SectionCard标题 SHALL 显示如"基本信息"、"身体数据"等描述性文字

---

### Requirement 6: 数据展示卡片

**User Story:** As a 用户, I want 计算结果以清晰美观的方式展示, so that 我能快速理解我的健身数据。

#### Acceptance Criteria

1. THE DataCard SHALL 支持左右分栏布局，每栏显示独立的数据项

2. THE DataCard数据项 SHALL 包含：左上角小标题（12px，浅灰色）+ 大数字（32px，font-bold）+ 单位（14px）

3. THE DataCard SHALL 在数据标题旁显示问号帮助图标，点击可查看说明

4. WHEN 数据为范围值, THE DataCard SHALL 使用波浪号连接（如 117~156）

5. THE DataCard SHALL 使用浅色背景区分不同数据区块（如浅粉、浅蓝、浅绿）

---

### Requirement 7: 表单输入设计

**User Story:** As a 用户, I want 表单输入简洁易用, so that 我能快速完成数据录入。

#### Acceptance Criteria

1. THE FormCard SHALL 使用左上角小字标题标识输入区域（如"身高"、"体重"）

2. THE Input SHALL 使用浅灰色背景 (#F3F4F6)、无边框、12px圆角

3. THE Input SHALL 在获得焦点时显示主色边框（2px solid #4CAF50）

4. THE FormCard SHALL 支持分栏布局，相关输入项并排显示

5. WHEN 用户未填写数据, THE Input SHALL 显示占位符文字（如"请输入身高"）

---

### Requirement 8: 导航栏样式

**User Story:** As a 用户, I want 导航栏简洁清爽, so that 我能专注于工具内容。

#### Acceptance Criteria

1. THE Header SHALL 使用白色背景 + 毛玻璃效果（backdrop-blur）

2. THE Logo SHALL 使用主色（健康绿 #4CAF50）作为品牌色

3. THE Header SHALL 固定在顶部，高度为 56px

4. WHEN 用户在移动端打开导航菜单, THE MobileNav SHALL 显示带 20px 圆角的侧边栏面板

5. THE MobileNav SHALL 使用与首页一致的渐变色图标展示工具列表

---

### Requirement 9: 工具页面布局

**User Story:** As a 用户, I want 所有工具页面采用统一的设计风格, so that 我在不同工具间切换时有一致的体验。

#### Acceptance Criteria

1. THE ToolPage SHALL 在顶部显示工具名称和对应的渐变色大图标（64x64px）

2. THE ToolPage SHALL 使用双栏布局：左侧为表单/结果区，右侧为参考信息区（移动端堆叠）

3. THE ToolPage表单区 SHALL 使用 SectionCard 组件，带"基本信息"等左上角标题

4. THE ToolPage结果区 SHALL 使用 DataCard 组件展示计算结果

5. THE ToolPage SHALL 在结果下方显示相关工具推荐，使用横向滚动的 ToolCard 组件

---

### Requirement 10: 进度和状态指示

**User Story:** As a 用户, I want 清晰看到数据的进度和状态, so that 我能直观理解我的健身情况。

#### Acceptance Criteria

1. THE ProgressBar SHALL 使用渐变色填充（与对应工具的渐变色一致）

2. THE ProgressBar SHALL 显示百分比数值和描述文字

3. THE ProgressBar SHALL 使用 8px 高度、999px 圆角

4. WHEN 数据处于不同等级, THE StatusBadge SHALL 使用对应颜色（绿色=优秀，黄色=一般，红色=需改善）

5. THE CircularProgress SHALL 用于展示环形进度（如体脂率、完成度等）

---

## 工具与渐变色映射表

| 工具名称 | 路由 | 渐变色 | 图标 |
|---------|------|--------|------|
| FFMI计算器 | /tools/ffmi-calculator | #FF9A8B → #FF6B8A | Calculator |
| 体脂夹计算器 | /tools/skinfold-calculator | #4FACFE → #00F2FE | Ruler |
| 代谢计算器 | /tools/bmr-calculator | #FFD93D → #FF9500 | Flame |
| 心率区间计算器 | /tools/heart-rate-calculator | #FF758C → #FF7EB3 | Heart |
| 健美造型评分器 | /tools/pose-comparator | #A18CD1 → #FBC2EB | Camera |
| 古典比例计算器 | /tools/grecian-calculator | #F6D365 → #FDA085 | Ratio |
| 碳循环计算器 | /tools/carb-cycling-calculator | #11998E → #38EF7D | RefreshCw |
| 减脂饮食计算器 | /tools/fat-loss-diet-calculator | #96E6A1 → #D4FC79 | Salad |
| 高碳减脂计算器 | /tools/high-carb-diet-calculator | #F5AF19 → #F12711 | Wheat |
| 代谢受损检测器 | /tools/metabolic-damage-test | #667EEA → #764BA2 | Activity |
