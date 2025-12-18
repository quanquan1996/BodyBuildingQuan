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

### 工具联动多语言规范

⚠️ **重要：toolLinks 函数必须接收 dict 参数**

所有 `toolLinks` 中的函数都需要接收 `dict: Dictionary` 作为第一个参数，从翻译文件获取标题和描述。

**翻译键位置：** `dict.common.toolLinks`

**标题翻译键：**
- `exploreMore` - "🔗 继续探索" / "🔗 Explore More"
- `otherFatLossPlans` - "🔗 其他减脂方案" / "🔗 Other Fat Loss Plans"

**正确用法：**
```tsx
// ✅ 正确：传递 dict 参数
<ToolLinkCard {...toolLinks.skinfoldToFfmi(dict, bodyFat, weight, height)} />
<ToolLinkCard {...toolLinks.needBodyFat(dict)} />

// ✅ 正确：使用翻译键作为标题
<h4>{dict.common.toolLinks.exploreMore}</h4>
```

**错误用法：**
```tsx
// ❌ 错误：不传递 dict 参数
<ToolLinkCard {...toolLinks.skinfoldToFfmi(bodyFat, weight, height)} />

// ❌ 错误：硬编码中文
<h4>{isZh ? '🔗 继续探索' : '🔗 Explore More'}</h4>
```

### 实现要点

1. **结果组件联动** - 在 `xxx-result.tsx` 中导入 `ToolLinkCard` 和 `toolLinks`，在结果展示后添加联动入口
2. **传递 dict 参数** - 调用 `toolLinks` 函数时必须传递 `dict` 作为第一个参数
3. **使用翻译键** - 联动区域标题使用 `dict.common.toolLinks.exploreMore` 或 `dict.common.toolLinks.otherFatLossPlans`
4. **表单引导** - 在需要体脂输入的表单中添加指向体脂夹计算器的链接
5. **URL 参数传递** - 使用 `toolLinks` 中的函数自动构建带参数的 URL
6. **参数接收** - 表单组件使用 `useSearchParams` 读取 URL 参数并预填（需用 Suspense 包裹）

### 新增工具联动步骤

1. 在 `types.ts` 的 `ToolLinksDict` 中添加新的翻译键类型
2. 在 `zh.ts` 和 `en.ts` 的 `common.toolLinks` 中添加翻译
3. 在 `tool-link-card.tsx` 的 `toolLinks` 对象中添加新的联动配置（接收 dict 参数）
4. 如需新图标，在 `iconMap` 中添加
5. 在相关工具的结果组件中添加 `ToolLinkCard`（传递 dict 参数）
6. 如新工具需要体脂输入，在表单中添加引导链接
7. 表单组件支持 URL 参数预填（使用 Suspense 包裹 useSearchParams）

## UI 设计规范（薄荷健康风格）

### 设计原则

1. **温和柔和** - 使用低饱和度的柔和色彩，避免刺眼的高对比度
2. **圆润质感** - 大圆角（16px-24px），渐变背景，光泽效果
3. **清晰可读** - 文字颜色不低于 `#666666`，确保可读性
4. **留白呼吸** - 区块之间保持足够间距（20-30px）
5. **视觉一致性** - 全站图标风格统一（彩色渐变底 + 白色图标）

### 颜色规范

```css
/* 主色调 */
--primary: #5AC57A;           /* 薄荷绿 */
--primary-gradient: linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%);

/* 文字颜色 */
--text-primary: #333333;      /* 标题 */
--text-secondary: #555555;    /* 正文 */
--text-muted: #666666;        /* 描述文字（最浅不低于此值） */
--text-hint: #888888;         /* 辅助文字 */

/* AI特征色 */
--ai-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 人群色彩编码 */
--beginner: emerald (绿色系 - 生长)
--muscle: blue (蓝色系 - 力量)
--fat-loss: orange (橙色系 - 燃烧)
--bodybuilding: purple (紫色系 - 专业/AI)

/* 深色 Footer */
--footer-bg: #1A202C;
--footer-text: #94A3B8;
--footer-border: #2D3748;
```

### 布局间距

