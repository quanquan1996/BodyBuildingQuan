# Requirements Document

## Introduction

本文档定义了为轻核健身AI工具站实现多语言（国际化/i18n）功能的需求。系统需要支持中文和英文两种语言版本，用户可以通过 URL 路径或语言切换器选择语言。实现将采用 Next.js 15 App Router 的国际化最佳实践，确保 SEO 友好和良好的用户体验。

**当前状态分析**：目前项目中大量中文文本直接硬编码在组件中（如 `site-header.tsx`、`footer.tsx`、`why-choose-us.tsx`、各工具的 `form.tsx`、`result.tsx`、`explanation.tsx` 等），仅有少量文本集中在 `src/lib/i18n/zh.ts` 中。国际化需要将所有硬编码文本提取到翻译字典中。

## Glossary

- **i18n_System**: 国际化系统，负责管理多语言文本、路由和语言切换功能
- **Locale**: 语言区域标识符，本项目支持 `zh`（中文）和 `en`（英文）
- **Language_Switcher**: 语言切换组件，允许用户在不同语言版本之间切换
- **Translation_Dictionary**: 翻译字典，存储各语言的文本内容（需从组件中提取所有硬编码文本）
- **Middleware**: Next.js 中间件，用于处理语言检测和路由重定向
- **hreflang**: HTML 属性，用于告知搜索引擎页面的语言版本关系

## Requirements

### Requirement 1: URL 路由国际化

**User Story:** As a 用户, I want 通过 URL 路径访问不同语言版本的页面, so that 我可以直接分享特定语言的链接给他人。

#### Acceptance Criteria

1. WHEN 用户访问 `/zh/tools/ffmi-calculator` 路径, THE i18n_System SHALL 显示中文版本的 FFMI 计算器页面
2. WHEN 用户访问 `/en/tools/ffmi-calculator` 路径, THE i18n_System SHALL 显示英文版本的 FFMI 计算器页面
3. WHEN 用户访问不带语言前缀的路径（如 `/tools/ffmi-calculator`）, THE i18n_System SHALL 根据浏览器语言偏好重定向到对应语言版本，默认为中文
4. THE i18n_System SHALL 为所有现有工具页面生成对应的中英文路由

### Requirement 2: 语言切换功能与品牌多语言

**User Story:** As a 用户, I want 在页面上切换语言, so that 我可以随时查看不同语言版本的内容。

#### Acceptance Criteria

1. THE Language_Switcher SHALL 在网站顶部导航栏中显示当前语言标识
2. WHEN 用户点击 Language_Switcher, THE i18n_System SHALL 显示可选语言列表（中文、English）
3. WHEN 用户选择新语言, THE i18n_System SHALL 在 500 毫秒内导航到当前页面的对应语言版本
4. THE Language_Switcher SHALL 保持用户在页面中的位置（如滚动位置）不变
5. THE i18n_System SHALL 根据当前语言显示对应的 Logo 文字：
   - 中文版：左上角显示"轻核"图标 + "健身AI工具站"
   - 英文版：左上角显示"MT"图标 + "Muscle Tool"（或其他英文品牌名）

### Requirement 3: 翻译文本提取与管理

**User Story:** As a 开发者, I want 将所有硬编码文本提取到集中的翻译字典中, so that 我可以方便地维护和扩展多语言内容。

#### Acceptance Criteria

1. THE Translation_Dictionary SHALL 为中文和英文分别维护独立的翻译文件（`zh.ts` 和 `en.ts`）
2. THE i18n_System SHALL 从以下组件中提取所有硬编码中文文本：
   - 布局组件：`site-header.tsx`、`footer.tsx`、`mobile-nav.tsx`
   - 首页组件：`hero-section.tsx`、`why-choose-us.tsx`、`use-cases.tsx`、`feature-grid.tsx`
   - 各工具页面的 `form.tsx`、`result.tsx`、`explanation.tsx`、`reference.tsx` 组件
