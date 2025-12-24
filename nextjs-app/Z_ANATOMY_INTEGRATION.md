# Z-Anatomy 3D 模型集成文档

## 概述

本文档记录了 Z-Anatomy 人体解剖模型集成到 3D 肌肉解剖展示工具的过程和技术细节。

## 模型来源

- **项目**: Z-Anatomy (开源人体解剖学 Blender 项目)
- **官网**: https://www.z-anatomy.com/
- **许可**: GPL-3.0
- **原始格式**: Blender (.blend)
- **原始大小**: ~300MB

## 导出后的模型

- **文件**: `public/models/muscle-anatomy.glb`
- **大小**: 6.83 MB (7,164,860 bytes)
- **格式**: GLB (glTF Binary) + Draco 压缩
- **对象数量**: 1106 个子对象
- **肌肉 mesh 数量**: ~1350 个

## 模型尺寸信息

```
Model size: { x: 0.66, y: 1.68, z: 0.26 }
Model center: { x: 0, y: 0.84, z: 0 }
```

- 模型高度约 1.68 米（真实人体比例）
- 模型中心在 y=0.84，需要向下偏移 0.84 使模型居中

## 导出脚本

### 命令行导出 (推荐)

```bash
# 使用 Blender 5.0 命令行导出
"C:\Program Files\Blender Foundation\Blender 5.0\blender.exe" Z-Anatomy/Startup.blend --background --python Z-Anatomy/export_cli.py
```

### 导出脚本位置

- `Z-Anatomy/export_cli.py` - 命令行导出脚本
- `Z-Anatomy/export_muscles_glb.py` - Blender GUI 导出脚本
- `Z-Anatomy/EXPORT_GUIDE.md` - 详细导出指南

### 导出参数 (Blender 5.0)

```python
bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    use_selection=True,
    export_apply=True,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_materials='EXPORT',
)
```

注意: Blender 5.0 移除了 `export_colors` 参数。

## Z-Anatomy 命名规范

### Mesh 命名格式

```
[Muscle name].[suffix]
```

后缀说明:
- `.l` / `.r` - 左侧/右侧
- `.el` / `.er` - 左侧/右侧的某个部分
- `.ol` / `.or` - 左侧/右侧的起点
- `.j` - 标签/关节
- `.t` - 文本标签

### 示例

```
Pectoralis major muscle.l      # 左侧胸大肌
Pectoralis major muscle.r      # 右侧胸大肌
Biceps brachii muscle.el       # 肱二头肌的某部分
Deltoid region.l               # 三角肌区域（非肌肉，需隐藏）
```

## 多语言支持 (i18n)

### 翻译文件位置

肌肉名称翻译存储在 i18n 模块中：

```
src/lib/i18n/locales/
├── zh/muscle-anatomy.ts    # 中文翻译（150+ 肌肉名称）
└── en/muscle-anatomy.ts    # 英文翻译
```

### 翻译结构

```typescript
// src/lib/i18n/locales/zh/muscle-anatomy.ts
export const muscleAnatomy = {
  title: '3D肌肉解剖图',
  // ... 其他 UI 文本
  muscles: {
    // 上肢
    deltoid_anterior: '三角肌前束',
    biceps_brachii: '肱二头肌',
    triceps_brachii: '肱三头肌',
    // 躯干
    pectoralis_major: '胸大肌',
    latissimus_dorsi: '背阔肌',
    rectus_abdominis: '腹直肌',
    // 下肢
    gluteus_maximus: '臀大肌',
    quadriceps_femoris: '股四头肌',
    gastrocnemius: '腓肠肌',
    // ... 150+ 肌肉
  },
};
```

### 已翻译的肌肉分类

| 部位 | 肌肉数量 | 示例 |
|------|---------|------|
| 上肢 (upper) | ~50 | 三角肌、肱二头肌、前臂肌群、手部肌肉 |
| 躯干 (torso) | ~60 | 胸肌、背肌、腹肌、颈部肌肉、面部肌肉 |
| 下肢 (lower) | ~50 | 臀肌、大腿肌群、小腿肌群、足部肌肉 |

### 肌肉名称获取流程

```
Z-Anatomy 模型名称 → getMuscleIdFromModelName() → 肌肉 ID → 翻译字典 → 显示名称
```

1. 从 3D 模型获取 mesh 名称（如 `Pectoralis major muscle.l`）
2. 通过 `getMuscleIdFromModelName()` 转换为标准 ID（如 `pectoralis_major`）
3. 从翻译字典获取中英文名称

### MuscleTooltip 组件

```typescript
// src/components/muscle-anatomy/muscle-tooltip.tsx
import { muscleAnatomy as zhMuscleAnatomy } from '@/lib/i18n/locales/zh/muscle-anatomy';
import { muscleAnatomy as enMuscleAnatomy } from '@/lib/i18n/locales/en/muscle-anatomy';

function getMuscleName(muscleId: string, locale: Locale) {
  const zhName = zhMuscleAnatomy.muscles[muscleId];
  const enName = enMuscleAnatomy.muscles[muscleId];
  
  return {
    primary: locale === 'zh' ? zhName : enName,
    secondary: locale === 'zh' ? enName : zhName,
  };
}
```