- **顶部导航栏高度**: `h-14`
- **页面容器**: `container py-8 md:py-12 px-4 md:px-6`
- **Hero 区域与工具列表间距**: `pt-10 md:pt-16`（增加呼吸感）
- **标题字号**: 移动端 `text-2xl`，桌面端 `md:text-4xl`
- **字体**: 全局使用 Noto Sans SC，更柔和圆润

### 顶部导航栏

- 分类下拉菜单：首页 | 身体评估 | 饮食计算 | AI工具 | 训练辅助
- 毛玻璃效果：`bg-card/80 backdrop-blur-md`
- 下拉菜单圆角：`rounded-xl`
- Logo: 绿色渐变圆角方块 + "轻核"白色文字

### 工具图标样式

```tsx
// 渐变背景 + 光泽效果 + 彩色阴影
<div
  className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white relative overflow-hidden"
  style={{
    background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
    boxShadow: `0 4px 12px ${from}40`,
  }}
>
  {/* 光泽效果 */}
  <div 
    className="absolute inset-0 opacity-30"
    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }}
  />
  <Icon className="h-7 w-7 relative z-10" strokeWidth={1.5} />
</div>
```

### AI功能角标

```tsx
// 紫色渐变 + 白色描边
<div 
  className="absolute -top-1.5 -right-0.5 z-10 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
  style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 0 0 2px white, 0 2px 4px rgba(0,0,0,0.1)',
  }}
>
  AI
</div>
```

### 按钮样式

```tsx
// 主按钮 - 渐变 + 悬浮效果
<Button 
  className="rounded-full transition-all hover:scale-[1.02] hover:shadow-xl"
  style={{
    background: 'linear-gradient(90deg, #6FCF97 0%, #4CAF50 50%, #45a049 100%)',
    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.35)',
  }}
>

// 次按钮 - 细边框
<Button 
  variant="outline"
  className="rounded-full"
  style={{ borderColor: '#E8E8E8', borderWidth: '1px', color: '#666666' }}
>
```

### 卡片样式

```tsx
// 白色卡片 + 柔和阴影
<div
  className="bg-card rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
  style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
>
```

### 首页工具网格

- 移动端: 4 列网格 `grid-cols-4 gap-x-3 gap-y-4`
- 桌面端: 响应式网格 `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`

### 字体配置

- 全局字体: Noto Sans SC（柔和圆润的中文字体）
- 字重: 300(light), 400(normal), 500(medium), 700(bold)
- 标题: `font-medium` 或 `font-semibold`（避免过粗）
- 正文: `font-normal`

### 适用人群卡片

- 使用 Emoji 极简风（🌱新手、💪增肌、🔥减脂、🏆健美）
- 左图右文布局：左边 Emoji 圆角方块，右边标题+描述，底部标签
- 颜色区分：新手绿、增肌蓝、减脂橙、健美紫
- 卡片带浅色背景 + 同色系边框

### "为什么选择我们"板块

- 移动端 2x2 网格，PC端 1x4 一行
- 彩色渐变底图标（免费绿、AI紫、科学粉、安全蓝）
- 淡薄荷绿渐变背景区隔：`linear-gradient(180deg, #F0FFF4 0%, #F5F7FA 100%)`

### Footer 深色设计

- 背景色：`#1A202C`（深灰绿）
- 文字：白色标题 + `#94A3B8` 浅灰正文
- 分割线：`#2D3748`
- 快速链接分两列：身体评估 | 饮食计算
- 热门工具下沉为 12px 文字链
- Logo 保持与顶部一致

### 工具页面统一规范

1. **Hero Section** - 渐变背景装饰 + 居中标题描述
2. **表单卡片** - 白色圆角卡片 + 柔和阴影
3. **结果展示** - 数据卡片使用渐变进度条
4. **说明区域** - 淡灰背景区隔 `#F9FAFB`
5. **图标风格** - 统一使用渐变底色 + 白色图标

## 联系方式

- 合作/广告: quanquanyiyi520@gmail.com


## 多语言 (i18n) 开发规范

### 支持的语言