3. THE Translation_Dictionary SHALL 使用嵌套结构组织翻译键，按页面/组件分类
4. THE i18n_System SHALL 提供类型安全的翻译文本访问方式，确保编译时检测缺失翻译
5. WHEN 某个翻译键在目标语言中缺失, THE i18n_System SHALL 回退到中文文本并在开发环境输出警告

### Requirement 4: SEO 多语言优化

**User Story:** As a 网站运营者, I want 搜索引擎正确索引各语言版本, so that 不同语言的用户都能通过搜索找到网站。

#### Acceptance Criteria

1. THE i18n_System SHALL 为每个页面生成包含 hreflang 属性的 HTML 标签，标明所有语言版本的 URL
2. THE i18n_System SHALL 为每个语言版本生成独立的 sitemap（sitemap-zh.xml、sitemap-en.xml）
3. THE i18n_System SHALL 为每个语言版本的页面设置正确的 canonical URL
4. THE i18n_System SHALL 为每个语言版本生成对应语言的 OpenGraph 元数据

### Requirement 5: 英文内容翻译

**User Story:** As a 英文用户, I want 阅读完整的英文版本内容, so that 我可以无障碍地使用所有工具功能。

#### Acceptance Criteria

1. THE Translation_Dictionary SHALL 包含所有 10 个工具页面的完整英文翻译：
   - FFMI计算器、体脂夹计算器、代谢计算器、心率区间计算器
   - 健美造型评分器、古典比例计算器、碳循环计算器
   - 减脂饮食计算器、高碳减脂计算器、代谢受损检测
2. THE Translation_Dictionary SHALL 包含首页所有板块的英文翻译（Hero、工具列表、为什么选择我们、适用人群）
3. THE Translation_Dictionary SHALL 包含导航栏分类菜单和页脚的完整英文翻译
4. THE Translation_Dictionary SHALL 包含所有表单标签、按钮、验证消息的英文翻译
5. THE Translation_Dictionary SHALL 包含所有工具说明（explanation）和参考信息（reference）的英文翻译

### Requirement 6: 默认语言与语言检测

**User Story:** As a 首次访问用户, I want 系统自动显示适合我的语言版本, so that 我无需手动切换语言。

#### Acceptance Criteria

1. WHEN 用户首次访问网站根路径, THE Middleware SHALL 按以下优先级检测语言：
   - 优先级1：IP 地理位置检测
   - 优先级2：浏览器 Accept-Language 头
   - 优先级3：默认英文
2. IF 用户 IP 地址位于中国大陆, THEN THE Middleware SHALL 强制重定向到中文版本（`/zh/`）
3. IF 用户 IP 地址位于中国大陆以外且浏览器语言偏好包含中文, THEN THE Middleware SHALL 重定向到中文版本
4. IF 用户 IP 地址位于中国大陆以外且浏览器语言偏好不包含中文, THEN THE Middleware SHALL 重定向到英文版本（`/en/`）
5. THE i18n_System SHALL 支持以下 CDN 提供的地理位置头信息进行 IP 检测：
   - CloudFront：`CloudFront-Viewer-Country` 头
   - Cloudflare：`CF-IPCountry` 头
   - Vercel：`x-vercel-ip-country` 头
6. THE i18n_System SHALL 将英文设为默认语言（当所有检测方法失败时使用）


### Requirement 7: 多语言开发规范

**User Story:** As a 开发者, I want 有明确的多语言开发规范, so that 后续新增页面和功能都能保持多语言一致性。

#### Acceptance Criteria

1. THE i18n_System SHALL 在 steering 文档中定义多语言开发规范
2. THE 开发规范 SHALL 要求所有新增页面必须同时提供中英文翻译
3. THE 开发规范 SHALL 禁止在组件中硬编码任何用户可见的文本
4. THE 开发规范 SHALL 要求所有新增文本必须先添加到翻译字典（`zh.ts` 和 `en.ts`）
5. THE 开发规范 SHALL 提供翻译键命名约定（按页面/组件/功能分层）
6. THE 开发规范 SHALL 要求新增工具页面必须包含对应语言版本的 SEO metadata
