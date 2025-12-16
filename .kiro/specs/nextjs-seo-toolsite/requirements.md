# Requirements Document

## Introduction

本项目是一个基于 Next.js 15 的 SEO 友好健身 AI 工具站。该工具站采用移动端优先设计，包含首页落地页和多个核心工具页面（健美造型评分器、FFMI 计算器等）。技术栈为 Next.js 15 (App Router) + TypeScript + Tailwind CSS + Shadcn UI。当前版本为中文，架构为后续多语言国际化做准备。

## Glossary

- **ToolSite**: 基于 Next.js 构建的 SEO 优化工具网站，品牌名"健身AI工具站"
- **App Router**: Next.js 13+ 引入的基于文件系统的路由机制
- **SiteHeader**: 网站全局顶部导航组件，所有页面共享
- **Hero Section**: 首页顶部的主视觉区域，包含标题、描述和行动按钮
- **Feature Grid**: 展示工具功能的网格布局组件
- **Pose Scorer**: 健美造型评分器工具，用于 AI 评估健美姿势得分
- **FFMI Calculator**: 无脂肪体重指数计算器，用于评估肌肉发达程度
- **FFMI (Fat-Free Mass Index)**: 无脂肪体重指数，计算公式为 FFM / height² + 6.1 × (1.8 - height)
- **Sheet/Drawer**: Shadcn UI 提供的侧边抽屉组件，用于移动端导航
- **Metadata**: Next.js 中用于 SEO 的页面元数据配置
- **Sitemap**: 网站地图文件，帮助搜索引擎索引页面
- **i18n**: 国际化 (Internationalization)，支持多语言的架构设计
- **JSON-LD**: 结构化数据格式，用于增强搜索引擎理解

## Requirements

### Requirement 1: 全局布局与 SEO 基础设施

**User Story:** As a 网站访客, I want 页面能被搜索引擎正确索引, so that 我可以通过搜索引擎找到这个工具站。

#### Acceptance Criteria

1. THE ToolSite SHALL provide a root layout component at `app/layout.tsx` that includes dynamic Metadata configuration for title, description, and Open Graph tags.
2. THE ToolSite SHALL generate a `sitemap.ts` file that exports all public routes for search engine crawling.
3. THE ToolSite SHALL include a `robots.ts` file that allows search engine indexing of public pages.
4. THE ToolSite SHALL render semantic HTML structure with proper heading hierarchy (h1, h2, h3) for accessibility and SEO.
5. THE ToolSite SHALL include targeted SEO keywords in page titles and descriptions that match user search intent.
6. THE ToolSite SHALL implement JSON-LD structured data for WebSite, Organization, SoftwareApplication, and FAQPage schemas.

### Requirement 2: 响应式网站头部导航

**User Story:** As a 用户, I want 在不同设备上都能方便地导航网站, so that 我可以快速访问各个工具页面。

#### Acceptance Criteria

1. WHILE the viewport width is greater than or equal to 768px, THE SiteHeader SHALL display horizontal navigation links in the top bar.
2. WHILE the viewport width is less than 768px, THE SiteHeader SHALL display a hamburger menu icon that triggers a Sheet/Drawer component.
3. WHEN the user clicks the hamburger menu icon on mobile, THE SiteHeader SHALL open a side drawer containing navigation links.
4. THE SiteHeader SHALL include the site logo/brand name "健身AI工具站" that links to the homepage.
5. THE SiteHeader SHALL highlight the currently active navigation item.

### Requirement 3: 首页落地页

**User Story:** As a 首次访客, I want 看到清晰的产品介绍和功能入口, so that 我能快速了解网站提供的工具并开始使用。

#### Acceptance Criteria

1. THE ToolSite SHALL render a Hero section with gradient background, main heading (h1), descriptive text, subtitle with tool list, and dual CTA buttons.
2. THE ToolSite SHALL render a Feature Grid section displaying available tools as clickable cards with icons.
3. THE ToolSite SHALL render a "Why Choose Us" section highlighting 6 key advantages (免费、在线、AI驱动、科学专业、隐私安全、移动优先).
4. THE ToolSite SHALL render a "Use Cases" section with 6 target user groups and associated keywords for SEO.
5. THE ToolSite SHALL render an "About" section with mission and core values.
6. WHEN the user clicks a feature card, THE ToolSite SHALL navigate to the corresponding tool page.
7. THE homepage SHALL be server-rendered for optimal SEO performance.
8. THE homepage SHALL include JSON-LD structured data (WebSite, Organization schemas).

### Requirement 4: 健美造型评分器工具页面

**User Story:** As a 健身爱好者, I want 上传参考图片和我的照片进行造型评分, so that 我可以改进我的健美造型展示。