- `zh` - 中文（简体）
- `en` - 英文（默认语言）

### 路由结构

所有页面都在 `[locale]` 动态路由段下：
- 首页: `/zh` 或 `/en`
- 工具页面: `/zh/tools/ffmi-calculator` 或 `/en/tools/ffmi-calculator`

⚠️ **重要：** 不要在 `src/app/tools/` 下创建页面，这会与 `[locale]` 路由冲突！

### 翻译文件位置

```
src/lib/i18n/
├── index.ts      # i18n 配置和工具函数
├── types.ts      # 类型定义
├── zh.ts         # 中文翻译
└── en.ts         # 英文翻译
```

### 翻译键命名约定

使用嵌套结构，按页面/组件分层：

```typescript
{
  common: { ... },           // 通用文本
  nav: { ... },              // 导航
  home: { ... },             // 首页
  footer: { ... },           // 页脚
  ffmiCalculator: {          // 工具页面
    title: '...',
    description: '...',
    form: { ... },
    result: { ... },
    explanation: { ... },
  },
}
```

### 新增页面多语言检查清单

1. **翻译文件** - 在 `zh.ts` 和 `en.ts` 中添加对应的翻译键
2. **页面路由** - 在 `src/app/[locale]/` 下创建页面（不是 `src/app/tools/`）
3. **组件参数** - 组件接收 `locale` 和 `dict` 参数
4. **链接前缀** - 所有内部链接添加 `/${locale}` 前缀
5. **SEO metadata** - 在 layout.tsx 中设置多语言 metadata 和 hreflang
6. **Sitemap** - 更新 sitemap.ts 添加新页面的多语言 URL

### 禁止硬编码文本

❌ **错误示例：**
```tsx
// 硬编码中文
<h1>FFMI 计算器</h1>
<button>计算</button>

// 三元运算符硬编码
{isZh ? '相关工具' : 'Related Tools'}

// 缺少 locale 前缀
<Link href="/tools/ffmi-calculator">

// 组件不接收 dict 参数
export function MyComponent() {
  return <div>硬编码文本</div>;
}
```

✅ **正确示例：**
```tsx
// 使用翻译键
<h1>{dict.ffmiCalculator.title}</h1>
<button>{dict.common.calculate}</button>

// 使用翻译键替代三元运算符
{dict.common.relatedTools}

// 包含 locale 前缀
<Link href={`/${locale}/tools/ffmi-calculator`}>

// 组件接收 dict 参数
interface MyComponentProps {
  dict: Dictionary;
}

export function MyComponent({ dict }: MyComponentProps) {
  return <div>{dict.myComponent.text}</div>;
}
```

### 组件多语言模式

**标准组件模式：**
```tsx
import type { Locale, Dictionary } from '@/lib/i18n';

interface MyComponentProps {
  locale: Locale;
  dict: Dictionary;
}

export function MyComponent({ locale, dict }: MyComponentProps) {
  return (
    <div>
      <h1>{dict.myComponent.title}</h1>
      <p>{dict.myComponent.description}</p>
      <Link href={`/${locale}/tools/ffmi-calculator`}>
        {dict.ffmiCalculator.title}
      </Link>
    </div>
  );
}
```

**页面组件模式：**
```tsx
import { getDictionary, type Locale } from '@/lib/i18n';

export default async function MyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div>
      <MyComponent locale={locale} dict={dict} />
    </div>
  );
}
```

### 常见组件的 dict 参数传递

所有自定义组件都需要接收并传递 `dict` 参数：

```tsx
// ✅ 正确：传递 dict 参数
<SkinfoldGuide dict={dict} />
<RelatedTools currentToolId="ffmi-calculator" locale={locale} dict={dict} />
<ToolHero toolId="ffmi-calculator" title={dict.ffmiCalculator.title} />

// ❌ 错误：忘记传递 dict 参数
<SkinfoldGuide />
<RelatedTools currentToolId="ffmi-calculator" locale={locale} />
```

### 类型定义更新流程

当添加新的翻译键时，必须同步更新类型定义：

