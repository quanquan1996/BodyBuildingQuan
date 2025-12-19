# Building a Human Pose Detection & Comparison Tool in the Browser with MediaPipe

> A complete guide to implementing computer vision-based skeleton detection and pose comparison entirely on the frontend using MediaPipe Tasks Vision.

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
// pose-detector.ts
let poseLandmarker: any = null;
let FilesetResolver: any = null;
let PoseLandmarkerClass: any = null;

async function loadMediaPipe(): Promise<void> {
  if (FilesetResolver && PoseLandmarkerClass) return;
  
  // Dynamically load MediaPipe from CDN
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
      delegate: 'GPU', // Prefer GPU acceleration
    },
    runningMode: 'IMAGE',
    numPoses: 1,
  });
}
```

**Key Configuration Notes:**

- `delegate: 'GPU'`: Enables WebGPU/WebGL acceleration for faster detection
- `runningMode: 'IMAGE'`: Static image mode (can also be set to `VIDEO` for video streams)
- `pose_landmarker_lite`: Lightweight model (~4MB), ideal for web applications

### 2. Perform Pose Detection

```typescript
export interface PoseLandmark {
  x: number;      // Normalized x coordinate (0-1)
  y: number;      // Normalized y coordinate (0-1)
  z: number;      // Depth information
  visibility: number; // Visibility score (0-1)
}

export interface PoseResult {
  landmarks: PoseLandmark[];      // 33 keypoints
  worldLandmarks: PoseLandmark[]; // 3D world coordinates
  timestamp: number;
}

export async function detectPose(imageSource: HTMLImageElement | string): Promise<PoseResult | null> {
  if (!poseLandmarker) {
    await initializePoseDetector();
  }

  // Support passing dataUrl string
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
    return null; // No human body detected
  }

  // Convert to standard format
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

### 3. MediaPipe 33 Landmark Indices

MediaPipe Pose model detects 33 keypoints on the human body:

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

### 4. Joint Angle Calculation

The core of pose comparison is calculating joint angles. Given three points A, B, C, we calculate the angle at vertex B:

```typescript
// angle-calculator.ts
export function calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
  // Calculate vectors BA and BC
  const ba = { x: a.x - b.x, y: a.y - b.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };

  // Dot product formula: cos(θ) = (BA · BC) / (|BA| × |BC|)
  const dotProduct = ba.x * bc.x + ba.y * bc.y;
  const magnitudeBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
  const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);

  if (magnitudeBA === 0 || magnitudeBC === 0) return 0;

  const cosAngle = dotProduct / (magnitudeBA * magnitudeBC);
  // Clamp to prevent floating point errors in acos
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  const angleRad = Math.acos(clampedCos);

  // Convert to degrees
  return angleRad * (180 / Math.PI);
}
```

### 5. Define Key Angle Detection Points

