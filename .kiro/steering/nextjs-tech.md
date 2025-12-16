# Next.js 技术栈

## 框架与语言

- Next.js 15 (App Router)
- TypeScript 5.x
- React 19

## 主要依赖

- `tailwindcss` - CSS 框架
- `shadcn/ui` - UI 组件库
- `lucide-react` - 图标库
- `class-variance-authority` - 样式变体管理
- `tailwind-merge` - Tailwind 类名合并

## 外部库 (CDN)

- MediaPipe Tasks Vision v0.10.8 - 通过动态 import 进行姿态检测

## 架构

- Next.js App Router 文件系统路由
- 服务端渲染 (SSR) 用于 SEO
- 客户端组件 ("use client") 用于交互功能
- 动态 import 加载 MediaPipe

## 常用命令

```bash
# 进入项目目录
cd nextjs-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 添加 Shadcn 组件
npx shadcn@latest add [component-name]
```

## 项目结构

```
nextjs-app/
├── src/
│   ├── app/           # 页面路由
│   ├── components/    # React 组件
│   ├── lib/           # 工具函数和配置
│   └── types/         # TypeScript 类型定义
├── public/            # 静态资源
└── package.json
```

## SEO 最佳实践

- 网站域名: `https://muscletool.pro`
- 使用 `layout.tsx` 导出 metadata（因为 page.tsx 是 'use client' 组件）
- 使用 `sitemap.ts` 生成站点地图（包含所有工具页面）
- 使用 `robots.ts` 配置爬虫规则
- 使用 JSON-LD 结构化数据增强搜索结果（SoftwareApplication + FAQPage）
- 使用语义化 HTML 标签 (h1, h2, section, article)
- 每个页面必须有 canonical URL
- 每个页面必须有 OpenGraph 数据

## 新增工具页面检查清单

新增工具页面时，必须更新以下文件：

1. **导航栏配置** - `src/lib/config/navigation.ts` 添加新工具链接
2. **首页工具列表** - `src/app/page.tsx` 的 features 数组添加新工具
3. **国际化文本** - `src/lib/i18n/zh.ts` 添加新工具的标题和描述
4. **首页图标支持** - 如需新图标，更新 `src/components/home/feature-grid.tsx` 的 iconMap
5. **移动端导航图标** - 更新 `src/components/layout/mobile-nav.tsx` 的 iconMap
6. **工具联动配置** - 更新 `src/components/common/tool-link-card.tsx` 的 toolLinks 对象
7. **SEO layout.tsx** - 在工具目录下创建 `layout.tsx` 导出 metadata（title、description、canonical、openGraph）
8. **Sitemap** - 更新 `src/app/sitemap.ts` 添加新工具 URL

## 现有工具列表

| 工具名称 | 路由 | 图标 |
|---------|------|------|
| FFMI计算器 | `/tools/ffmi-calculator` | Calculator |
| 体脂夹计算器 | `/tools/skinfold-calculator` | Ruler |
| 代谢计算器 | `/tools/bmr-calculator` | Flame |
| 心率区间计算器 | `/tools/heart-rate-calculator` | Heart |
| 健美造型评分器 | `/tools/pose-comparator` | Camera |
| 古典比例计算器 | `/tools/grecian-calculator` | Ratio |
| 碳循环减脂计算器 | `/tools/carb-cycling-calculator` | RefreshCw |
| 减脂饮食计算器 | `/tools/fat-loss-diet-calculator` | Salad |
| 高碳减脂计算器 | `/tools/high-carb-diet-calculator` | Wheat |
| 代谢受损检测器 | `/tools/metabolic-damage-test` | Activity |

## 工具页面结构模板

每个工具页面应包含：
- **layout.tsx** - 导出 metadata（title、description、canonical、openGraph）
- JSON-LD 结构化数据（SoftwareApplication + FAQPage）
- Hero Section（标题 + 描述）
- 双栏布局（表单/结果 + 参考信息）
- 详细说明组件
- SEO 内容区域
- 隐藏的 SEO 关键词
- **工具联动入口**（在结果组件中添加相关工具链接）

### layout.tsx 模板

```tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: '工具名称 - 副标题',
  description: '工具描述，包含关键词...',
  alternates: {
    canonical: `${siteConfig.url}/tools/tool-name`,
  },
  openGraph: {
    title: '工具名称 - 副标题',
    description: '简短描述',
    url: `${siteConfig.url}/tools/tool-name`,
    type: 'website',
  },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

## 工具联动规范

工具之间应建立合理的联动关系，提升用户体验和网站粘性。

### 联动组件

使用 `src/components/common/tool-link-card.tsx` 中的 `ToolLinkCard` 组件和 `toolLinks` 配置。

### 联动类型

1. **next-step（下一步）** - 计算完成后推荐的后续工具
2. **prerequisite（前置条件）** - 当用户缺少某个输入数据时的引导

### 现有联动关系

| 来源工具 | 目标工具 | 联动数据 | 场景 |
|---------|---------|---------|------|
| 体脂夹计算器 | FFMI计算器 | 体脂率、体重、身高 | 测完体脂算肌肉量 |
| 体脂夹计算器 | 代谢计算器 | 体脂率、体重 | 用体脂算精准代谢 |
| 体脂夹计算器 | 碳循环计算器 | 体脂率、体重 | 制定饮食计划 |
| 代谢计算器 | 碳循环计算器 | 体脂率、体重、活动水平 | 基于代谢做饮食 |
| 代谢计算器 | 心率区间计算器 | 年龄 | 顺便算心率区间 |
| 古典比例计算器 | 健美造型评分器 | - | 测完比例评造型 |
| 健美造型评分器 | 古典比例计算器 | - | 了解理想围度 |

### 前置引导

需要体脂率输入的工具（FFMI、BMR进阶、碳循环）应在表单中添加"不知道体脂率？用体脂夹测量"的引导链接。

### 实现要点

1. **结果组件联动** - 在 `xxx-result.tsx` 中导入 `ToolLinkCard` 和 `toolLinks`，在结果展示后添加联动入口
2. **表单引导** - 在需要体脂输入的表单中添加指向体脂夹计算器的链接
3. **URL 参数传递** - 使用 `toolLinks` 中的函数自动构建带参数的 URL
4. **参数接收** - 表单组件使用 `useSearchParams` 读取 URL 参数并预填（需用 Suspense 包裹）

### 新增工具联动步骤

1. 在 `tool-link-card.tsx` 的 `toolLinks` 对象中添加新的联动配置
2. 如需新图标，在 `iconMap` 中添加
3. 在相关工具的结果组件中添加 `ToolLinkCard`
4. 如新工具需要体脂输入，在表单中添加引导链接
5. 表单组件支持 URL 参数预填（使用 Suspense 包裹 useSearchParams）

## UI 设计规范

### 布局间距

- **顶部导航栏高度**: `h-16`
- **页面容器**: `container py-8 md:py-12 px-4 md:px-6`
- **Hero 区域底部间距**: `mb-8 md:mb-10`
- **标题字号**: 移动端 `text-2xl`，桌面端 `md:text-4xl`

### 顶部导航栏样式

```tsx
// 淡灰色背景 + 毛玻璃效果 + 渐变分隔线
<header className="sticky top-0 z-50 w-full bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
  <div className="container flex h-16 items-center px-4 md:px-6">
    <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    {/* ... */}
  </div>
</header>
```

### Logo 样式

- 图标容器: `w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary text-primary-foreground`
- 文字: `font-black text-base md:text-lg tracking-tight font-[family-name:var(--font-noto-sans-sc)]`
- "AI" 高亮: `<span className="text-primary">AI</span>`

### 移动端侧边栏 (Sheet)

- 圆角浮动样式: `rounded-2xl`
- 四周间距: `inset-y-4 right-4`
- 头部渐变背景: `bg-gradient-to-br from-primary/10 to-primary/5`
- 关闭按钮: 圆形 `rounded-full`

### 首页工具网格

- 移动端: 3 列紧凑布局 `grid-cols-3 gap-2`
- 桌面端: 2 列布局 `sm:grid-cols-2 gap-6`
- 移动端卡片: 垂直居中，只显示图标和标题
- 桌面端卡片: 水平布局，显示图标、标题和描述

### 字体配置

- 主字体: Geist Sans
- 等宽字体: Geist Mono
- 中文字体: Noto Sans SC (用于 Logo 和标题)

## 联系方式

- 合作/广告: quanquanyiyi520@gmail.com
