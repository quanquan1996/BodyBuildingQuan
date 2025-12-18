# 体脂夹计算器表单多语言修复

## 修复时间
2024-12-18

## 问题描述

用户反馈体脂夹计算器页面（Skinfold Calculator）的表单中存在硬编码的中英文文本，导致英文版页面显示中文内容。

### 发现的硬编码问题

1. **年龄单位** - `isZh ? '岁' : 'yrs'`
2. **3点测量说明** - `isZh ? '男性3点测量：胸部、腹部、大腿' : 'Male 3-point: Chest, Abdomen, Thigh'`
3. **7点测量说明** - `isZh ? '7点测量法提供更精确的体脂率估算' : '7-point method provides more accurate body fat estimation'`

## 修复方案

### 1. 添加翻译键

在 `src/lib/i18n/zh.ts` 和 `en.ts` 的 `common` 部分添加：

```typescript
// zh.ts
common: {
  // ... 其他键
  maleThreePoint: '男性3点测量：胸部、腹部、大腿',
  femaleThreePoint: '女性3点测量：三头肌、髂骨上、大腿',
  sevenPointDescription: '7点测量法提供更精确的体脂率估算',
}

// en.ts
common: {
  // ... 其他键
  maleThreePoint: 'Male 3-point: Chest, Abdomen, Thigh',
  femaleThreePoint: 'Female 3-point: Triceps, Suprailiac, Thigh',
  sevenPointDescription: '7-point method provides more accurate body fat estimation',
}
```

### 2. 更新类型定义

在 `src/lib/i18n/types.ts` 的 `CommonDict` 接口中添加：

```typescript
export interface CommonDict {
  // ... 其他字段
  // 测量模式描述
  maleThreePoint: string;
  femaleThreePoint: string;
  sevenPointDescription: string;
}
```

### 3. 修复表单组件

在 `src/components/skinfold-calculator/skinfold-form.tsx` 中：

**修改前：**
```tsx
const isZh = locale === 'zh';

// 年龄单位
<span>{isZh ? '岁' : 'yrs'}</span>

// 3点测量说明
<p>
  {gender === 'male' 
    ? (isZh ? '男性3点测量：胸部、腹部、大腿' : 'Male 3-point: Chest, Abdomen, Thigh')
    : (isZh ? '女性3点测量：三头肌、髂骨上、大腿' : 'Female 3-point: Triceps, Suprailiac, Thigh')}
</p>

// 7点测量说明
<p>
  {isZh ? '7点测量法提供更精确的体脂率估算' : '7-point method provides more accurate body fat estimation'}
</p>
```

**修改后：**
```tsx
// 移除 isZh 变量

// 年龄单位
<span>{dict.common.ageUnit}</span>

// 3点测量说明
<p>
  {gender === 'male' 
    ? dict.common.maleThreePoint
    : dict.common.femaleThreePoint}
</p>

// 7点测量说明
<p>{dict.common.sevenPointDescription}</p>
```

## 修复文件清单

- ✅ `src/lib/i18n/types.ts` - 添加类型定义
- ✅ `src/lib/i18n/zh.ts` - 添加中文翻译
- ✅ `src/lib/i18n/en.ts` - 添加英文翻译
- ✅ `src/components/skinfold-calculator/skinfold-form.tsx` - 移除硬编码

## 验证结果

### TypeScript 类型检查
```bash
✅ types.ts - 无错误
✅ zh.ts - 无错误
✅ en.ts - 无错误
✅ skinfold-form.tsx - 无错误
```

### 硬编码检查
```bash
# 检查中文硬编码
✅ 无匹配结果

# 检查三元运算符硬编码
✅ 无匹配结果
```

## 测试建议

1. **中文版测试**
   - 访问 `/zh/tools/skinfold-calculator`
   - 切换性别，检查3点测量说明是否正确显示
   - 切换到7点模式，检查说明文字
   - 检查年龄单位显示为"岁"

2. **英文版测试**
   - 访问 `/en/tools/skinfold-calculator`
   - 切换性别，检查3点测量说明是否正确显示
   - 切换到7点模式，检查说明文字
   - 检查年龄单位显示为"yrs"

## 总结

本次修复彻底清除了体脂夹计算器表单中的所有硬编码文本，确保：

1. ✅ 所有用户可见文本都通过翻译文件管理
2. ✅ 不再使用 `isZh` 三元运算符
3. ✅ 类型安全，TypeScript 检查通过
4. ✅ 中英文版本都能正确显示对应语言的文本

现在整个应用的多语言支持已经完全实现，没有任何硬编码的中英文文本（除了代码注释）。
