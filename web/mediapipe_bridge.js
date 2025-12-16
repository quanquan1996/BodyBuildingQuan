// MediaPipe Pose Landmarker Bridge for Flutter Web
let poseLandmarker = null;
let isInitializing = false;
let initPromise = null;

// Initialize MediaPipe Pose Landmarker
async function initializePoseLandmarker() {
  if (poseLandmarker) {
    return true;
  }
  
  if (isInitializing) {
    return initPromise;
  }
  
  isInitializing = true;
  
  initPromise = (async () => {
    try {
      const { PoseLandmarker, FilesetResolver } = await import(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8"
      );
      
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
      );
      
      poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU"
        },
        runningMode: "IMAGE",
        numPoses: 1
      });
      
      console.log("MediaPipe Pose Landmarker initialized successfully");
      isInitializing = false;
      return true;
    } catch (error) {
      console.error("Failed to initialize MediaPipe:", error);
      isInitializing = false;
      throw error;
    }
  })();
  
  return initPromise;
}

// Detect pose from an image element
function detectPoseFromElement(imageElement) {
  if (!poseLandmarker) {
    console.error("Pose Landmarker not initialized");
    return null;
  }
  
  try {
    const result = poseLandmarker.detect(imageElement);
    if (result.landmarks && result.landmarks.length > 0) {
      return result.landmarks[0];
    }
    return null;
  } catch (error) {
    console.error("Pose detection failed:", error);
    return null;
  }
}

// Detect pose from image data URL
async function detectPoseFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const landmarks = detectPoseFromElement(img);
      resolve(landmarks);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = dataUrl;
  });
}

// Check if MediaPipe is ready
function isMediaPipeReady() {
  return poseLandmarker !== null;
}

// Export functions to window for Dart interop
window.initializePoseLandmarker = initializePoseLandmarker;
window.detectPoseFromElement = detectPoseFromElement;
window.detectPoseFromDataUrl = detectPoseFromDataUrl;
window.isMediaPipeReady = isMediaPipeReady;
