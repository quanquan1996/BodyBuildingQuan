---
layout: post
title: "前端实现交互式3D人体肌肉解剖图：基于 Three.js + React Three Fiber 的完整方案"
date: 2024-12-24
categories: [frontend, 3d, webgl]
tags: [Three.js, React Three Fiber, WebGL, Blender, 3D Model, Z-Anatomy]
excerpt: "本文详细介绍如何在前端实现交互式3D人体肌肉解剖展示，包括模型处理、场景搭建、交互实现和多语言支持。"
---

本文将详细介绍如何在前端实现一个交互式的3D人体肌肉解剖展示工具，用户可以旋转、缩放模型，点击任意肌肉查看中英文名称。

## 为什么要做这个？

传统的肌肉解剖学习通常依赖静态图片或昂贵的3D软件。作为健身爱好者，我希望能有一个免费、易用的在线工具来学习肌肉解剖知识。于是我决定自己动手，基于开源的 Z-Anatomy 项目，在浏览器中实现一个交互式的3D肌肉解剖图。

如果你想先体验效果，可以试试这个在线的[3D肌肉功能解剖](https://muscletool.pro/zh/tools/muscle-anatomy)工具。

## 技术架构概览

```
┌─────────────────────────────────────────────────────────────┐
│                      用户浏览器                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  GLB 模型   │ -> │  Three.js   │ -> │  React Three   │  │
│  │  (Draco)    │    │  场景渲染    │    │  Fiber 组件    │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│                            │                                │
│         ┌──────────────────┼──────────────────┐             │
│         v                  v                  v             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │  射线检测    │    │  肌肉高亮    │    │  i18n 翻译  │      │
│  │  Raycaster  │    │  材质切换    │    │  中英文名称  │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 模型来源与处理

### Z-Anatomy 开源项目

[Z-Anatomy](https://www.z-anatomy.com/) 是一个开源的人体解剖学 Blender 项目，包含完整的人体肌肉、骨骼、器官等结构。原始文件约 300MB，包含 1000+ 个独立的 mesh 对象。

### 模型导出与压缩

为了在 Web 端使用，我们需要将 Blender 文件导出为 GLB 格式，并使用 Draco 压缩：

```python
# export_cli.py - Blender 命令行导出脚本
import bpy

# 选择所有肌肉相关的对象
muscle_keywords = ['muscle', 'deltoid', 'bicep', 'tricep', 'pectoralis', ...]

for obj in bpy.data.objects:
    if obj.type == 'MESH':
        name_lower = obj.name.lower()
        if any(keyword in name_lower for keyword in muscle_keywords):
            obj.select_set(True)

# 导出为 GLB，启用 Draco 压缩
bpy.ops.export_scene.gltf(
    filepath='muscle-anatomy.glb',
    export_format='GLB',
    use_selection=True,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)
```

导出后的模型从 300MB 压缩到约 6.8MB，非常适合 Web 加载。

## 核心实现

### 1. 场景搭建 (React Three Fiber)

{% raw %}
```tsx
// muscle-scene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export function MuscleScene({ onMuscleClick, onMuscleHover, hoveredMuscle, selectedMuscle }) {
  return (
    <Canvas camera={{ position: [1.5, 0.3, 2], fov: 50 }}>
      {/* 环境光照 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* 3D 模型 */}
      <Suspense fallback={null}>
        <MuscleModel
          onMuscleClick={onMuscleClick}
          onMuscleHover={onMuscleHover}
          hoveredMuscle={hoveredMuscle}
          selectedMuscle={selectedMuscle}
        />
      </Suspense>
      
      {/* 轨道控制器 */}
      <OrbitControls
        enablePan={false}
        minDistance={1}
        maxDistance={5}
        target={[0, 0.5, 0]}
      />
      
      {/* 环境贴图 */}
      <Environment preset="studio" />
    </Canvas>
  );
}
```
{% endraw %}

### 2. 模型加载与肌肉识别

{% raw %}
```tsx
// muscle-model.tsx
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 肌肉识别关键词
const muscleKeywords = [
  'muscle', 'deltoid', 'bicep', 'tricep', 'pectoralis',
  'latissimus', 'trapezius', 'rectus', 'oblique', 'gluteus',
  'quadricep', 'vastus', 'hamstring', 'gastrocnemius', 'soleus',
  // ... 更多关键词
];

