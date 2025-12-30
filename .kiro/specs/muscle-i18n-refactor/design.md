# Design Document

## Overview

将3D肌肉解剖工具的国际化翻译文件进行模块化重构，将 `muscleDetails` 拆分为按身体部位分组的独立模块，并分批完善所有肌肉的中英文详情内容。

## Architecture

### 重构后的文件结构

```
src/lib/i18n/locales/
├── zh/
│   ├── muscle-anatomy.ts              # 主文件（UI文本 + muscles名称）
│   ├── muscle-details-upper.ts        # 上肢肌肉详情
│   ├── muscle-details-torso.ts        # 躯干肌肉详情
│   └── muscle-details-lower.ts        # 下肢肌肉详情
└── en/
    ├── muscle-anatomy.ts              # 主文件（UI文本 + muscles名称）
    ├── muscle-details-upper.ts        # 上肢肌肉详情
    ├── muscle-details-torso.ts        # 躯干肌肉详情
    └── muscle-details-lower.ts        # 下肢肌肉详情
```

### 模块划分

#### 上肢模块 (muscle-details-upper.ts)
包含约 40 块肌肉：
- 三角肌（前/中/后束，锁骨部/肩峰部/肩胛棘部）
- 肱二头肌（长头/短头）
- 肱三头肌（长头/外侧头/内侧头）
- 肱肌、喙肱肌、肘肌
- 前臂屈肌群、伸肌群
- 手部肌肉

#### 躯干模块 (muscle-details-torso.ts)
包含约 60 块肌肉：
- 胸大肌（锁骨部/胸肋部/腹部）、胸小肌
- 背阔肌、斜方肌（上/中/下部）
- 菱形肌、肩胛提肌
- 肩袖肌群（冈上肌、冈下肌、小圆肌、肩胛下肌）
- 竖脊肌、多裂肌等脊柱肌群
- 腹直肌、腹斜肌、腹横肌
- 前锯肌、肋间肌
- 颈部肌肉、面部肌肉

#### 下肢模块 (muscle-details-lower.ts)
包含约 50 块肌肉：
- 臀大肌、臀中肌、臀小肌
- 髂腰肌、梨状肌等髋部深层肌
- 股四头肌（股直肌、股外侧肌、股内侧肌、股中间肌）
- 腘绳肌（股二头肌、半腱肌、半膜肌）
- 内收肌群
- 腓肠肌、比目鱼肌
- 胫骨前肌、腓骨肌群
- 足部肌肉

## Data Models

### MuscleDetail 类型定义

```typescript
// 单个肌肉详情
export interface MuscleDetail {
  description: string;     // 解剖描述（100-200字）
  functions: string[];     // 功能列表（3-5项）
  exercises: string[];     // 训练动作（4-6项）
}

// 肌肉详情集合
export type MuscleDetailsMap = Record<string, MuscleDetail>;
```

### 模块导出格式

```typescript
// muscle-details-upper.ts
export const muscleDetailsUpper: MuscleDetailsMap = {
  deltoid_anterior: {
    description: '...',
    functions: ['...', '...'],
    exercises: ['...', '...'],
  },
  // ...
};
```

### 主文件合并

```typescript
// muscle-anatomy.ts
import { muscleDetailsUpper } from './muscle-details-upper';
import { muscleDetailsTorso } from './muscle-details-torso';
import { muscleDetailsLower } from './muscle-details-lower';

export const muscleAnatomy = {
  // ... UI 文本
  muscles: { /* 肌肉名称翻译 */ },
  muscleDetails: {
    ...muscleDetailsUpper,
    ...muscleDetailsTorso,
    ...muscleDetailsLower,
  },
};
```

## Components and Interfaces

### 类型更新 (types.ts)

```typescript
export interface MuscleDetail {
  description: string;
  functions: string[];
  exercises: string[];
}

export interface MuscleAnatomyDict {
  title: string;
  description: string;
  metaDescription: string;
  controls: {
    frontView: string;
    backView: string;
    reset: string;
    superficialLayer: string;
    deepLayer: string;
  };
  loading: string;
  webglError: string;
  clickToView: string;
  selectedMuscle: string;
  muscleGroups: {
    upper: string;
    torso: string;
    lower: string;
  };
  detailPanel: {
    tabs: {
      overview: string;
      functions: string;
      exercises: string;
    };
    placeholder: string;
    close: string;
  };
  explanation: {
    title: string;
    whatIs: string;
    whatIsContent: string;
    benefits: string;
    benefitsList: string[];
    howToUse: string;
    howToUseList: string[];
  };
  muscles: Record<string, string>;
  muscleDetails: Record<string, MuscleDetail>;
}
```

## Implementation Priority

### 第一批：主要训练肌群（约 30 块）

| 部位 | 肌肉 | 优先级 |
|------|------|--------|
| 胸 | pectoralis_major, clavicular_head, sternocostal_head | P0 |
| 背 | latissimus_dorsi, trapezius (3部分), rhomboids | P0 |
| 肩 | deltoid_anterior, deltoid_lateral, deltoid_posterior | P0 |
| 臂 | biceps_brachii (2头), triceps_brachii (3头), brachialis | P0 |
| 腿 | quadriceps (4头), hamstrings (3块), gluteus_maximus | P0 |
| 小腿 | gastrocnemius, soleus | P0 |
| 核心 | rectus_abdominis, external_oblique, erector_spinae | P0 |

### 第二批：次要肌群（约 40 块）

| 部位 | 肌肉 | 优先级 |
|------|------|--------|
| 肩袖 | supraspinatus, infraspinatus, teres_minor, subscapularis | P1 |
| 前臂 | brachioradialis, forearm_flexors, forearm_extensors | P1 |
| 臀 | gluteus_medius, gluteus_minimus, piriformis | P1 |
| 内收 | adductor_magnus, adductor_longus, gracilis | P1 |
| 核心 | internal_oblique, transverse_abdominis, serratus_anterior | P1 |
| 小腿 | tibialis_anterior, peroneus_longus | P1 |

### 第三批：辅助肌群（约 80 块）

| 部位 | 肌肉 | 优先级 |
|------|------|--------|
| 颈部 | sternocleidomastoid, scalenes, platysma | P2 |
| 面部 | masseter, temporalis, orbicularis | P2 |
| 手部 | lumbricals, interossei, thenar muscles | P2 |
| 足部 | foot muscles | P2 |
| 深层 | multifidus, rotatores, iliopsoas | P2 |

## Error Handling

### 缺失详情处理

```typescript
// 在组件中处理缺失的详情
function getMuscleDetail(muscleId: string, dict: Dictionary): MuscleDetail {
  const detail = dict.muscleAnatomy.muscleDetails[muscleId];
  
  if (!detail) {
    return {
      description: dict.muscleAnatomy.detailPanel.placeholder,
      functions: [],
      exercises: [],
    };
  }
  
  return detail;
}
```

## Testing Strategy

### 验证清单

1. **类型检查** - `npm run type-check` 通过
2. **构建检查** - `npm run build` 成功
3. **中英文一致性** - 确保两种语言的 muscleDetails 键完全一致
4. **内容完整性** - 每个详情都有 description、functions、exercises