1. **在 `types.ts` 中添加接口定义**
```typescript
export interface MyComponentDict {
  title: string;
  description: string;
  items: string[];
}

export interface Dictionary {
  // ... 其他字段
  myComponent: MyComponentDict;
}
```

2. **在 `zh.ts` 中添加中文翻译**
```typescript
export const zh: Dictionary = {
  // ... 其他字段
  myComponent: {
    title: '我的组件',
    description: '组件描述',
    items: ['项目1', '项目2'],
  },
};
```

3. **在 `en.ts` 中添加英文翻译**
```typescript
export const en: Dictionary = {
  // ... 其他字段
  myComponent: {
    title: 'My Component',
    description: 'Component description',
    items: ['Item 1', 'Item 2'],
  },
};
```

### 语言检测优先级

1. IP 地理位置（中国大陆强制中文）
2. 浏览器 Accept-Language
3. 默认英文

### 品牌名称

- 中文版: "轻核" + "健身AI工具站"
- 英文版: "MT" + "Muscle Tool"

### 多语言开发最佳实践

#### 1. 注释可以保留中文
```tsx
// ✅ 代码注释可以用中文
// 计算 FFMI 指数
const ffmi = calculateFFMI(data);

// ✅ console.log 可以用中文
console.log('开始计算体脂率');
```

#### 2. 所有用户可见文本必须使用 dict
```tsx
// ❌ 错误
<div className="text-sm text-muted-foreground">
  建议在相同时间、相同条件下测量
</div>

// ✅ 正确
<div className="text-sm text-muted-foreground">
  {dict.skinfoldCalculator.guide.tips[5]}
</div>
```

#### 3. 动态文本也要使用翻译
```tsx
// ❌ 错误
const message = isSuccess ? '计算成功' : '计算失败';

// ✅ 正确
const message = isSuccess 
  ? dict.common.calculateSuccess 
  : dict.common.calculateFailed;
```

#### 4. 数组和列表使用 map
```tsx
// ✅ 正确
<ul>
  {dict.myComponent.tips.map((tip, index) => (
    <li key={index}>{tip}</li>
  ))}
</ul>
```

### 常见错误和解决方案

#### 错误 1: 组件不接收 dict 参数
```tsx
// ❌ 错误
export function MyComponent() {
  return <h1>标题</h1>;
}

// ✅ 修复
interface MyComponentProps {
  dict: Dictionary;
}

export function MyComponent({ dict }: MyComponentProps) {
  return <h1>{dict.myComponent.title}</h1>;
}
```

#### 错误 2: 使用三元运算符硬编码
```tsx
// ❌ 错误
const title = isZh ? '相关工具' : 'Related Tools';

// ✅ 修复
const title = dict.common.relatedTools;
```

#### 错误 3: 链接缺少 locale 前缀
```tsx
// ❌ 错误
<Link href="/tools/ffmi-calculator">

// ✅ 修复
<Link href={`/${locale}/tools/ffmi-calculator`}>
```

#### 错误 4: 忘记传递 dict 参数
```tsx
// ❌ 错误
<MyComponent locale={locale} />

// ✅ 修复
<MyComponent locale={locale} dict={dict} />
```

### 多语言测试检查清单

开发完成后，使用以下清单验证：

- [ ] 所有页面都在 `[locale]/` 路由下
- [ ] 没有 `src/app/tools/` 下的页面
- [ ] 所有组件都接收 `dict` 参数
- [ ] 没有硬编码的中文或英文文本
- [ ] 所有链接都包含 `/${locale}` 前缀
- [ ] 翻译文件中的键都有对应的类型定义
- [ ] 中英文翻译文件结构一致
- [ ] 运行 TypeScript 检查无错误
- [ ] 测试中英文切换功能正常
- [ ] 检查控制台无缺失翻译键的警告

### 快速检查命令

```bash
# 检查是否有硬编码的中文（在 PowerShell 中）
Get-ChildItem -Path "src\components" -Recurse -Filter "*.tsx" | Select-String -Pattern "[\u4e00-\u9fa5]"

# 检查是否有旧路由文件
Test-Path "src\app\tools"

# TypeScript 类型检查
npm run type-check
```