// 需要隐藏的非肌肉对象
const HIDDEN_KEYWORDS = [
  'region', 'fascia', 'bursa', 'ligament', 'membrane',
  '.j', '.t', // Z-Anatomy 的标签后缀
];

function isMuscle(name: string): boolean {
  const lowerName = name.toLowerCase();
  return muscleKeywords.some(keyword => lowerName.includes(keyword))
    && !HIDDEN_KEYWORDS.some(keyword => lowerName.includes(keyword));
}

export function MuscleModel({ onMuscleClick, onMuscleHover, hoveredMuscle, selectedMuscle }) {
  const { scene } = useGLTF('/models/muscle-anatomy.glb');
  
  // 克隆场景并处理材质
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (shouldHide(child.name)) {
          child.parent?.remove(child);
          return;
        }
        
        if (isMuscle(child.name)) {
          // 为肌肉设置红色系材质
          child.material = child.material.clone();
          child.material.color = new THREE.Color(0xc44d4d);
          child.material.roughness = 0.7;
          child.material.metalness = 0.1;
        }
      }
    });
    
    return clone;
  }, [scene]);
  
  return (
    <primitive
      object={clonedScene}
      position={[0, -0.84, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}
```
{% endraw %}

### 3. 交互高亮效果

{% raw %}
```tsx
// 高亮颜色配置
const HIGHLIGHT_COLOR = new THREE.Color(0x5ac57a);  // 薄荷绿 - 悬停
const SELECTED_COLOR = new THREE.Color(0x4caf50);   // 深绿 - 选中

// 更新高亮效果
useEffect(() => {
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh && isMuscle(child.name)) {
      const material = child.material as THREE.MeshStandardMaterial;
      const muscleId = getMuscleIdFromModelName(child.name);
      
      const isHovered = muscleId === hoveredMuscle;
      const isSelected = muscleId === selectedMuscle;
      
      if (isSelected) {
        material.emissive = SELECTED_COLOR;
        material.emissiveIntensity = 0.5;
      } else if (isHovered) {
        material.emissive = HIGHLIGHT_COLOR;
        material.emissiveIntensity = 0.3;
      } else {
        material.emissive = new THREE.Color(0x000000);
        material.emissiveIntensity = 0;
      }
    }
  });
}, [hoveredMuscle, selectedMuscle, clonedScene]);
```
{% endraw %}

### 4. 肌肉名称映射与多语言

Z-Anatomy 的命名格式是 `Muscle name.l`（左侧）/ `Muscle name.r`（右侧），我们需要将其映射到标准的肌肉 ID：

{% raw %}
```typescript
// muscles.ts
const muscleAliases: Record<string, string[]> = {
  'pectoralis_major': [
    'pectoralis major',
    'sternocostal head of pectoralis major',
    'clavicular head of pectoralis major',
  ],
  'biceps_brachii': [
    'biceps brachii',
    'long head of biceps brachii',
    'short head of biceps brachii',
  ],
  // ... 更多映射
};

