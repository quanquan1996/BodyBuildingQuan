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

- 使用 `metadata` 导出配置页面元数据
- 使用 `sitemap.ts` 生成站点地图
- 使用 `robots.ts` 配置爬虫规则
- 使用 JSON-LD 结构化数据增强搜索结果
- 使用语义化 HTML 标签 (h1, h2, section, article)

## 新增工具页面检查清单

新增工具页面时，必须更新以下文件：

1. **导航栏配置** - `src/lib/config/navigation.ts` 添加新工具链接
2. **首页工具列表** - `src/app/page.tsx` 的 features 数组添加新工具
3. **国际化文本** - `src/lib/i18n/zh.ts` 添加新工具的标题和描述
4. **图标支持** - 如需新图标，更新 `src/components/home/feature-grid.tsx` 的 iconMap

## 联系方式

- 合作/广告: quanquanyiyi520@gmail.com
