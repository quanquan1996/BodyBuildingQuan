---
layout: post
title: "前端实现人体骨架检测与姿态对比：基于 MediaPipe 的完整方案"
date: 2024-12-20
categories: [frontend, computer-vision, mediapipe]
tags: [MediaPipe, Pose Detection, JavaScript, React, Next.js]
excerpt: "本文详细介绍如何在纯前端环境下实现计算机视觉人体骨架检测，并通过关节角度计算实现两张图片的姿态对比功能。"
---

本文将详细介绍如何在纯前端环境下实现计算机视觉人体骨架检测，并通过关节角度计算实现两张图片的姿态对比功能。

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

### 3. 关节角度计算

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

### 4. 计算对比分数

```typescript
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
