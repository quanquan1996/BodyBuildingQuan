# i18n 多语言架构 - 模块化版本

## 架构概述

翻译文件已完全模块化，运行时和 AI 编程都使用同一套模块化文件。

## 目录结构

```
src/lib/i18n/
├── index.ts          # 主入口，从模块组装 Dictionary
├── types.ts          # 类型定义（Dictionary 接口）
├── README.md         # 本文档
└── locales/          # 模块化翻译文件（唯一数据源）
    ├── zh/           # 中文模块
    │   ├── index.ts  # 模块索引和导出
    │   ├── common.ts # 通用文本 (~6KB)
    │   ├── nav.ts    # 导航 (~0.4KB)
    │   ├── home.ts   # 首页 (~3.7KB)
    │   ├── footer.ts # 页脚 (~1KB)
    │   ├── ffmi.ts   # FFMI 计算器 (~5KB)
    │   ├── skinfold.ts
    │   ├── bmr.ts
    │   ├── heart-rate.ts
    │   ├── pose-comparator.ts
    │   ├── grecian.ts
    │   ├── carb-cycling.ts
    │   ├── fat-loss-diet.ts
    │   ├── high-carb-diet.ts
    │   └── metabolic-damage.ts
    └── en/           # 英文模块（结构相同）
```

## AI 编程指南

### 查看/修改翻译

直接读取对应的模块文件：
```
# 修改 FFMI 计算器翻译
读取: locales/zh/ffmi.ts 或 locales/en/ffmi.ts

# 修改通用文本
读取: locales/zh/common.ts 或 locales/en/common.ts
```

### 新增工具翻译（推荐流程）

1. **创建模块文件**
   - `locales/zh/new-tool.ts` - 包含类型定义和中文翻译
   - `locales/en/new-tool.ts` - 英文翻译（导入中文类型）

2. **更新模块索引**
   - `locales/zh/index.ts` - 添加导出
   - `locales/en/index.ts` - 添加导出

3. **同步到主文件**（可选，保持兼容）
   - 将模块内容复制到 `zh.ts` 和 `en.ts`
   - 更新 `types.ts` 添加类型

### 模块文件模板

**中文模块 (locales/zh/xxx.ts):**
```typescript
// XXX 计算器 - 中文

export interface XXXCalculatorDict {
  title: string;
  description: string;
  // ... 其他字段
}

export const xxxCalculator: XXXCalculatorDict = {
  title: 'XXX计算器',
  description: '描述...',
  // ... 翻译内容
};
```

**英文模块 (locales/en/xxx.ts):**
```typescript
// XXX Calculator - English

import type { XXXCalculatorDict } from '../zh/xxx';

export const xxxCalculator: XXXCalculatorDict = {
  title: 'XXX Calculator',
  description: 'Description...',
  // ... 翻译内容
};
```

## 迁移状态 ✅ 全部完成

| 模块 | 状态 | 中文大小 | 英文大小 |
|------|------|----------|----------|
| common | ✅ 已迁移 | 6.0KB | 4.0KB |
| nav | ✅ 已迁移 | 0.4KB | 0.3KB |
| home | ✅ 已迁移 | 3.7KB | 2.9KB |
| footer | ✅ 已迁移 | 1.0KB | 0.8KB |
| ffmi | ✅ 已迁移 | 4.9KB | 3.8KB |
| skinfold | ✅ 已迁移 | 9.5KB | 7.3KB |
| bmr | ✅ 已迁移 | 5.0KB | 3.6KB |
| heart-rate | ✅ 已迁移 | 4.1KB | 3.3KB |
| pose-comparator | ✅ 已迁移 | 7.5KB | 5.8KB |
| grecian | ✅ 已迁移 | 5.2KB | 4.5KB |
| carb-cycling | ✅ 已迁移 | 5.0KB | 4.2KB |
| fat-loss-diet | ✅ 已迁移 | 5.5KB | 4.0KB |
| high-carb-diet | ✅ 已迁移 | 5.3KB | 4.8KB |
| metabolic-damage | ✅ 已迁移 | 7.8KB | 6.5KB |

**模块化文件总大小：** 中文 ~72KB，英文 ~56KB（共 ~128KB，28个文件）

**对比原始文件：** zh.ts (54KB) + en.ts (58KB) + types.ts (22KB) = 134KB

**优化效果：** AI 编程时只需读取相关模块（3-10KB），而非整个翻译文件

## 注意事项

1. **运行时仍使用主文件** - `index.ts` 从 `zh.ts`/`en.ts` 加载，模块化文件仅供 AI 编程参考
2. **类型定义在模块中** - 每个模块包含自己的类型，避免读取大型 `types.ts`
3. **英文模块导入中文类型** - 保持类型一致性，减少重复定义
4. **逐步迁移** - 不需要一次性迁移所有模块，按需迁移即可