export function getMuscleIdFromModelName(modelName: string): string | undefined {
  const cleanName = modelName
    .replace(/\.(l|r|el|er)$/i, '')  // 移除左右后缀
    .toLowerCase()
    .trim();
  
  for (const [muscleId, aliases] of Object.entries(muscleAliases)) {
    if (aliases.some(alias => cleanName.includes(alias))) {
      return muscleId;
    }
  }
  
  return undefined;
}
```
{% endraw %}

多语言翻译存储在 i18n 模块中：

{% raw %}
```typescript
// locales/zh/muscle-anatomy.ts
export const muscleAnatomy = {
  muscles: {
    pectoralis_major: '胸大肌',
    biceps_brachii: '肱二头肌',
    triceps_brachii: '肱三头肌',
    latissimus_dorsi: '背阔肌',
    rectus_abdominis: '腹直肌',
    gluteus_maximus: '臀大肌',
    quadriceps_femoris: '股四头肌',
    gastrocnemius: '腓肠肌',
    // ... 150+ 肌肉翻译
  },
};
```
{% endraw %}

## 移动端交互优化

在移动端，传统的 OrbitControls 会与页面滚动冲突，用户体验很差。我们需要自定义交互方案。

### 1. 禁用默认触摸行为

首先，禁用 Canvas 和容器的默认触摸行为，防止滚动穿透：

{% raw %}
```tsx
// muscle-scene.tsx
<Canvas
  style={{ 
    touchAction: 'none',  // 禁用触摸手势
  }}
  onPointerMissed={() => {}}  // 禁用默认点击行为
>
```
{% endraw %}

同时在容器上添加非被动事件监听器：

{% raw %}
```tsx
// muscle-anatomy-client.tsx
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
  };

  // 使用非被动监听器阻止滚动
  container.addEventListener('touchmove', preventScroll, { passive: false });
  container.addEventListener('touchstart', preventScroll, { passive: false });

  return () => {
    container.removeEventListener('touchmove', preventScroll);
    container.removeEventListener('touchstart', preventScroll);
  };
}, []);
```
{% endraw %}

### 2. 虚拟摇杆控制器

为了在移动端提供良好的交互体验，我实现了一个虚拟摇杆组件：

{% raw %}
```tsx
// virtual-joystick.tsx
export function VirtualJoystick({ onRotate, onZoom, onReset }) {
  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const joystickRadius = 50;
  const knobRadius = 24;
  const maxDistance = joystickRadius - knobRadius / 2;

  // 持续旋转动画
  useEffect(() => {
    if (isDragging && (knobPosition.x !== 0 || knobPosition.y !== 0)) {
      const animate = () => {
        const rotateSpeed = 0.04;
        onRotate(knobPosition.x * rotateSpeed, knobPosition.y * rotateSpeed);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, knobPosition, onRotate]);

  // 处理拖拽
  const handleMove = (clientX: number, clientY: number) => {
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // 限制在圆形范围内
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setKnobPosition({ x: deltaX, y: deltaY });
  };

  // 释放时停止旋转
  const handleEnd = () => {
    setIsDragging(false);
    setKnobPosition({ x: 0, y: 0 });
    onRotate(0, 0);  // 关键：通知父组件停止旋转
  };

  return (
    <div className="flex items-center gap-3">
      {/* 缩放按钮 */}
      <div className="flex flex-col gap-2">
        <Button onMouseDown={() => startZoom(-0.15)}>
          <ZoomIn />
        </Button>
        <Button onMouseDown={() => startZoom(0.15)}>
          <ZoomOut />
        </Button>
      </div>

      {/* 摇杆 */}
      <div
        ref={joystickRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ width: joystickRadius * 2, height: joystickRadius * 2 }}
      >
        {/* 底座 */}
        <div className="absolute inset-0 rounded-full" />
        {/* 摇杆球 */}
        <div
          style={{
            left: `calc(50% - ${knobRadius}px + ${knobPosition.x}px)`,
            top: `calc(50% - ${knobRadius}px + ${knobPosition.y}px)`,
          }}
        />
      </div>

      {/* 重置按钮 */}
      <Button onClick={onReset}>
        <RotateCcw />
      </Button>
    </div>
  );
}
```
{% endraw %}

### 3. 自定义相机控制器

替换 OrbitControls，使用球坐标系统实现相机控制：

{% raw %}
```tsx
// CameraController - 支持外部控制
function CameraController({ view, rotationDelta, zoomDelta }) {
  const { camera } = useThree();
  const spherical = useRef(new THREE.Spherical(2.5, Math.PI / 2, 0));
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let needsUpdate = false;

    // 处理旋转
    if (rotationDelta && (rotationDelta.x !== 0 || rotationDelta.y !== 0)) {
      spherical.current.theta -= rotationDelta.x;
      spherical.current.phi = Math.max(
        Math.PI / 6,
        Math.min(Math.PI - Math.PI / 6, spherical.current.phi + rotationDelta.y)
      );
      needsUpdate = true;
    }

    // 处理缩放
    if (zoomDelta && zoomDelta !== 0) {
      spherical.current.radius = Math.max(1, Math.min(5, spherical.current.radius + zoomDelta));
      needsUpdate = true;
    }

    if (needsUpdate) {
      const pos = new THREE.Vector3().setFromSpherical(spherical.current);
      camera.position.copy(pos);
      camera.lookAt(target.current);
    }
  });

  return null;
}
```
{% endraw %}

### 4. 长按缩放

缩放按钮支持长按连续缩放：

{% raw %}
```tsx
const zoomIntervalRef = useRef<NodeJS.Timeout | null>(null);

