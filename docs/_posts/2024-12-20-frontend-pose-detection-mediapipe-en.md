---
layout: post
title: "Building Human Pose Detection & Comparison in the Browser with MediaPipe"
date: 2024-12-20
categories: [frontend, computer-vision, mediapipe]
tags: [MediaPipe, Pose Detection, JavaScript, React, Next.js, WebAssembly]
excerpt: "A complete guide to implementing computer vision-based skeleton detection and pose comparison entirely on the frontend using MediaPipe Tasks Vision."
lang: en
---

This article covers how to implement computer vision-based skeleton detection and pose comparison entirely on the frontend using MediaPipe Tasks Vision.

## Why Go Client-Side?

Traditional human pose detection typically requires a backend stack with Python, OpenCV, and TensorFlow. But this approach comes with several drawbacks:

- **Privacy concerns**: User images must be uploaded to servers
- **Latency**: Network round-trips add response time
- **Server costs**: GPU servers are expensive to maintain

Thanks to WebAssembly and WebGPU, we can now run machine learning models directly in the browser. Google's MediaPipe is an excellent choice—it provides lightweight pose detection models that run in real-time on the client side.

Want to see it in action? Try this online [Bodybuilding Pose Comparator](https://muscletool.pro/en/tools/pose-comparator), which is built using the techniques described in this article.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Image     │ -> │  MediaPipe  │ -> │  Skeleton   │  │
│  │   Upload    │    │  Pose Det.  │    │  Canvas     │  │
│  └─────────────┘    └─────────────┘    └─────────────┘  │
│                            │                            │
│                            v                            │
│                    ┌─────────────┐                      │
│                    │   Angle     │                      │
│                    │  Calculation│                      │
│                    │  & Scoring  │                      │
│                    └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

## Core Implementation

### 1. Initialize MediaPipe Pose Landmarker

MediaPipe provides a CDN version that we can load dynamically:

```typescript
let poseLandmarker: any = null;
let FilesetResolver: any = null;
let PoseLandmarkerClass: any = null;

async function loadMediaPipe(): Promise<void> {
  if (FilesetResolver && PoseLandmarkerClass) return;
  
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
      delegate: 'GPU',
    },
    runningMode: 'IMAGE',
    numPoses: 1,
  });
}
```

**Key Configuration Notes:**

- `delegate: 'GPU'`: Enables WebGPU/WebGL acceleration for faster detection
- `runningMode: 'IMAGE'`: Static image mode (can also be set to `VIDEO`)
- `pose_landmarker_lite`: Lightweight model (~4MB), ideal for web applications

### 2. Joint Angle Calculation

The core of pose comparison is calculating joint angles:

```typescript
export function calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
  const ba = { x: a.x - b.x, y: a.y - b.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };

  const dotProduct = ba.x * bc.x + ba.y * bc.y;
  const magnitudeBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
  const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);

  if (magnitudeBA === 0 || magnitudeBC === 0) return 0;

  const cosAngle = dotProduct / (magnitudeBA * magnitudeBC);
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  const angleRad = Math.acos(clampedCos);

  return angleRad * (180 / Math.PI);
}
```

### 3. Calculate Comparison Score

```typescript
export function calculateTotalScore(angles: AngleResult[]): number {
  if (angles.length === 0) return 0;

  const scores = angles.map((a) => {
    const absDiff = Math.abs(a.difference);
    if (absDiff <= 5) return 100;   // Perfect
    if (absDiff <= 10) return 90;   // Excellent
    if (absDiff <= 15) return 80;   // Good
    if (absDiff <= 20) return 70;   // Fair
    if (absDiff <= 30) return 50;   // Needs improvement
    return 30;
  });

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
```

## Use Cases

This technical solution can be applied to various scenarios:

1. **Fitness Coaching**: Compare standard movements with user movements
2. **Dance Training**: Analyze dance movement accuracy
3. **Rehabilitation**: Monitor patient recovery movements
4. **Sports Training**: Analyze athletes' technical movements

If you're interested in fitness-related tools, check out these online calculators:

- [FFMI Calculator](https://muscletool.pro/en/tools/ffmi-calculator) - Assess your muscle development level
- [Skinfold Calculator](https://muscletool.pro/en/tools/skinfold-calculator) - Accurately measure body fat percentage
- [BMR Calculator](https://muscletool.pro/en/tools/bmr-calculator) - Calculate basal metabolic rate
- [Grecian Ideal Calculator](https://muscletool.pro/en/tools/grecian-calculator) - Calculate ideal golden ratio measurements

## Summary

This article covered how to implement human skeleton detection and pose comparison on the frontend using MediaPipe. Key technical points include:

1. **MediaPipe CDN Loading**: Load models via dynamic import, no backend required
2. **Joint Angle Calculation**: Use vector dot product formula
3. **Canvas Visualization**: Draw skeleton and angle difference labels
4. **Scoring Algorithm**: Calculate comprehensive score based on angle differences

This solution runs entirely in the browser, protecting user privacy with fast response times.

---

**Related Links:**
- [MediaPipe Official Documentation](https://developers.google.com/mediapipe)
- [Live Demo: Bodybuilding Pose Comparator](https://muscletool.pro/en/tools/pose-comparator)
- [More Fitness Tools](https://muscletool.pro)
