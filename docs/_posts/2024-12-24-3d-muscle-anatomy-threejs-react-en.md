---
layout: post
title: "Building Interactive 3D Human Muscle Anatomy in Browser: A Complete Guide with Three.js + React Three Fiber"
date: 2024-12-24
categories: [frontend, 3d, webgl]
tags: [Three.js, React Three Fiber, WebGL, Blender, 3D Model, Z-Anatomy]
excerpt: "A comprehensive guide on implementing an interactive 3D human muscle anatomy viewer in the browser, covering model processing, scene setup, interaction handling, and internationalization."
lang: en
---

This article provides a detailed guide on building an interactive 3D human muscle anatomy viewer in the browser. Users can rotate, zoom the model, and click on any muscle to see its name in both English and Chinese.

## Why Build This?

Traditional muscle anatomy learning typically relies on static images or expensive 3D software. As a fitness enthusiast, I wanted a free, easy-to-use online tool for learning muscle anatomy. So I decided to build one myself, based on the open-source Z-Anatomy project, running entirely in the browser.

If you want to try it first, check out this online [3D Muscle Anatomy](https://muscletool.pro/en/tools/muscle-anatomy) tool.

## Technical Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │  GLB Model  │ -> │  Three.js   │ -> │  React Three   │  │
│  │  (Draco)    │    │  Rendering  │    │  Fiber Comp.   │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│                            │                                │
│         ┌──────────────────┼──────────────────┐             │
│         v                  v                  v             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │  Raycasting │    │  Highlight  │    │  i18n Trans │      │
│  │  Detection  │    │  Materials  │    │  Bilingual  │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## Model Source and Processing

### Z-Anatomy Open Source Project

[Z-Anatomy](https://www.z-anatomy.com/) is an open-source human anatomy Blender project containing complete human muscles, bones, organs, and other structures. The original file is about 300MB with 1000+ individual mesh objects.

### Model Export and Compression

To use it on the web, we need to export the Blender file to GLB format with Draco compression:

```python
# export_cli.py - Blender CLI export script
import bpy

# Select all muscle-related objects
muscle_keywords = ['muscle', 'deltoid', 'bicep', 'tricep', 'pectoralis', ...]

for obj in bpy.data.objects:
    if obj.type == 'MESH':
        name_lower = obj.name.lower()
        if any(keyword in name_lower for keyword in muscle_keywords):
            obj.select_set(True)

# Export to GLB with Draco compression
bpy.ops.export_scene.gltf(
    filepath='muscle-anatomy.glb',
    export_format='GLB',
    use_selection=True,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)
```

The exported model is compressed from 300MB to about 6.8MB, perfect for web loading.

## Core Implementation

### 1. Scene Setup (React Three Fiber)

{% raw %}
```tsx
// muscle-scene.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export function MuscleScene({ onMuscleClick, onMuscleHover, hoveredMuscle, selectedMuscle }) {
  return (
    <Canvas camera={{ position: [1.5, 0.3, 2], fov: 50 }}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      {/* 3D Model */}
      <Suspense fallback={null}>
        <MuscleModel
          onMuscleClick={onMuscleClick}
          onMuscleHover={onMuscleHover}
          hoveredMuscle={hoveredMuscle}
          selectedMuscle={selectedMuscle}
        />
      </Suspense>
      
      {/* Orbit Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={1}
        maxDistance={5}
        target={[0, 0.5, 0]}
      />
      
      {/* Environment Map */}
      <Environment preset="studio" />
    </Canvas>
  );
}
```
{% endraw %}

### 2. Model Loading and Muscle Identification

{% raw %}
```tsx
// muscle-model.tsx
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Muscle identification keywords
const muscleKeywords = [
  'muscle', 'deltoid', 'bicep', 'tricep', 'pectoralis',
  'latissimus', 'trapezius', 'rectus', 'oblique', 'gluteus',
  'quadricep', 'vastus', 'hamstring', 'gastrocnemius', 'soleus',
  // ... more keywords
];

// Non-muscle objects to hide
const HIDDEN_KEYWORDS = [
  'region', 'fascia', 'bursa', 'ligament', 'membrane',
  '.j', '.t', // Z-Anatomy label suffixes
];

function isMuscle(name: string): boolean {
  const lowerName = name.toLowerCase();
  return muscleKeywords.some(keyword => lowerName.includes(keyword))
    && !HIDDEN_KEYWORDS.some(keyword => lowerName.includes(keyword));
}

export function MuscleModel({ onMuscleClick, onMuscleHover, hoveredMuscle, selectedMuscle }) {
  const { scene } = useGLTF('/models/muscle-anatomy.glb');
  
  // Clone scene and process materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (shouldHide(child.name)) {
          child.parent?.remove(child);
          return;
        }
        
        if (isMuscle(child.name)) {
          // Set red-toned material for muscles
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

### 3. Interactive Highlight Effects

{% raw %}
```tsx
// Highlight color configuration
const HIGHLIGHT_COLOR = new THREE.Color(0x5ac57a);  // Mint green - hover
const SELECTED_COLOR = new THREE.Color(0x4caf50);   // Dark green - selected

// Update highlight effects
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

### 4. Muscle Name Mapping and i18n

Z-Anatomy uses naming format like `Muscle name.l` (left) / `Muscle name.r` (right). We need to map these to standard muscle IDs:

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
  // ... more mappings
};

export function getMuscleIdFromModelName(modelName: string): string | undefined {
  const cleanName = modelName
    .replace(/\.(l|r|el|er)$/i, '')  // Remove left/right suffix
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

Translations are stored in i18n modules:

{% raw %}
```typescript
// locales/en/muscle-anatomy.ts
export const muscleAnatomy = {
  muscles: {
    pectoralis_major: 'Pectoralis Major',
    biceps_brachii: 'Biceps Brachii',
    triceps_brachii: 'Triceps Brachii',
    latissimus_dorsi: 'Latissimus Dorsi',
    rectus_abdominis: 'Rectus Abdominis',
    gluteus_maximus: 'Gluteus Maximus',
    quadriceps_femoris: 'Quadriceps Femoris',
    gastrocnemius: 'Gastrocnemius',
    // ... 150+ muscle translations
  },
};
```
{% endraw %}

## Mobile Interaction Optimization

On mobile devices, traditional OrbitControls conflicts with page scrolling, resulting in poor user experience. We need a custom interaction solution.

### 1. Disable Default Touch Behavior

First, disable default touch behavior on Canvas and container to prevent scroll passthrough:

{% raw %}
```tsx
// muscle-scene.tsx
<Canvas
  style={{ 
    touchAction: 'none',  // Disable touch gestures
  }}
  onPointerMissed={() => {}}  // Disable default click behavior
>
```
{% endraw %}

Also add non-passive event listeners on the container:

{% raw %}
```tsx
// muscle-anatomy-client.tsx
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const preventScroll = (e: TouchEvent) => {
    e.preventDefault();
  };

  // Use non-passive listeners to prevent scrolling
  container.addEventListener('touchmove', preventScroll, { passive: false });
  container.addEventListener('touchstart', preventScroll, { passive: false });

  return () => {
    container.removeEventListener('touchmove', preventScroll);
    container.removeEventListener('touchstart', preventScroll);
  };
}, []);
```
{% endraw %}

### 2. Virtual Joystick Controller

To provide a good interaction experience on mobile, I implemented a virtual joystick component:

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

  // Continuous rotation animation
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

  // Handle drag
  const handleMove = (clientX: number, clientY: number) => {
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // Constrain within circular bounds
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setKnobPosition({ x: deltaX, y: deltaY });
  };

  // Stop rotation on release
  const handleEnd = () => {
    setIsDragging(false);
    setKnobPosition({ x: 0, y: 0 });
    onRotate(0, 0);  // Key: notify parent to stop rotation
  };

  return (
    <div className="flex items-center gap-3">
      {/* Zoom buttons */}
      <div className="flex flex-col gap-2">
        <Button onMouseDown={() => startZoom(-0.15)}>
          <ZoomIn />
        </Button>
        <Button onMouseDown={() => startZoom(0.15)}>
          <ZoomOut />
        </Button>
      </div>

      {/* Joystick */}
      <div
        ref={joystickRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ width: joystickRadius * 2, height: joystickRadius * 2 }}
      >
        {/* Base */}
        <div className="absolute inset-0 rounded-full" />
        {/* Knob */}
        <div
          style={{
            left: `calc(50% - ${knobRadius}px + ${knobPosition.x}px)`,
            top: `calc(50% - ${knobRadius}px + ${knobPosition.y}px)`,
          }}
        />
      </div>

      {/* Reset button */}
      <Button onClick={onReset}>
        <RotateCcw />
      </Button>
    </div>
  );
}
```
{% endraw %}

### 3. Custom Camera Controller

Replace OrbitControls with a spherical coordinate system for camera control:

{% raw %}
```tsx
// CameraController - supports external control
function CameraController({ view, rotationDelta, zoomDelta }) {
  const { camera } = useThree();
  const spherical = useRef(new THREE.Spherical(2.5, Math.PI / 2, 0));
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let needsUpdate = false;

    // Handle rotation
    if (rotationDelta && (rotationDelta.x !== 0 || rotationDelta.y !== 0)) {
      spherical.current.theta -= rotationDelta.x;
      spherical.current.phi = Math.max(
        Math.PI / 6,
        Math.min(Math.PI - Math.PI / 6, spherical.current.phi + rotationDelta.y)
      );
      needsUpdate = true;
    }

    // Handle zoom
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

### 4. Long-Press Zoom

Zoom buttons support continuous zooming on long press:

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

This solution provides smooth interaction on both PC and mobile while avoiding conflicts with page scrolling.

## Performance Optimization

### 1. Model Compression

- Use Draco compression, reducing model from 300MB to 6.8MB
- Use Decimate Modifier in Blender to reduce polygon count

### 2. Dynamic Loading

{% raw %}
```tsx
// Use Next.js dynamic import, disable SSR
const MuscleScene = dynamic(
  () => import('./muscle-scene').then((mod) => mod.MuscleScene),
  { ssr: false }
);
```
{% endraw %}

### 3. Material Optimization

- Clone materials to avoid global modifications
- Use emissive property for highlighting, avoiding material recreation

## Use Cases

This technical solution can be applied to various scenarios:

1. **Fitness Education**: Help fitness enthusiasts learn muscle locations and names
2. **Medical Teaching**: Assist medical students in learning human anatomy
3. **Rehabilitation Guidance**: Show specific muscle group locations
4. **Game Development**: Character muscle system reference

If you're interested in fitness-related tools, check out these online calculators:

- [FFMI Calculator](https://muscletool.pro/en/tools/ffmi-calculator) - Evaluate your muscle development level
- [Skinfold Calculator](https://muscletool.pro/en/tools/skinfold-calculator) - Accurately measure body fat percentage
- [Bodybuilding Pose Comparator](https://muscletool.pro/en/tools/pose-comparator) - AI-powered pose scoring
- [Grecian Ideal Calculator](https://muscletool.pro/en/tools/grecian-calculator) - Calculate ideal golden ratio measurements

## Summary

This article covered how to implement an interactive 3D human muscle anatomy viewer using Three.js + React Three Fiber. Key technical points include:

1. **Model Processing**: Export and compress GLB model from Z-Anatomy
2. **Scene Setup**: Build 3D scene with React Three Fiber
3. **Interaction**: Raycasting detection + material highlighting
4. **Mobile Optimization**: Virtual joystick + custom camera controller + touch event handling
5. **Internationalization**: Bilingual muscle name translations

This solution runs entirely in the browser without backend services, making it perfect for building educational 3D visualization applications.

---

**Related Links:**
- [Z-Anatomy Open Source Project](https://www.z-anatomy.com/)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Try Online: 3D Muscle Anatomy](https://muscletool.pro/en/tools/muscle-anatomy)
- [More Fitness Tools](https://muscletool.pro)