const startZoom = (delta: number) => {
  onZoom(delta);
  zoomIntervalRef.current = setInterval(() => {
    onZoom(delta);
  }, 100);
};

const stopZoom = () => {
  if (zoomIntervalRef.current) {
    clearInterval(zoomIntervalRef.current);
  }
};
```
{% endraw %}

这套方案在 PC 和移动端都能提供流畅的交互体验，同时避免了与页面滚动的冲突。

## 性能优化

### 1. 模型压缩

- 使用 Draco 压缩，模型从 300MB 压缩到 6.8MB
- 在 Blender 中使用 Decimate Modifier 降低面数

### 2. 动态加载

{% raw %}
```tsx
// 使用 Next.js 动态导入，禁用 SSR
const MuscleScene = dynamic(
  () => import('./muscle-scene').then((mod) => mod.MuscleScene),
  { ssr: false }
);
```
{% endraw %}

### 3. 材质优化

- 克隆材质避免全局修改
- 使用 emissive 属性实现高亮，避免重新创建材质

## 应用场景

这套技术方案可以应用于多种场景：

1. **健身教育**：帮助健身爱好者了解肌肉位置和名称
2. **医学教学**：辅助医学生学习人体解剖
3. **康复指导**：展示特定肌肉群的位置
4. **游戏开发**：角色肌肉系统参考

如果你对健身相关的工具感兴趣，可以看看这些在线计算器：

- [FFMI计算器](https://muscletool.pro/zh/tools/ffmi-calculator) - 评估你的肌肉发展水平
- [体脂夹计算器](https://muscletool.pro/zh/tools/skinfold-calculator) - 精确测量体脂率
- [健美造型评分器](https://muscletool.pro/zh/tools/pose-comparator) - AI 评估健美造型
- [古典比例计算器](https://muscletool.pro/zh/tools/grecian-calculator) - 计算理想的黄金比例围度

## 总结

本文介绍了如何在前端使用 Three.js + React Three Fiber 实现交互式3D人体肌肉解剖展示。核心技术点包括：

1. **模型处理**：从 Z-Anatomy 导出并压缩 GLB 模型
2. **场景搭建**：使用 React Three Fiber 构建 3D 场景
3. **交互实现**：射线检测 + 材质高亮
4. **移动端优化**：虚拟摇杆 + 自定义相机控制器 + 触摸事件处理
5. **多语言支持**：肌肉名称中英文翻译

这套方案完全在浏览器端运行，无需后端服务，非常适合构建教育类的3D可视化应用。

---

**相关链接：**
- [Z-Anatomy 开源项目](https://www.z-anatomy.com/)
- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber)
- [在线体验：3D肌肉功能解剖](https://muscletool.pro/zh/tools/muscle-anatomy)
- [更多健身工具](https://muscletool.pro)
