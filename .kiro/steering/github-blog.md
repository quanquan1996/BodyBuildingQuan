# GitHub Pages 博客规范

## 博客地址

- **首页**: https://quanquan1996.github.io/BodyBuildingQuan/
- **仓库**: https://github.com/quanquan1996/BodyBuildingQuan

## 目录结构

```
docs/
├── _config.yml                    # Jekyll 配置
├── index.md                       # 博客首页
└── _posts/                        # 博客文章目录
    ├── 2024-12-20-frontend-pose-detection-mediapipe.md     # 中文文章
    └── 2024-12-20-frontend-pose-detection-mediapipe-en.md  # 英文文章
```

## 新增博客文章

### 文件命名规范

```
docs/_posts/YYYY-MM-DD-article-slug.md
```

示例：`2024-12-20-frontend-pose-detection-mediapipe.md`

### Front Matter 模板

```yaml
---
layout: post
title: "文章标题"
date: 2024-12-20
categories: [frontend, computer-vision]
tags: [MediaPipe, JavaScript, React]
excerpt: "文章摘要，会显示在首页列表中"
lang: zh  # 或 en
---
```

### 必填字段

| 字段 | 说明 |
|------|------|
| `layout` | 固定为 `post` |
| `title` | 文章标题 |
| `date` | 发布日期 YYYY-MM-DD |
| `categories` | 分类数组 |
| `tags` | 标签数组 |
| `excerpt` | 摘要 |

### 可选字段

| 字段 | 说明 |
|------|------|
| `lang` | 语言 `zh` 或 `en` |
| `author` | 作者（默认 quanquan1996） |

## 锚文本链接规范

博客文章中应自然嵌入工具站链接，用于 SEO 外链建设。

### 中文锚文本

```markdown
- [健美造型评分器](https://muscletool.pro/zh/tools/pose-comparator)
- [FFMI计算器](https://muscletool.pro/zh/tools/ffmi-calculator)
- [体脂夹计算器](https://muscletool.pro/zh/tools/skinfold-calculator)
- [BMR代谢计算器](https://muscletool.pro/zh/tools/bmr-calculator)
- [古典比例计算器](https://muscletool.pro/zh/tools/grecian-calculator)
- [碳循环计算器](https://muscletool.pro/zh/tools/carb-cycling-calculator)
- [减脂饮食计算器](https://muscletool.pro/zh/tools/fat-loss-diet-calculator)
- [高碳减脂计算器](https://muscletool.pro/zh/tools/high-carb-diet-calculator)
- [心率区间计算器](https://muscletool.pro/zh/tools/heart-rate-calculator)
- [代谢受损检测](https://muscletool.pro/zh/tools/metabolic-damage-test)
```

### 英文锚文本

```markdown
- [Bodybuilding Pose Comparator](https://muscletool.pro/en/tools/pose-comparator)
- [FFMI Calculator](https://muscletool.pro/en/tools/ffmi-calculator)
- [Skinfold Calculator](https://muscletool.pro/en/tools/skinfold-calculator)
- [BMR Calculator](https://muscletool.pro/en/tools/bmr-calculator)
- [Grecian Ideal Calculator](https://muscletool.pro/en/tools/grecian-calculator)
- [Carb Cycling Calculator](https://muscletool.pro/en/tools/carb-cycling-calculator)
- [Fat Loss Diet Calculator](https://muscletool.pro/en/tools/fat-loss-diet-calculator)
- [High Carb Diet Calculator](https://muscletool.pro/en/tools/high-carb-diet-calculator)
- [Heart Rate Calculator](https://muscletool.pro/en/tools/heart-rate-calculator)
- [Metabolic Damage Test](https://muscletool.pro/en/tools/metabolic-damage-test)
```

## 发布流程

### 1. 创建文章

```bash
# 在 docs/_posts/ 下创建 Markdown 文件
# 文件名格式：YYYY-MM-DD-slug.md
```

### 2. 提交并推送

```bash
git add docs/_posts/
git commit -m "blog: 新增文章标题"
git push origin master
```

### 3. 等待部署

GitHub Pages 会自动构建，通常 1-2 分钟后上线。

### 4. 查看部署状态

```powershell
gh api repos/quanquan1996/BodyBuildingQuan/pages/builds/latest
```

## 常用命令

```powershell
# 查看 Pages 状态
gh api repos/quanquan1996/BodyBuildingQuan/pages

# 查看最新构建
gh api repos/quanquan1996/BodyBuildingQuan/pages/builds/latest

# 列出所有构建
gh api repos/quanquan1996/BodyBuildingQuan/pages/builds
```

## 已发布文章

| 文章 | 语言 | URL |
|------|------|-----|
| 前端实现人体骨架检测与姿态对比 | 中文 | `/frontend-pose-detection-mediapipe/` |
| Building Human Pose Detection in Browser | 英文 | `/frontend-pose-detection-mediapipe-en/` |

## 博客主题

使用 Jekyll 默认主题 `minima`，配置在 `docs/_config.yml`。

## 外部发布平台

博客文章也可以同步发布到以下平台获取更多外链：

### 中文平台
- 掘金 (juejin.cn)
- CSDN
- 知乎专栏
- SegmentFault

### 英文平台
- Dev.to
- Medium
- Hashnode
- HackerNoon

发布时记得保留锚文本链接指向 muscletool.pro。