## 代码实现细节

### 肌肉识别关键词

```typescript
const muscleKeywords = [
  'muscle', 'deltoid', 'bicep', 'tricep', 'pectoralis', 'latissimus',
  'trapezius', 'rectus', 'oblique', 'gluteus', 'quadricep', 'vastus',
  'hamstring', 'gastrocnemius', 'soleus', 'tibialis', 'serratus',
  'rhomboid', 'erector', 'teres', 'infraspinatus', 'adductor',
  'brachialis', 'forearm', 'flexor', 'extensor', 'femoris',
  'semitendinosus', 'semimembranosus', 'tensor', 'sartorius',
  'gracilis', 'piriformis', 'iliopsoas', 'subscapularis', 'supraspinatus',
  'longissimus', 'iliocostalis', 'spinalis', 'multifidus', 'scalenus',
  'sternocleidomastoid', 'omohyoid', 'sternohyoid', 'thyrohyoid',
  'digastric', 'mylohyoid', 'geniohyoid', 'stylohyoid', 'masseter',
  'temporalis', 'pterygoid', 'orbicularis', 'zygomaticus', 'frontalis',
  'occipitalis', 'nasalis', 'mentalis', 'risorius', 'procerus',
  'platysma', 'longus', 'iliacus', 'psoas', 'quadratus', 'popliteus',
  'plantaris', 'interossei', 'lumbrical', 'opponens', 'abductor',
  'pronator', 'supinator', 'anconeus', 'coracobrachialis',
  'sternocostal', 'clavicular head', 'intercostal', 'transversus',
  'pyramidalis', 'subclavius',
];
```

### 需要隐藏的对象关键词

Z-Anatomy 包含很多非肌肉对象（区域标记、筋膜、韧带等），需要隐藏：

```typescript
const HIDDEN_KEYWORDS = [
  'region',           // 区域标记
  'fascia',           // 筋膜
  'bursa',            // 滑囊
  'tendon sheath',    // 腱鞘
  'retinaculum',      // 支持带
  'membrane',         // 膜
  'ligament',         // 韧带
  'nodes',            // 淋巴结
  'fissure',          // 裂隙
  'groove',           // 沟
  'notch',            // 切迹
  'border',           // 边缘
  'line',             // 线
  'cord',             // 索
  'gyrus',            // 脑回
  '.j',               // Z-Anatomy 标签后缀
  '.t',               // Z-Anatomy 文本后缀
  'joints',           // 关节
  'compartment',      // 间隙
  'pectoral girdle',  // 胸带（骨骼结构）
  'interpectoral',    // 胸肌间淋巴结
];
```

### 颜色配置

```typescript
const HIGHLIGHT_COLOR = new THREE.Color(0x5ac57a);  // 薄荷绿 - 悬停高亮
const SELECTED_COLOR = new THREE.Color(0x4caf50);   // 深绿 - 选中状态

// 肌肉颜色调色板 - 自然的肌肉红色系
const MUSCLE_COLORS = [
  new THREE.Color(0xb85450), // 深红
  new THREE.Color(0xc96b67), // 中红
  new THREE.Color(0xd4817e), // 浅红
  new THREE.Color(0xa84a47), // 暗红
  new THREE.Color(0xbe5f5c), // 玫瑰红
  new THREE.Color(0xcc7673), // 珊瑚红
  new THREE.Color(0x9e4340), // 砖红
  new THREE.Color(0xb35855), // 赭红
];
```

### 模型位置和缩放

```typescript
<primitive
  object={clonedScene}
  scale={1}                    // 不需要缩放，模型已是真实比例
  position={[0, -0.84, 0]}     // 向下偏移使模型居中
  rotation={[0, 0, 0]}
/>
```

### 相机设置

```typescript
// 初始相机位置
camera={{ position: [1.5, 0.3, 2], fov: 50 }}

// 视图切换位置
const positions = {
  front: [0, 0.2, 2.5],    // 正面
  back: [0, 0.2, -2.5],    // 背面
  default: [1.5, 0.3, 2],  // 默认斜视角
};

// OrbitControls 设置
minDistance={1}
maxDistance={5}
```

## 肌肉数据映射

### 文件位置

`src/lib/data/muscles.ts`

### 数据结构

```typescript
// 肌肉信息只存储 ID 和分组，名称通过 i18n 获取
export interface MuscleInfo {
  id: string;           // 肌肉 ID（用于翻译键）
  group: 'upper' | 'torso' | 'lower';  // 身体部位分组
}

export const muscleData: MuscleInfo[] = [
  { id: 'deltoid_anterior', group: 'upper' },
  { id: 'pectoralis_major', group: 'torso' },
  { id: 'gluteus_maximus', group: 'lower' },
  // ... 150+ 肌肉
];
```

