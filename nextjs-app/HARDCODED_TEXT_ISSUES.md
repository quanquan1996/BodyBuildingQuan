# 多语言硬编码问题检查报告

生成时间：2024-12-18

## 问题概述

项目中存在大量硬编码的中文文本，违反了多语言开发规范。这些硬编码文本分布在旧路由页面、组件和配置文件中。

**统计数据：**
- 旧路由目录：10 个工具目录
- 旧路由文件：20 个文件（每个工具 2 个文件：page.tsx + layout.tsx）
- 需要修复的组件：至少 3 个核心组件 + 多个工具特定组件

## 严重问题

### 1. 旧路由页面未删除 ❌

`src/app/tools/` 下的旧路由页面仍然存在，这些页面包含大量硬编码的中文文本：

**需要删除的文件：**
- `src/app/tools/ffmi-calculator/page.tsx`
- `src/app/tools/ffmi-calculator/layout.tsx`
- `src/app/tools/skinfold-calculator/page.tsx`
- `src/app/tools/skinfold-calculator/layout.tsx`
- `src/app/tools/bmr-calculator/page.tsx`
- `src/app/tools/bmr-calculator/layout.tsx`
- `src/app/tools/heart-rate-calculator/page.tsx`
- `src/app/tools/heart-rate-calculator/layout.tsx`
- `src/app/tools/grecian-calculator/page.tsx`
- `src/app/tools/grecian-calculator/layout.tsx`
- `src/app/tools/pose-comparator/page.tsx`
- `src/app/tools/pose-comparator/layout.tsx`
- `src/app/tools/carb-cycling-calculator/page.tsx`
- `src/app/tools/carb-cycling-calculator/layout.tsx`
- `src/app/tools/fat-loss-diet-calculator/page.tsx`
- `src/app/tools/fat-loss-diet-calculator/layout.tsx`
- `src/app/tools/high-carb-diet-calculator/page.tsx`
- `src/app/tools/high-carb-diet-calculator/layout.tsx`
- `src/app/tools/metabolic-damage-test/page.tsx`
- `src/app/tools/metabolic-damage-test/layout.tsx`

**问题示例：**
```tsx
// ❌ 错误：硬编码中文
<ToolHero
  toolId="ffmi-calculator"
  title="FFMI 计算器"
  description="评估去脂体重指数，科学分析身体成分"
/>

// ❌ 错误：硬编码 JSON-LD
const jsonLd = {
  name: 'FFMI计算器 - 无脂肪体重指数在线计算',
  description: '免费在线FFMI计算器...',
};
```

### 2. 组件中的硬编码文本 ❌

多个组件包含硬编码的中文文本，未使用 `dict` 参数：

#### `src/components/skinfold-calculator/skinfold-guide.tsx`
```tsx
// ❌ 错误：所有文本都是硬编码的中文
<CardTitle className="flex items-center gap-2">
  <span className="text-2xl">📖</span>
  测量部位详解
</CardTitle>

<h4 className="font-medium mb-2 flex items-center gap-2">
  <span>💡</span> 测量技巧
</h4>
<ul className="text-sm text-muted-foreground space-y-1">
  <li>• 使用专业体脂夹，确保刻度清晰可读</li>
  <li>• 用拇指和食指捏起皮褶，距离约 1cm</li>
  ...
</ul>
```

**需要修复：** 该组件需要接收 `dict` 参数并使用翻译键

#### `src/components/common/related-tools.tsx`
```tsx
// ❌ 错误：硬编码中文
const displayTitle = title || (isZh ? '相关工具推荐' : 'Related Tools');

<Link href={`/${locale}`}>
  {isZh ? '查看全部' : 'View All'}
</Link>
```

**需要修复：** 应该从 `dict.common` 中获取这些文本

### 3. 其他组件中的硬编码

需要检查以下组件是否有硬编码：
- `src/components/bmr-calculator/bmr-form.tsx` - 包含注释中的中文
- `src/components/bmr-calculator/bmr-result.tsx` - 包含硬编码的中文标签
- 其他所有 `*-form.tsx`, `*-result.tsx`, `*-explanation.tsx`, `*-reference.tsx` 组件

## 修复建议

### 1. 立即删除旧路由

```bash
# 删除整个旧路由目录
rm -rf nextjs-app/src/app/tools
```

### 2. 修复 `skinfold-guide.tsx`

```tsx
// ✅ 正确：使用 dict 参数
interface SkinfoldGuideProps {
  dict: Dictionary;
}

export function SkinfoldGuide({ dict }: SkinfoldGuideProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {dict.skinfoldCalculator.guide.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>💡</span> {dict.skinfoldCalculator.guide.tips.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {dict.skinfoldCalculator.guide.tips.items.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. 修复 `related-tools.tsx`

```tsx
// ✅ 正确：使用 dict 参数
interface RelatedToolsProps {
  currentToolId: ToolId;
  relatedToolIds?: ToolId[];
  title?: string;
  locale: string;
  dict: Dictionary;
}

export function RelatedTools({ 
  currentToolId, 
  relatedToolIds,
  title,
  locale,
  dict
}: RelatedToolsProps) {
  const displayTitle = title || dict.common.relatedTools;
  
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">{displayTitle}</h3>
        <Link href={`/${locale}`}>
          {dict.common.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      ...
    </div>
  );
}
```

### 4. 更新翻译文件

在 `src/lib/i18n/zh.ts` 和 `en.ts` 中添加缺失的翻译键：

```typescript
// zh.ts
export const zh = {
  common: {
    relatedTools: '相关工具推荐',
    viewAll: '查看全部',
    // ...
  },
  skinfoldCalculator: {
    guide: {
      title: '测量部位详解',
      tips: {
        title: '测量技巧',
        items: [
          '使用专业体脂夹，确保刻度清晰可读',
          '用拇指和食指捏起皮褶，距离约 1cm',
          // ...
        ],
      },
      // ...
    },
  },
};

// en.ts
export const en = {
  common: {
    relatedTools: 'Related Tools',
    viewAll: 'View All',
    // ...
  },
  skinfoldCalculator: {
    guide: {
      title: 'Measurement Sites Guide',
      tips: {
        title: 'Measurement Tips',
        items: [
          'Use a professional skinfold caliper with clear markings',
          'Pinch the skin with thumb and forefinger about 1cm apart',
          // ...
        ],
      },
      // ...
    },
  },
};
```

## 检查清单

- [ ] 删除 `src/app/tools/` 下的所有旧路由文件
- [ ] 修复 `skinfold-guide.tsx` 组件
- [ ] 修复 `related-tools.tsx` 组件
- [ ] 检查所有 `*-form.tsx` 组件
- [ ] 检查所有 `*-result.tsx` 组件
- [ ] 检查所有 `*-explanation.tsx` 组件
- [ ] 检查所有 `*-reference.tsx` 组件
- [ ] 更新翻译文件添加缺失的键
- [ ] 测试中英文切换功能
- [ ] 验证所有页面无硬编码文本

## 注意事项

1. **注释可以保留中文**：代码注释中的中文不需要翻译
2. **console.log 可以保留中文**：调试信息不需要翻译
3. **所有用户可见的文本必须使用 dict**：包括标题、描述、按钮文字、提示信息等
4. **组件必须接收 locale 和 dict 参数**：确保组件可以支持多语言
5. **链接必须包含 locale 前缀**：所有内部链接格式为 `/${locale}/path`

## 优先级

1. **高优先级**：删除旧路由文件（避免路由冲突）
2. **中优先级**：修复常用组件（如 related-tools, tool-hero）
3. **低优先级**：修复不常用的说明组件
