# 图片上传错误修复报告

## 🐛 错误描述

用户上传图片时出现以下错误：

```
Failed to execute 'texImage2D' on 'WebGL2RenderingContext': Overload resolution failed.
```

**错误位置**: `src/lib/mediapipe/pose-detector.ts` (72:33) @ detectPose

**调用栈**:
1. `detectPose` - pose-detector.ts
2. `async handleReferenceImageSelect` - pose-comparator/page.tsx

## 🔍 根本原因

### 问题 1: 类型不匹配

`detectPose` 函数期望接收 `HTMLImageElement` 类型：
```typescript
export async function detectPose(imageElement: HTMLImageElement): Promise<PoseResult | null>
```

但是页面传递的是 `string` 类型的 dataUrl：
```typescript
const handleReferenceImageSelect = async (file: File, dataUrl: string) => {
  const pose = await detectPose(dataUrl); // ❌ 类型错误
}
```

### 问题 2: PoseResult 类型未导出

页面从 `@/lib/mediapipe/pose-detector` 导入 `PoseResult`：
```typescript
import { detectPose, type PoseResult } from '@/lib/mediapipe/pose-detector';
```

但 `pose-detector.ts` 没有导出这个类型，导致 TypeScript 错误。

### 问题 3: PoseCanvas 不需要的 title 属性

页面传递了 `title` 属性给 `PoseCanvas`：
```typescript
<PoseCanvas
  imageUrl={referenceImage}
  userPose={referencePose}
  title={dict.poseComparator.uploadReference} // ❌ 不存在的属性
/>
```

但 `PoseCanvas` 组件的 props 接口中没有定义 `title` 属性。

## ✅ 修复方案

### 修复 1: 更新 detectPose 函数支持 string 类型

**文件**: `src/lib/mediapipe/pose-detector.ts`

```typescript
// 修改前
export async function detectPose(imageElement: HTMLImageElement): Promise<PoseResult | null>

// 修改后
export async function detectPose(imageSource: HTMLImageElement | string): Promise<PoseResult | null> {
  // ... 初始化代码 ...

  // 如果 imageSource 是 string (dataUrl)，创建 HTMLImageElement
  let imageElement: HTMLImageElement;
  if (typeof imageSource === 'string') {
    imageElement = new Image();
    imageElement.src = imageSource;
    // 等待图片加载完成
    await new Promise((resolve, reject) => {
      imageElement.onload = resolve;
      imageElement.onerror = reject;
    });
  } else {
    imageElement = imageSource;
  }

  const result = poseLandmarker.detect(imageElement);
  // ... 其余代码 ...
}
```

**关键改动**:
1. 参数类型从 `HTMLImageElement` 改为 `HTMLImageElement | string`
2. 添加类型检查，如果是 string 则创建 Image 对象
3. 使用 Promise 等待图片加载完成，确保 MediaPipe 可以处理

### 修复 2: 导出 PoseResult 类型

**文件**: `src/lib/mediapipe/pose-detector.ts`

```typescript
import { PoseResult, PoseLandmark } from '@/types/pose';

// 重新导出类型以便使用
export type { PoseResult, PoseLandmark } from '@/types/pose';
```

这样页面就可以从 `pose-detector.ts` 导入 `PoseResult` 类型了。

### 修复 3: 移除不需要的 title 属性

**文件**: `src/app/[locale]/tools/pose-comparator/page.tsx`

```typescript
// 修改前
<PoseCanvas
  imageUrl={referenceImage}
  userPose={referencePose}
  title={dict.poseComparator.uploadReference}
/>

// 修改后
<PoseCanvas
  imageUrl={referenceImage}
  userPose={referencePose}
/>
```

移除了两处 `PoseCanvas` 组件的 `title` 属性。

## 📊 修复统计

### 修改的文件
1. `src/lib/mediapipe/pose-detector.ts` - 更新函数签名和类型导出
2. `src/app/[locale]/tools/pose-comparator/page.tsx` - 移除不需要的属性

### 代码变更
- 函数签名更新: 1 处
- 类型导出: 2 个类型
- 图片加载逻辑: 新增 8 行
- 移除属性: 2 处

## 🎯 验证结果

### TypeScript 检查
```
✅ pose-detector.ts - 无错误
✅ pose-comparator/page.tsx - 无错误
```

### 功能测试
- ✅ 图片上传功能正常
- ✅ MediaPipe 姿态检测正常工作
- ✅ 骨架绘制正常显示
- ✅ 中英文版本都正常工作

## 🔧 技术细节

### 为什么需要等待图片加载？

MediaPipe 的 `detect()` 方法需要一个完全加载的图片元素。如果直接传递刚创建的 Image 对象（还没加载完成），会导致 WebGL 错误。

```typescript
const imageElement = new Image();
imageElement.src = dataUrl;
// ❌ 此时图片还没加载完成，直接使用会报错

// ✅ 正确做法：等待加载完成
await new Promise((resolve, reject) => {
  imageElement.onload = resolve;
  imageElement.onerror = reject;
});
// 现在图片已加载，可以安全使用
```

### 为什么支持两种类型？

支持 `HTMLImageElement | string` 提供了更大的灵活性：

1. **string (dataUrl)**: 适合从文件上传获取的 base64 数据
2. **HTMLImageElement**: 适合从 DOM 中已存在的图片元素

这样函数可以在不同场景下使用，提高了代码的复用性。

## 📝 相关问题

这次修复解决了以下相关问题：

1. ✅ WebGL 纹理加载错误
2. ✅ TypeScript 类型错误
3. ✅ 组件属性不匹配错误
4. ✅ 图片上传后无法检测姿态的问题

## 🎉 总结

通过这次修复：

1. **解决了核心问题**: 图片上传后可以正常进行姿态检测
2. **改进了类型安全**: 正确导出和使用类型
3. **提高了代码质量**: 移除了不必要的属性
4. **增强了灵活性**: detectPose 函数现在支持多种输入类型

现在 Pose Comparator 工具可以正常工作了！用户可以上传图片并获得姿态分析结果。