### 别名映射

用于将 Z-Anatomy 模型名称映射到标准肌肉 ID：

```typescript
const muscleAliases: Record<string, string[]> = {
  'pectoralis_major': ['pectoralis major', 'sternocostal head of pectoralis major', 'clavicular head of pectoralis major'],
  'biceps_brachii': ['biceps brachii', 'long head of biceps brachii', 'short head of biceps brachii'],
  'gastrocnemius': ['gastrocnemius', 'lateral head of gastrocnemius', 'medial head of gastrocnemius'],
  'trapezius': ['trapezius', 'descending part of trapezius', 'transverse part of trapezius', 'ascending part of trapezius'],
  // ... 更多映射
};
```

### 核心函数

```typescript
// 从 Z-Anatomy 模型名称获取肌肉 ID
export function getMuscleIdFromModelName(modelName: string): string | undefined;

// 根据 ID 获取肌肉信息
export function getMuscleById(id: string): MuscleInfo | undefined;

// 按分组获取肌肉
export function getMusclesByGroup(group: 'upper' | 'torso' | 'lower'): MuscleInfo[];
```

## 后续开发建议

### 1. 优化模型大小

如果 6.83MB 太大，可以：
- 在 Blender 中使用 Decimate Modifier 降低面数
- 只导出主要肌肉群
- 提高 Draco 压缩级别

### 2. 添加更多肌肉信息

在翻译文件中为每块肌肉添加：
- 功能描述
- 训练动作
- 拉伸方法

### 3. 肌肉分组显示

可以添加按身体部位分组显示/隐藏的功能：
- 上肢肌肉
- 躯干肌肉
- 下肢肌肉

### 4. 动画效果

可以添加：
- 肌肉收缩动画
- 相机自动旋转
- 平滑过渡效果

### 5. 性能优化

- 使用 LOD (Level of Detail) 根据距离显示不同精度
- 实现模型懒加载
- 添加加载进度条

## 相关文件

```
nextjs-app/
├── public/models/
│   ├── muscle-anatomy.glb      # 3D 模型文件
│   └── README.md               # 模型说明
├── src/
│   ├── components/muscle-anatomy/
│   │   ├── muscle-model.tsx    # 模型加载和交互
│   │   ├── muscle-scene.tsx    # 3D 场景配置
│   │   ├── muscle-anatomy-client.tsx
│   │   ├── muscle-controls.tsx
│   │   ├── muscle-tooltip.tsx  # 肌肉名称显示（支持中英文）
│   │   └── muscle-explanation.tsx
│   └── lib/
│       ├── data/
│       │   └── muscles.ts      # 肌肉数据和别名映射
│       └── i18n/locales/
│           ├── zh/muscle-anatomy.ts  # 中文翻译
│           └── en/muscle-anatomy.ts  # 英文翻译

Z-Anatomy/
├── Startup.blend               # 原始 Blender 文件
├── export_cli.py               # 命令行导出脚本
├── export_muscles_glb.py       # GUI 导出脚本
└── EXPORT_GUIDE.md             # 导出指南
```

## 常见问题

### Q: 模型加载后显示为空白？
A: 检查浏览器控制台，确认模型文件路径正确，WebGL 支持正常。

### Q: 某些肌肉无法点击？
A: 检查 mesh 名称是否包含肌肉关键词，可能需要在 `muscleKeywords` 中添加新关键词。

### Q: 模型显示有遮挡物？
A: Z-Anatomy 包含区域标记等非肌肉对象，需要在 `HIDDEN_KEYWORDS` 中添加相应关键词隐藏。

### Q: 如何重新导出模型？
A: 运行导出脚本，确保 Blender 版本兼容（已测试 Blender 5.0）。

### Q: 如何添加新的肌肉翻译？
A: 
1. 在 `src/lib/i18n/locales/zh/muscle-anatomy.ts` 的 `muscles` 对象中添加中文翻译
2. 在 `src/lib/i18n/locales/en/muscle-anatomy.ts` 的 `muscles` 对象中添加英文翻译
3. 在 `src/lib/data/muscles.ts` 的 `muscleData` 数组中添加肌肉信息
4. 如需要，在 `muscleAliases` 中添加 Z-Anatomy 名称映射

### Q: 肌肉名称显示为 ID 格式（如 "Pectoralis Major"）？
A: 说明该肌肉 ID 在翻译文件中没有对应的翻译。按上述步骤添加翻译即可。

## 更新日志

### 2024-12-24
- ✅ 完成多语言支持（i18n）
- ✅ 添加 150+ 肌肉的中英文翻译
- ✅ 重构 `muscles.ts`，移除硬编码名称
- ✅ 更新 `MuscleTooltip` 组件，支持同时显示中英文名称
- ✅ 添加 `getMuscleIdFromModelName()` 函数用于模型名称映射
