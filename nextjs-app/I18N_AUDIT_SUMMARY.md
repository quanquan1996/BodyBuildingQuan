# 多语言国际化审计总结

生成时间：2024-12-18

## 执行摘要

项目正在从单语言（中文）迁移到多语言（中文/英文）架构。审计发现：

✅ **已完成：**
- 新的多语言路由结构 `[locale]/` 已建立
- 翻译文件 `zh.ts` 和 `en.ts` 已创建
- 大部分核心组件已支持多语言（接收 `dict` 参数）

❌ **待处理：**
- 旧路由 `src/app/tools/` 仍然存在（20个文件）
- 少数组件缺少多语言支持
- 部分组件有硬编码文本

## 详细发现

### 1. 旧路由文件（高优先级 - 必须删除）

**位置：** `src/app/tools/`

**问题：** 这些文件包含大量硬编码中文，且与新的 `[locale]` 路由冲突

**影响：** 可能导致路由混乱，SEO 问题，维护困难

**需要删除的目录：**
```
src/app/tools/
├── bmr-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── carb-cycling-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── fat-loss-diet-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── ffmi-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── grecian-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── heart-rate-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── high-carb-diet-calculator/
│   ├── layout.tsx
│   └── page.tsx
├── metabolic-damage-test/
│   ├── layout.tsx
│   └── page.tsx
├── pose-comparator/
│   ├── layout.tsx
│   └── page.tsx
└── skinfold-calculator/
    ├── layout.tsx
    └── page.tsx
```

**修复命令：**
```bash
rm -rf nextjs-app/src/app/tools
```

### 2. 缺少多语言支持的组件

#### 2.1 `skinfold-guide.tsx` ❌

**位置：** `src/components/skinfold-calculator/skinfold-guide.tsx`

**问题：** 
- 不接收 `dict` 参数
- 所有文本都是硬编码中文

**硬编码示例：**
```tsx
<CardTitle>测量部位详解</CardTitle>
<h4>💡 测量技巧</h4>
<li>• 使用专业体脂夹，确保刻度清晰可读</li>
```

**修复方案：**
1. 添加 `dict: Dictionary` 参数
2. 在翻译文件中添加 `skinfoldCalculator.guide.*` 键
3. 替换所有硬编码文本为 `dict.skinfoldCalculator.guide.*`

#### 2.2 `related-tools.tsx` ⚠️

**位置：** `src/components/common/related-tools.tsx`

**问题：** 
- 虽然接收 `locale` 参数，但使用三元运算符硬编码文本
- 未接收 `dict` 参数

**硬编码示例：**
```tsx
const displayTitle = title || (isZh ? '相关工具推荐' : 'Related Tools');
{isZh ? '查看全部' : 'View All'}
```

**修复方案：**
1. 添加 `dict: Dictionary` 参数
2. 使用 `dict.common.relatedTools` 和 `dict.common.viewAll`

#### 2.3 `ffmi-chart.tsx` ⚠️

**位置：** `src/components/ffmi-calculator/ffmi-chart.tsx`

**问题：** 不接收 `dict` 参数，可能包含硬编码文本

**需要检查：** 是否有用户可见的文本需要翻译

### 3. 已正确实现多语言的组件 ✅

以下组件已正确接收 `locale` 和 `dict` 参数：

**表单组件：**
- `ffmi-form.tsx`
- `skinfold-form.tsx`
- `bmr-form.tsx`
- `heart-rate-form.tsx`
- `grecian-form.tsx`
- `carb-cycling-form.tsx`
- `fat-loss-diet-form.tsx`
- `high-carb-diet-form.tsx`
- `metabolic-damage-form.tsx`

**结果组件：**
- `ffmi-result.tsx`
- `skinfold-result.tsx`
- `bmr-result.tsx`
- `heart-rate-result.tsx`
- `grecian-result.tsx`
- `carb-cycling-result.tsx`
- `fat-loss-diet-result.tsx`
- `high-carb-diet-result.tsx`
- `metabolic-damage-result.tsx`

**说明组件：**
- `ffmi-explanation.tsx`
- `skinfold-explanation.tsx`
- `bmr-explanation.tsx`
- `heart-rate-explanation.tsx`
- `grecian-explanation.tsx`
- `carb-cycling-explanation.tsx`
- `fat-loss-diet-explanation.tsx`
- `high-carb-diet-explanation.tsx`
- `metabolic-damage-explanation.tsx`

