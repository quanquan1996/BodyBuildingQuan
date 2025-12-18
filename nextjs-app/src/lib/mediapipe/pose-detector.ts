import { PoseResult, PoseLandmark } from '@/types/pose';

// Re-export types for convenience
export type { PoseResult, PoseLandmark } from '@/types/pose';

let poseLandmarker: any = null;
let isInitializing = false;
let FilesetResolver: any = null;
let PoseLandmarkerClass: any = null;

async function loadMediaPipe(): Promise<void> {
  if (FilesetResolver && PoseLandmarkerClass) return;
  
  // Dynamically import MediaPipe from CDN
  // @ts-ignore - CDN dynamic import
  const vision = await import(
    /* webpackIgnore: true */
    // @ts-ignore
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/vision_bundle.mjs'
  );
  
  FilesetResolver = vision.FilesetResolver;
  PoseLandmarkerClass = vision.PoseLandmarker;
}

export async function initializePoseDetector(): Promise<void> {
  if (poseLandmarker) return;
  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }
  
  isInitializing = true;
  
  try {
    await loadMediaPipe();
    
    if (!FilesetResolver || !PoseLandmarkerClass) {
      throw new Error('MediaPipe modules not loaded');
    }

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
  } catch (error) {
    console.error('Failed to initialize pose detector:', error);
    throw error;
  } finally {
    isInitializing = false;
  }
}

export async function detectPose(imageSource: HTMLImageElement | string): Promise<PoseResult | null> {
  if (!poseLandmarker) {
    await initializePoseDetector();
  }

  if (!poseLandmarker) {
    throw new Error('Pose detector not initialized');
  }

  // If imageSource is a string (dataUrl), create an HTMLImageElement
  let imageElement: HTMLImageElement;
  if (typeof imageSource === 'string') {
    imageElement = new Image();
    imageElement.src = imageSource;
    // Wait for image to load
    await new Promise((resolve, reject) => {
      imageElement.onload = resolve;
      imageElement.onerror = reject;
    });
  } else {
    imageElement = imageSource;
  }

  const result = poseLandmarker.detect(imageElement);

  if (!result.landmarks || result.landmarks.length === 0) {
    return null;
  }

  const landmarks: PoseLandmark[] = result.landmarks[0].map((lm: any) => ({
    x: lm.x,
    y: lm.y,
    z: lm.z,
    visibility: lm.visibility ?? 1,
  }));

  const worldLandmarks: PoseLandmark[] = result.worldLandmarks?.[0]?.map((lm: any) => ({
    x: lm.x,
    y: lm.y,
    z: lm.z,
    visibility: lm.visibility ?? 1,
  })) ?? [];

  return {
    landmarks,
    worldLandmarks,
    timestamp: Date.now(),
  };
}

export function isPoseDetectorReady(): boolean {
  return poseLandmarker !== null;
}