#### Acceptance Criteria

1. THE Pose Scorer page SHALL be accessible at the route `/tools/pose-comparator`.
2. THE Pose Scorer page SHALL be implemented as a client component using the "use client" directive.
3. THE Pose Scorer page SHALL provide two image upload areas: one for reference pose and one for user pose.
4. WHEN the user uploads both images, THE Pose Scorer SHALL detect poses using MediaPipe Pose Landmarker via dynamic import.
5. THE Pose Scorer SHALL calculate angle differences between poses and display a total score.
6. THE Pose Scorer SHALL display skeleton overlays with angle difference annotations.
7. THE Pose Scorer page SHALL include a "Pose Categories" section explaining 古典健美、传统健美、健体、比基尼健身.
8. THE Pose Scorer page SHALL include a "Scoring Explanation" section detailing AI detection principles and scoring criteria.
9. THE Pose Scorer page SHALL include a "Limitations" warning section explaining tool constraints and best practices.
10. THE Pose Scorer page SHALL include SEO-friendly metadata and FAQ JSON-LD structured data.
11. IF pose detection fails, THEN THE Pose Scorer SHALL display a user-friendly error message.

### Requirement 5: 移动端优先响应式设计

**User Story:** As a 移动端用户, I want 在手机上也能流畅使用所有功能, so that 我可以随时随地使用这些工具。

#### Acceptance Criteria

1. THE ToolSite SHALL implement mobile-first CSS using Tailwind CSS breakpoint utilities (sm, md, lg, xl).
2. THE ToolSite SHALL ensure all interactive elements have a minimum touch target size of 44x44 pixels on mobile devices.
3. THE ToolSite SHALL adapt layout from single-column on mobile to multi-column on larger screens.
4. THE image upload areas SHALL support both click-to-upload and drag-and-drop interactions.

### Requirement 6: UI 组件库集成

**User Story:** As a 开发者, I want 使用一致的 UI 组件库, so that 界面风格统一且开发效率高。

#### Acceptance Criteria

1. THE ToolSite SHALL use Shadcn UI components for all interactive UI elements (Button, Card, Sheet, Input, Label, etc.).
2. THE ToolSite SHALL configure Tailwind CSS with Shadcn UI's design tokens for consistent theming.
3. THE ToolSite SHALL support light and dark mode themes via CSS variables.

### Requirement 7: FFMI 计算器工具页面

**User Story:** As a 健身爱好者, I want 计算我的无脂肪体重指数 (FFMI), so that 我可以客观评估自己的肌肉发达程度。

#### Acceptance Criteria

1. THE FFMI Calculator page SHALL be accessible at the route `/tools/ffmi-calculator`.
2. THE FFMI Calculator page SHALL provide input fields for height (cm), weight (kg), body fat percentage (%), and gender selection.
3. WHEN the user enters valid values, THE FFMI Calculator SHALL compute and display FFMI, adjusted FFMI, FFM, and fat mass.
4. THE FFMI Calculator SHALL display visual results including progress bar, body composition chart, and category badge.
5. THE FFMI Calculator SHALL include a reference table with FFMI ranges for males and females.
6. THE FFMI Calculator SHALL include an age-based FFMI chart visualization.
7. THE FFMI Calculator SHALL include an explanation section covering principles, advantages, and calculation formula.
8. THE FFMI Calculator page SHALL include SEO-friendly metadata and FAQ JSON-LD structured data.
9. IF the user enters invalid input values, THEN THE FFMI Calculator SHALL display validation error messages.

### Requirement 8: 多语言国际化准备

**User Story:** As a 开发者, I want 代码架构支持未来添加多语言, so that 后续可以轻松扩展到英文等其他语言版本。

#### Acceptance Criteria

1. THE ToolSite SHALL externalize all user-facing text strings into `lib/i18n/zh.ts`.
2. THE ToolSite SHALL use a consistent pattern for text references that can be replaced with i18n library calls.
3. THE ToolSite SHALL structure routes in a way that allows adding locale prefixes without major refactoring.
4. THE ToolSite SHALL separate content from presentation logic to facilitate future translation workflows.

### Requirement 9: 页脚与联系信息

**User Story:** As a 访客, I want 在页面底部找到联系方式和快速链接, so that 我可以联系网站或快速导航。

#### Acceptance Criteria

1. THE Footer SHALL display the site brand name and brief description.
2. THE Footer SHALL include quick navigation links to all main pages.
3. THE Footer SHALL display contact email (quanquanyiyi520@gmail.com) for cooperation/advertising inquiries.
4. THE Footer SHALL include copyright information with current year.
5. THE Footer SHALL be designed to accommodate future additions (blog links, privacy policy, terms of service).