**参考组件：**
- `ffmi-reference.tsx`
- `skinfold-reference.tsx`
- `bmr-reference.tsx`
- `grecian-reference.tsx`
- `carb-cycling-reference.tsx`
- `fat-loss-diet-reference.tsx`
- `high-carb-diet-reference.tsx`
- `metabolic-damage-reference.tsx`

**布局组件：**
- `site-header.tsx`
- `mobile-nav.tsx`
- `footer.tsx`
- `language-switcher.tsx`

**首页组件：**
- `hero-section.tsx`
- `feature-grid.tsx`
- `use-cases.tsx`
- `why-choose-us.tsx`

### 4. 翻译文件状态

**位置：**
- `src/lib/i18n/zh.ts` - 中文翻译
- `src/lib/i18n/en.ts` - 英文翻译

**状态：** ✅ 大部分翻译已完成

**缺失的翻译键：**
- `common.relatedTools`
- `common.viewAll`
- `skinfoldCalculator.guide.*` (整个 guide 部分)

## 修复优先级

### P0 - 立即处理（阻塞性问题）

1. **删除旧路由目录**
   - 文件：`src/app/tools/` 整个目录
   - 原因：与新路由冲突，包含大量硬编码
   - 工作量：1 分钟（执行删除命令）

### P1 - 高优先级（影响用户体验）

2. **修复 `related-tools.tsx`**
   - 原因：在所有工具页面底部显示，用户可见度高
   - 工作量：15 分钟

3. **修复 `skinfold-guide.tsx`**
   - 原因：体脂夹计算器的重要说明组件
   - 工作量：30 分钟

### P2 - 中优先级（完善性）

4. **检查 `ffmi-chart.tsx`**
   - 原因：可能包含硬编码文本
   - 工作量：10 分钟

5. **添加缺失的翻译键**
   - 在 `zh.ts` 和 `en.ts` 中添加
   - 工作量：20 分钟

## 测试检查清单

修复完成后，需要验证：

- [ ] 删除旧路由后，所有工具页面仍可通过 `/zh/tools/*` 和 `/en/tools/*` 访问
- [ ] 中文版所有文本显示正确
- [ ] 英文版所有文本显示正确
- [ ] 语言切换功能正常
- [ ] 没有控制台错误（缺失翻译键）
- [ ] 所有链接包含正确的 locale 前缀
- [ ] SEO metadata 正确（中英文版本）
- [ ] Sitemap 包含所有多语言 URL

## 最佳实践提醒

### ✅ 正确做法

```tsx
// 组件接收 dict 参数
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

### ❌ 错误做法

```tsx
// 硬编码文本
<h1>FFMI 计算器</h1>

// 三元运算符硬编码
{isZh ? '计算' : 'Calculate'}

// 缺少 locale 前缀
<Link href="/tools/ffmi-calculator">

// 不接收 dict 参数
export function MyComponent() {
  return <div>硬编码文本</div>;
}
```

## 注意事项

1. **注释可以保留中文** - 代码注释不需要翻译
2. **console.log 可以保留中文** - 调试信息不需要翻译
3. **所有用户可见文本必须使用 dict** - 包括标题、描述、按钮、提示等
4. **组件必须接收 locale 和 dict** - 确保可以支持多语言
5. **链接必须包含 locale 前缀** - 格式：`/${locale}/path`

## 估算工作量

| 任务 | 工作量 | 优先级 |
|------|--------|--------|
| 删除旧路由 | 1 分钟 | P0 |
| 修复 related-tools.tsx | 15 分钟 | P1 |
| 修复 skinfold-guide.tsx | 30 分钟 | P1 |
| 检查 ffmi-chart.tsx | 10 分钟 | P2 |
| 添加缺失翻译键 | 20 分钟 | P2 |
| 测试验证 | 30 分钟 | - |
| **总计** | **约 2 小时** | - |

## 结论

项目的多语言架构基础已经很好，大部分组件已正确实现。主要问题是：

1. **旧路由文件未删除** - 这是最紧急的问题
2. **少数组件缺少多语言支持** - 需要补充
3. **部分翻译键缺失** - 需要添加

完成上述修复后，项目将完全支持中英文双语，符合国际化最佳实践。
