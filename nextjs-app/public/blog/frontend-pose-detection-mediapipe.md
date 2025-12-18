# 前端实现人体骨架检测与姿态对比：基于 MediaPipe 的完整方案

> 本文将详细介绍如何在纯前端环境下实现计算机视觉人体骨架检测，并通过关节角度计算实现两张图片的姿态对比功能。

## 为什么选择前端方案？

传统的人体姿态检测通常需要后端服务器配合 Python + OpenCV + TensorFlow 等技术栈，但这带来了几个问题：

- **隐私顾虑**：用户图片需要上传到服务器
- **延迟问题**：网络传输增加响应时间
- **服务器成本**：GPU 服务器价格昂贵

得益于 WebAssembly 和 WebGPU 的发展，现在我们可以在浏览器中直接运行机器学习模型。Google 的 MediaPipe 就是一个优秀的选择，它提供了轻量级的姿态检测模型，可以在前端实时运行。

如果你想先体验效果，可以试试这个在线的[健美造型评分器](https://muscletool.pro/zh/tools/pose-comparator)，它就是基于本文介绍的技术实现的。

## 技术架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    用户浏览器                            │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │  图片上传    │ -> │  MediaPipe  │ -> │  骨架渲染   │  │
│  │  组件       │    │  姿态检测    │    │  Canvas    │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                            │                            │
│                            v                            │
│                    ┌─────────────┐                      │
│                    │  角度计算    │                      │
│                    │  & 对比评分  │                      │
│                    └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

## 核心实现

### 1. 初始化 MediaPipe Pose Landmarker

MediaPipe 提供了 CDN 版本，我们可以通过动态 import 加载：

```typescript
// pose-detector.ts
let poseLandmarker: any = null;
let FilesetResolver: any = null;
let PoseLandmarkerClass: any = null;

async function loadMediaPipe(): Promise<void> {
  if (FilesetResolver && PoseLandmarkerClass) return;
  
  // 从 CDN 动态加载 MediaPipe
  const vision = await import(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/vision_bundle.mjs'
  );
  
  FilesetResolver = vision.FilesetResolver;
  PoseLandmarkerClass = vision.PoseLandmarker;
}

export async function initializePoseDetector(): Promise<void> {
  if (poseLandmarker) return;
  
  await loadMediaPipe();

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm'
  );

  poseLandmarker = await PoseLandmarkerClass.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
      delegate: 'GPU', // 优先使用 GPU 加速
    },
    runningMode: 'IMAGE',
    numPoses: 1,
  });
}
```

**关键配置说明：**

- `delegate: 'GPU'`：启用 WebGPU/WebGL 加速，大幅提升检测速度
- `runningMode: 'IMAGE'`：静态图片模式，也可以设为 `VIDEO` 处理视频流
- `pose_landmarker_lite`：轻量模型，约 4MB，适合 Web 场景

### 2. 执行姿态检测

```typescript
export interface PoseLandmark {
  x: number;      // 归一化 x 坐标 (0-1)
  y: number;      // 归一化 y 坐标 (0-1)
  z: number;      // 深度信息
  visibility: number; // 可见度 (0-1)
}

export interface PoseResult {
  landmarks: PoseLandmark[];      // 33 个关键点
  worldLandmarks: PoseLandmark[]; // 3D 世界坐标
  timestamp: number;
}

export async function detectPose(imageSource: HTMLImageElement | string): Promise<PoseResult | null> {
  if (!poseLandmarker) {
    await initializePoseDetector();
  }

  // 支持传入 dataUrl 字符串
  let imageElement: HTMLImageElement;
  if (typeof imageSource === 'string') {
    imageElement = new Image();
    imageElement.src = imageSource;
    await new Promise((resolve, reject) => {
      imageElement.onload = resolve;
      imageElement.onerror = reject;
    });
  } else {
    imageElement = imageSource;
  }

  const result = poseLandmarker.detect(imageElement);

  if (!result.landmarks || result.landmarks.length === 0) {
    return null; // 未检测到人体
  }

  // 转换为标准格式
  const landmarks: PoseLandmark[] = result.landmarks[0].map((lm: any) => ({
    x: lm.x,
    y: lm.y,
    z: lm.z,
    visibility: lm.visibility ?? 1,
  }));

  return {
    landmarks,
    worldLandmarks: result.worldLandmarks?.[0] ?? [],
    timestamp: Date.now(),
  };
}
```

### 3. MediaPipe 33 个关键点索引

MediaPipe Pose 模型会检测人体的 33 个关键点：

```typescript
export enum LandmarkIndex {
  NOSE = 0,
  LEFT_EYE_INNER = 1,
  LEFT_EYE = 2,
  LEFT_EYE_OUTER = 3,
  RIGHT_EYE_INNER = 4,
  RIGHT_EYE = 5,
  RIGHT_EYE_OUTER = 6,
  LEFT_EAR = 7,
  RIGHT_EAR = 8,
  MOUTH_LEFT = 9,
  MOUTH_RIGHT = 10,
  LEFT_SHOULDER = 11,
  RIGHT_SHOULDER = 12,
  LEFT_ELBOW = 13,
  RIGHT_ELBOW = 14,
  LEFT_WRIST = 15,
  RIGHT_WRIST = 16,
  LEFT_PINKY = 17,
  RIGHT_PINKY = 18,
  LEFT_INDEX = 19,
  RIGHT_INDEX = 20,
  LEFT_THUMB = 21,
  RIGHT_THUMB = 22,
  LEFT_HIP = 23,
  RIGHT_HIP = 24,
  LEFT_KNEE = 25,
  RIGHT_KNEE = 26,
  LEFT_ANKLE = 27,
  RIGHT_ANKLE = 28,
  LEFT_HEEL = 29,
  RIGHT_HEEL = 30,
  LEFT_FOOT_INDEX = 31,
  RIGHT_FOOT_INDEX = 32,
}
```

### 4. 关节角度计算

姿态对比的核心是计算关节角度。给定三个点 A、B、C，我们计算以 B 为顶点的夹角：

```typescript
// angle-calculator.ts
export function calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
  // 计算向量 BA 和 BC
  const ba = { x: a.x - b.x, y: a.y - b.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };

  // 点积公式：cos(θ) = (BA · BC) / (|BA| × |BC|)
  const dotProduct = ba.x * bc.x + ba.y * bc.y;
  const magnitudeBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
  const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);

  if (magnitudeBA === 0 || magnitudeBC === 0) return 0;

  const cosAngle = dotProduct / (magnitudeBA * magnitudeBC);
  // 防止浮点误差导致 acos 参数超出 [-1, 1]
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  const angleRad = Math.acos(clampedCos);

  // 转换为角度
  return angleRad * (180 / Math.PI);
}
```

### 5. 定义关键角度检测点

对于[健美造型对比](https://muscletool.pro/zh/tools/pose-comparator)场景，我们关注以下关节角度：

```typescript
const BODYBUILDING_ANGLES = [
  {
    name: '左肘',
    jointIndex: LandmarkIndex.LEFT_ELBOW,
    points: [LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW, LandmarkIndex.LEFT_WRIST],
    description: '肱二头肌展示角度',
  },
  {
    name: '右肘',
    jointIndex: LandmarkIndex.RIGHT_ELBOW,
    points: [LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW, LandmarkIndex.RIGHT_WRIST],
    description: '肱二头肌展示角度',
  },
  {
    name: '左肩',
    jointIndex: LandmarkIndex.LEFT_SHOULDER,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW],
    description: '手臂抬起角度',
  },
  {
    name: '右肩',
    jointIndex: LandmarkIndex.RIGHT_SHOULDER,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW],
    description: '手臂抬起角度',
  },
  {
    name: '左膝',
    jointIndex: LandmarkIndex.LEFT_KNEE,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_KNEE, LandmarkIndex.LEFT_ANKLE],
    description: '腿部弯曲角度',
  },
  {
    name: '右膝',
    jointIndex: LandmarkIndex.RIGHT_KNEE,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_KNEE, LandmarkIndex.RIGHT_ANKLE],
    description: '腿部弯曲角度',
  },
];
```

### 6. 计算对比分数

```typescript
export interface AngleResult {
  name: string;
  jointIndex: number;
  referenceAngle: number;  // 参考图角度
  userAngle: number;       // 用户图角度
  difference: number;      // 差值
  description: string;
}

export function calculateBodybuildingAngles(
  refPose: PoseResult,
  userPose: PoseResult
): AngleResult[] {
  return BODYBUILDING_ANGLES.map(({ name, jointIndex, points, description }) => {
    const [a, b, c] = points;
    
    const refAngle = calculateAngle(
      refPose.landmarks[a],
      refPose.landmarks[b],
      refPose.landmarks[c]
    );
    
    const userAngle = calculateAngle(
      userPose.landmarks[a],
      userPose.landmarks[b],
      userPose.landmarks[c]
    );

    return {
      name,
      jointIndex,
      referenceAngle: refAngle,
      userAngle: userAngle,
      difference: userAngle - refAngle,
      description,
    };
  });
}

// 计算总体评分 (0-100)
export function calculateTotalScore(angles: AngleResult[]): number {
  if (angles.length === 0) return 0;

  const scores = angles.map((a) => {
    const absDiff = Math.abs(a.difference);
    if (absDiff <= 5) return 100;   // 完美
    if (absDiff <= 10) return 90;   // 优秀
    if (absDiff <= 15) return 80;   // 良好
    if (absDiff <= 20) return 70;   // 一般
    if (absDiff <= 30) return 50;   // 需改进
    return 30;                       // 差距较大
  });

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
```

### 7. Canvas 骨架渲染

检测到关键点后，我们需要在图片上绘制骨架：

```typescript
// 骨架连接定义
export const POSE_CONNECTIONS: [number, number][] = [
  // 躯干
  [11, 12], // 左肩 - 右肩
  [11, 23], // 左肩 - 左髋
  [12, 24], // 右肩 - 右髋
  [23, 24], // 左髋 - 右髋
  // 左臂
  [11, 13], // 左肩 - 左肘
  [13, 15], // 左肘 - 左腕
  // 右臂
  [12, 14], // 右肩 - 右肘
  [14, 16], // 右肘 - 右腕
  // 左腿
  [23, 25], // 左髋 - 左膝
  [25, 27], // 左膝 - 左踝
  // 右腿
  [24, 26], // 右髋 - 右膝
  [26, 28], // 右膝 - 右踝
];

function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  pose: PoseResult,
  width: number,
  height: number,
  color: string,
  dashed: boolean = false
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash(dashed ? [5, 5] : []);

  // 绘制连接线
  for (const [start, end] of POSE_CONNECTIONS) {
    const startLm = pose.landmarks[start];
    const endLm = pose.landmarks[end];
    
    // 只绘制可见度高的点
    if (startLm.visibility > 0.5 && endLm.visibility > 0.5) {
      ctx.beginPath();
      ctx.moveTo(startLm.x * width, startLm.y * height);
      ctx.lineTo(endLm.x * width, endLm.y * height);
      ctx.stroke();
    }
  }

  // 绘制关键点
  ctx.fillStyle = color;
  ctx.setLineDash([]);
  for (const lm of pose.landmarks) {
    if (lm.visibility > 0.5) {
      ctx.beginPath();
      ctx.arc(lm.x * width, lm.y * height, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
```

### 8. 角度差异可视化

在关节位置显示角度差异标签：

```typescript
function drawAngleDiffLabels(
  ctx: CanvasRenderingContext2D,
  pose: PoseResult,
  angleResults: AngleResult[],
  width: number,
  height: number
) {
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';

  for (const angle of angleResults) {
    const lm = pose.landmarks[angle.jointIndex];
    if (!lm || lm.visibility < 0.5) continue;

    const x = lm.x * width;
    const y = lm.y * height;
    const diff = angle.difference;
    const absDiff = Math.abs(diff);

    // 根据差异程度选择颜色
    let bgColor = '#22c55e'; // 绿色 - 完美
    if (absDiff > 20) {
      bgColor = '#ef4444';   // 红色 - 需调整
    } else if (absDiff > 10) {
      bgColor = '#f97316';   // 橙色 - 一般
    } else if (absDiff > 5) {
      bgColor = '#eab308';   // 黄色 - 良好
    }

    const text = `${diff > 0 ? '+' : ''}${diff.toFixed(0)}°`;
    
    // 绘制标签背景
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - textWidth/2 - 4, y - 24, textWidth + 8, 18, 4);
    ctx.fill();

    // 绘制文字
    ctx.fillStyle = '#fff';
    ctx.fillText(text, x, y - 15);
  }
}
```

## React 组件封装

### 图片上传组件

```tsx
'use client';

import { useCallback, useState } from 'react';

interface ImageUploadProps {
  label: string;
  onImageSelect: (file: File, dataUrl: string) => void;
}

export function ImageUpload({ label, onImageSelect }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('文件大小不能超过 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      onImageSelect(file, dataUrl);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border-2 border-dashed rounded-lg min-h-[200px]
          flex items-center justify-center cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-[300px] object-contain" />
        ) : (
          <p className="text-gray-500">点击或拖拽图片到此处</p>
        )}
      </div>
    </div>
  );
}
```

### 完整的姿态对比组件

```tsx
'use client';

import { useState } from 'react';
import { detectPose } from '@/lib/mediapipe/pose-detector';
import { calculateBodybuildingAngles, calculateTotalScore } from '@/lib/utils/angle-calculator';
import { ImageUpload } from './image-upload';
import { PoseCanvas } from './pose-canvas';

export function PoseComparator() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [referencePose, setReferencePose] = useState(null);
  const [userPose, setUserPose] = useState(null);
  const [angleResults, setAngleResults] = useState([]);
  const [score, setScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReferenceSelect = async (file: File, dataUrl: string) => {
    setReferenceImage(dataUrl);
    setIsProcessing(true);
    try {
      const pose = await detectPose(dataUrl);
      setReferencePose(pose);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUserSelect = async (file: File, dataUrl: string) => {
    setUserImage(dataUrl);
    setIsProcessing(true);
    try {
      const pose = await detectPose(dataUrl);
      setUserPose(pose);
      
      // 如果两张图都检测完成，计算对比结果
      if (referencePose && pose) {
        const angles = calculateBodybuildingAngles(referencePose, pose);
        setAngleResults(angles);
        setScore(calculateTotalScore(angles));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <ImageUpload
          label="参考图片（标准造型）"
          onImageSelect={handleReferenceSelect}
        />
        <ImageUpload
          label="你的照片"
          onImageSelect={handleUserSelect}
        />
      </div>

      {isProcessing && (
        <div className="text-center py-4">
          <p>正在分析姿态...</p>
        </div>
      )}

      {score !== null && (
        <div className="text-center py-6">
          <h3 className="text-2xl font-bold">
            造型评分: {score.toFixed(0)} 分
          </h3>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {referenceImage && referencePose && (
          <PoseCanvas
            imageUrl={referenceImage}
            userPose={referencePose}
            skeletonColor="#06b6d4"
          />
        )}
        {userImage && userPose && (
          <PoseCanvas
            imageUrl={userImage}
            userPose={userPose}
            angleResults={angleResults}
            showAngleDiff={true}
            skeletonColor="#22c55e"
          />
        )}
      </div>
    </div>
  );
}
```

## 性能优化建议

### 1. 模型预加载

在用户进入页面时就开始加载模型，而不是等到上传图片：

```typescript
useEffect(() => {
  // 页面加载时预初始化
  initializePoseDetector().catch(console.error);
}, []);
```

### 2. 图片压缩

上传前压缩大图片，减少检测时间：

```typescript
async function compressImage(file: File, maxWidth = 1024): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = URL.createObjectURL(file);
  });
}
```

### 3. Web Worker

对于复杂计算，可以考虑使用 Web Worker 避免阻塞主线程。

## 应用场景

这套技术方案可以应用于多种场景：

1. **健身指导**：对比标准动作与用户动作，提供纠正建议
2. **舞蹈教学**：分析舞蹈动作的准确度
3. **康复训练**：监测患者康复动作是否标准
4. **体育训练**：分析运动员的技术动作

如果你对健身相关的工具感兴趣，可以看看这些在线计算器：

- [FFMI计算器](https://muscletool.pro/zh/tools/ffmi-calculator) - 评估你的肌肉发展水平
- [体脂夹计算器](https://muscletool.pro/zh/tools/skinfold-calculator) - 精确测量体脂率
- [BMR代谢计算器](https://muscletool.pro/zh/tools/bmr-calculator) - 计算基础代谢率
- [古典比例计算器](https://muscletool.pro/zh/tools/grecian-calculator) - 计算理想的黄金比例围度

## 总结

本文介绍了如何在前端使用 MediaPipe 实现人体骨架检测和姿态对比功能。核心技术点包括：

1. **MediaPipe CDN 加载**：通过动态 import 加载模型，无需后端
2. **关节角度计算**：使用向量点积公式计算三点夹角
3. **Canvas 可视化**：绘制骨架和角度差异标签
4. **评分算法**：基于角度差异计算综合评分

这套方案完全在浏览器端运行，保护用户隐私，响应速度快，非常适合构建交互式的姿态分析应用。

---

**相关链接：**
- [MediaPipe 官方文档](https://developers.google.com/mediapipe)
- [在线体验：健美造型评分器](https://muscletool.pro/zh/tools/pose-comparator)
- [更多健身工具](https://muscletool.pro)

**关键词：** MediaPipe, 人体姿态检测, 骨架检测, 前端计算机视觉, Pose Estimation, 关节角度计算, WebAssembly, 健美造型评分
