<div align="center">

# 🏋️ Muscle Tool - 健身 AI 工具站

**专业的在线健身计算器集合 | Professional Fitness Calculator Suite**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-muscletool.pro-5AC57A?style=for-the-badge)](https://muscletool.pro)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)

[English](#english) | [中文](#中文)

<img src="https://muscletool.pro/og-image.png" alt="Muscle Tool Preview" width="600" />

</div>

---

## 中文

### ✨ 项目简介

Muscle Tool（轻核）是一个专业的在线健身工具站，提供多种科学的健身计算器，帮助健身爱好者和专业运动员进行身体评估、饮食规划和训练优化。

🔗 **在线体验**: [https://muscletool.pro](https://muscletool.pro)

### 🛠️ 功能特性

#### 📊 身体评估工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **FFMI 计算器** | 无脂肪体重指数，评估肌肉发展水平 | [立即使用](https://muscletool.pro/zh/tools/ffmi-calculator) |
| **体脂夹计算器** | 基于皮褶厚度精确测量体脂率 | [立即使用](https://muscletool.pro/zh/tools/skinfold-calculator) |
| **BMR 代谢计算器** | 计算基础代谢率和每日热量需求 | [立即使用](https://muscletool.pro/zh/tools/bmr-calculator) |
| **古典比例计算器** | 计算黄金比例的理想围度 | [立即使用](https://muscletool.pro/zh/tools/grecian-calculator) |

#### 🍽️ 饮食计算工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **碳循环计算器** | 智能碳水循环饮食方案 | [立即使用](https://muscletool.pro/zh/tools/carb-cycling-calculator) |
| **减脂饮食计算器** | 科学的减脂热量和宏量素规划 | [立即使用](https://muscletool.pro/zh/tools/fat-loss-diet-calculator) |
| **高碳减脂计算器** | 高碳水低脂肪减脂方案 | [立即使用](https://muscletool.pro/zh/tools/high-carb-diet-calculator) |

#### 🤖 AI 智能工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **健美造型评分器** | AI 驱动的姿态检测与对比评分 | [立即使用](https://muscletool.pro/zh/tools/pose-comparator) |
| **代谢受损检测** | 评估代谢适应程度 | [立即使用](https://muscletool.pro/zh/tools/metabolic-damage-test) |

#### ❤️ 训练辅助工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **心率区间计算器** | 计算最佳训练心率区间 | [立即使用](https://muscletool.pro/zh/tools/heart-rate-calculator) |

### 🚀 技术亮点

- **🔒 隐私优先**: 所有计算在浏览器本地完成，无需上传数据
- **🤖 前端 AI**: 使用 MediaPipe 实现浏览器端人体姿态检测
- **🌍 多语言支持**: 中文 / English 双语界面
- **📱 响应式设计**: 完美适配手机、平板、桌面设备
- **⚡ 极速加载**: Next.js 15 App Router + SSR 优化
- **🎨 现代 UI**: Tailwind CSS + shadcn/ui 组件库

### 🏗️ 技术栈

```
Frontend Framework:  Next.js 15 (App Router)
Language:            TypeScript 5.x
UI Framework:        React 19
Styling:             Tailwind CSS 4.x
UI Components:       shadcn/ui
Icons:               Lucide React
AI/ML:               MediaPipe Tasks Vision (CDN)
Deployment:          Docker / Vercel
```

### 📦 本地开发

```bash
# 克隆项目
git clone https://github.com/quanquan1996/BodyBuildingQuan.git
cd BodyBuildingQuan/nextjs-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 📁 项目结构

```
nextjs-app/
├── src/
│   ├── app/
│   │   └── [locale]/          # 多语言路由
│   │       ├── page.tsx       # 首页
│   │       └── tools/         # 工具页面
│   ├── components/            # React 组件
│   │   ├── ui/                # 基础 UI 组件
│   │   └── [tool-name]/       # 各工具组件
│   └── lib/
│       ├── i18n/              # 国际化
│       ├── mediapipe/         # AI 姿态检测
│       └── utils/             # 工具函数
├── public/                    # 静态资源
└── package.json
```

---

## English

### ✨ About

Muscle Tool is a professional online fitness calculator suite that provides scientific tools for body assessment, diet planning, and training optimization.

🔗 **Live Demo**: [https://muscletool.pro](https://muscletool.pro)

### 🛠️ Features

#### 📊 Body Assessment Tools

| Tool | Description | Link |
|------|-------------|------|
| **FFMI Calculator** | Fat-Free Mass Index for muscle development assessment | [Try Now](https://muscletool.pro/en/tools/ffmi-calculator) |
| **Skinfold Calculator** | Accurate body fat measurement using caliper | [Try Now](https://muscletool.pro/en/tools/skinfold-calculator) |
| **BMR Calculator** | Basal Metabolic Rate and daily calorie needs | [Try Now](https://muscletool.pro/en/tools/bmr-calculator) |
| **Grecian Calculator** | Calculate ideal golden ratio measurements | [Try Now](https://muscletool.pro/en/tools/grecian-calculator) |

#### 🍽️ Diet Planning Tools

| Tool | Description | Link |
|------|-------------|------|
| **Carb Cycling Calculator** | Smart carbohydrate cycling diet plan | [Try Now](https://muscletool.pro/en/tools/carb-cycling-calculator) |
| **Fat Loss Diet Calculator** | Scientific fat loss calorie and macro planning | [Try Now](https://muscletool.pro/en/tools/fat-loss-diet-calculator) |
| **High Carb Diet Calculator** | High carb low fat diet approach | [Try Now](https://muscletool.pro/en/tools/high-carb-diet-calculator) |

#### 🤖 AI-Powered Tools

| Tool | Description | Link |
|------|-------------|------|
| **Pose Comparator** | AI-driven pose detection and scoring | [Try Now](https://muscletool.pro/en/tools/pose-comparator) |
| **Metabolic Damage Test** | Assess metabolic adaptation level | [Try Now](https://muscletool.pro/en/tools/metabolic-damage-test) |

#### ❤️ Training Tools

| Tool | Description | Link |
|------|-------------|------|
| **Heart Rate Calculator** | Calculate optimal training heart rate zones | [Try Now](https://muscletool.pro/en/tools/heart-rate-calculator) |

### 🚀 Key Highlights

- **🔒 Privacy First**: All calculations run locally in browser
- **🤖 Client-side AI**: MediaPipe-powered pose detection in browser
- **🌍 Multilingual**: Chinese / English support
- **📱 Responsive**: Mobile, tablet, and desktop optimized
- **⚡ Fast**: Next.js 15 App Router with SSR
- **🎨 Modern UI**: Tailwind CSS + shadcn/ui

### 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/quanquan1996/BodyBuildingQuan.git
cd BodyBuildingQuan/nextjs-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the result.

---

## 📝 相关文章 | Related Articles

- [前端实现人体骨架检测与姿态对比：基于 MediaPipe 的完整方案](./public/blog/frontend-pose-detection-mediapipe.md)

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

Issues and Pull Requests are welcome!

## 📄 License

MIT License

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

**If this project helps you, please give it a ⭐ Star!**

[![Star History Chart](https://api.star-history.com/svg?repos=quanquan1996/BodyBuildingQuan&type=Date)](https://star-history.com/#quanquan1996/BodyBuildingQuan&Date)

</div>