For [bodybuilding pose comparison](https://muscletool.pro/en/tools/pose-comparator) scenarios, we focus on these joint angles:

```typescript
const BODYBUILDING_ANGLES = [
  {
    name: 'Left Elbow',
    jointIndex: LandmarkIndex.LEFT_ELBOW,
    points: [LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW, LandmarkIndex.LEFT_WRIST],
    description: 'Bicep display angle',
  },
  {
    name: 'Right Elbow',
    jointIndex: LandmarkIndex.RIGHT_ELBOW,
    points: [LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW, LandmarkIndex.RIGHT_WRIST],
    description: 'Bicep display angle',
  },
  {
    name: 'Left Shoulder',
    jointIndex: LandmarkIndex.LEFT_SHOULDER,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW],
    description: 'Arm raise angle',
  },
  {
    name: 'Right Shoulder',
    jointIndex: LandmarkIndex.RIGHT_SHOULDER,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW],
    description: 'Arm raise angle',
  },
  {
    name: 'Left Knee',
    jointIndex: LandmarkIndex.LEFT_KNEE,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_KNEE, LandmarkIndex.LEFT_ANKLE],
    description: 'Leg bend angle',
  },
  {
    name: 'Right Knee',
    jointIndex: LandmarkIndex.RIGHT_KNEE,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_KNEE, LandmarkIndex.RIGHT_ANKLE],
    description: 'Leg bend angle',
  },
];
```

### 6. Calculate Comparison Score

```typescript
export interface AngleResult {
  name: string;
  jointIndex: number;
  referenceAngle: number;  // Reference image angle
  userAngle: number;       // User image angle
  difference: number;      // Difference
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

// Calculate overall score (0-100)
export function calculateTotalScore(angles: AngleResult[]): number {
  if (angles.length === 0) return 0;

  const scores = angles.map((a) => {
    const absDiff = Math.abs(a.difference);
    if (absDiff <= 5) return 100;   // Perfect
    if (absDiff <= 10) return 90;   // Excellent
    if (absDiff <= 15) return 80;   // Good
    if (absDiff <= 20) return 70;   // Fair
    if (absDiff <= 30) return 50;   // Needs improvement
    return 30;                       // Large gap
  });

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}
```

### 7. Canvas Skeleton Rendering

After detecting keypoints, we need to draw the skeleton on the image:

```typescript
// Skeleton connection definitions
export const POSE_CONNECTIONS: [number, number][] = [
  // Torso
  [11, 12], // Left shoulder - Right shoulder
  [11, 23], // Left shoulder - Left hip
  [12, 24], // Right shoulder - Right hip
  [23, 24], // Left hip - Right hip
  // Left arm
  [11, 13], // Left shoulder - Left elbow
  [13, 15], // Left elbow - Left wrist
  // Right arm
  [12, 14], // Right shoulder - Right elbow
  [14, 16], // Right elbow - Right wrist
  // Left leg
  [23, 25], // Left hip - Left knee
  [25, 27], // Left knee - Left ankle
  // Right leg
  [24, 26], // Right hip - Right knee
  [26, 28], // Right knee - Right ankle
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

  // Draw connection lines
  for (const [start, end] of POSE_CONNECTIONS) {
    const startLm = pose.landmarks[start];
    const endLm = pose.landmarks[end];
    
    // Only draw points with high visibility
    if (startLm.visibility > 0.5 && endLm.visibility > 0.5) {
      ctx.beginPath();
      ctx.moveTo(startLm.x * width, startLm.y * height);
      ctx.lineTo(endLm.x * width, endLm.y * height);
      ctx.stroke();
    }
  }

  // Draw keypoints
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

### 8. Angle Difference Visualization

Display angle difference labels at joint positions:

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

    // Choose color based on difference magnitude
    let bgColor = '#22c55e'; // Green - Perfect
    if (absDiff > 20) {
      bgColor = '#ef4444';   // Red - Needs adjustment
    } else if (absDiff > 10) {
      bgColor = '#f97316';   // Orange - Fair
    } else if (absDiff > 5) {
      bgColor = '#eab308';   // Yellow - Good
    }

    const text = `${diff > 0 ? '+' : ''}${diff.toFixed(0)}°`;
    
    // Draw label background
    const textWidth = ctx.measureText(text).width;
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.roundRect(x - textWidth/2 - 4, y - 24, textWidth + 8, 18, 4);
    ctx.fill();

    // Draw text
    ctx.fillStyle = '#fff';
    ctx.fillText(text, x, y - 15);
  }
}
```

## React Component Wrappers

### Image Upload Component

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
      alert('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size cannot exceed 10MB');
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
          <p className="text-gray-500">Click or drag image here</p>
        )}
      </div>
    </div>
  );
}
```

### Complete Pose Comparator Component

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
      
      // Calculate comparison results if both images are processed
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
          label="Reference Image (Standard Pose)"
          onImageSelect={handleReferenceSelect}
        />
        <ImageUpload
          label="Your Photo"
          onImageSelect={handleUserSelect}
        />
      </div>

      {isProcessing && (
        <div className="text-center py-4">
          <p>Analyzing pose...</p>
        </div>
      )}

      {score !== null && (
        <div className="text-center py-6">
          <h3 className="text-2xl font-bold">
            Pose Score: {score.toFixed(0)} points
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

## Performance Optimization Tips

### 1. Model Preloading

Start loading the model when the user enters the page, not when they upload an image:

```typescript
useEffect(() => {
  // Pre-initialize on page load
  initializePoseDetector().catch(console.error);
}, []);
```

### 2. Image Compression

Compress large images before upload to reduce detection time:

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

### 3. Web Workers

For complex calculations, consider using Web Workers to avoid blocking the main thread.

## Use Cases

This technical solution can be applied to various scenarios:

1. **Fitness Coaching**: Compare standard movements with user movements, provide correction suggestions
2. **Dance Training**: Analyze dance movement accuracy
3. **Rehabilitation**: Monitor whether patient recovery movements are standard
4. **Sports Training**: Analyze athletes' technical movements

If you're interested in fitness-related tools, check out these online calculators:

- [FFMI Calculator](https://muscletool.pro/en/tools/ffmi-calculator) - Assess your muscle development level
- [Skinfold Calculator](https://muscletool.pro/en/tools/skinfold-calculator) - Accurately measure body fat percentage
- [BMR Calculator](https://muscletool.pro/en/tools/bmr-calculator) - Calculate basal metabolic rate
- [Grecian Ideal Calculator](https://muscletool.pro/en/tools/grecian-calculator) - Calculate ideal golden ratio measurements

## Summary

This article covered how to implement human skeleton detection and pose comparison on the frontend using MediaPipe. Key technical points include:

1. **MediaPipe CDN Loading**: Load models via dynamic import, no backend required
2. **Joint Angle Calculation**: Use vector dot product formula to calculate three-point angles
3. **Canvas Visualization**: Draw skeleton and angle difference labels
4. **Scoring Algorithm**: Calculate comprehensive score based on angle differences

This solution runs entirely in the browser, protecting user privacy with fast response times—perfect for building interactive pose analysis applications.

---

**Related Links:**
- [MediaPipe Official Documentation](https://developers.google.com/mediapipe)
- [Live Demo: Bodybuilding Pose Comparator](https://muscletool.pro/en/tools/pose-comparator)
- [More Fitness Tools](https://muscletool.pro)

**Keywords:** MediaPipe, Human Pose Estimation, Skeleton Detection, Frontend Computer Vision, Pose Detection, Joint Angle Calculation, WebAssembly, Bodybuilding Pose Scoring, JavaScript ML, Browser-based AI
