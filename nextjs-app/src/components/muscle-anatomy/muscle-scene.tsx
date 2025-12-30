'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { MuscleModel } from './muscle-model';
import type { MuscleLayer } from '@/lib/data/muscles';
import * as THREE from 'three';

interface MuscleSceneProps {
  onMuscleClick: (muscleId: string) => void;
  onMuscleHover: (muscleId: string | null) => void;
  hoveredMuscle: string | null;
  selectedMuscle: string | null;
  cameraView: 'front' | 'back' | 'default';
  muscleLayer: MuscleLayer;
  rotationDelta?: { x: number; y: number };
  zoomDelta?: number;
}

// 相机控制器 - 支持外部控制
function CameraController({ 
  view, 
  rotationDelta, 
  zoomDelta 
}: { 
  view: 'front' | 'back' | 'default';
  rotationDelta?: { x: number; y: number };
  zoomDelta?: number;
}) {
  const { camera } = useThree();
  const spherical = useRef(new THREE.Spherical(2.5, Math.PI / 2, 0));
  const target = useRef(new THREE.Vector3(0, 0, 0));

  // 视图切换
  useEffect(() => {
    const positions: Record<string, { phi: number; theta: number; radius: number }> = {
      front: { phi: Math.PI / 2, theta: 0, radius: 2.5 },
      back: { phi: Math.PI / 2, theta: Math.PI, radius: 2.5 },
      default: { phi: Math.PI / 2.5, theta: Math.PI / 4, radius: 2.5 },
    };

    const { phi, theta, radius } = positions[view];
    spherical.current.set(radius, phi, theta);
    
    const pos = new THREE.Vector3().setFromSpherical(spherical.current);
    camera.position.copy(pos);
    camera.lookAt(target.current);
  }, [view, camera]);

  // 处理旋转和缩放
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

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#5AC57A" wireframe />
    </mesh>
  );
}

export function MuscleScene({
  onMuscleClick,
  onMuscleHover,
  hoveredMuscle,
  selectedMuscle,
  cameraView,
  muscleLayer,
  rotationDelta,
  zoomDelta,
}: MuscleSceneProps) {
  return (
    <Canvas
      camera={{ position: [1.5, 0.3, 2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ 
        background: 'transparent',
      }}
      // 禁用默认的触摸和鼠标拖拽控制
      onPointerMissed={() => {}}
    >
      {/* 环境光 */}
      <ambientLight intensity={0.6} />
      
      {/* 主光源 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      
      {/* 补光 */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.4}
      />
      
      {/* 底部补光 */}
      <directionalLight
        position={[0, -3, 0]}
        intensity={0.2}
      />

      {/* 3D 模型 */}
      <Suspense fallback={<LoadingFallback />}>
        <MuscleModel
          onMuscleClick={onMuscleClick}
          onMuscleHover={onMuscleHover}
          hoveredMuscle={hoveredMuscle}
          selectedMuscle={selectedMuscle}
          muscleLayer={muscleLayer}
        />
      </Suspense>

      {/* 相机控制 - 禁用触摸，使用外部控制 */}
      <CameraController 
        view={cameraView} 
        rotationDelta={rotationDelta}
        zoomDelta={zoomDelta}
      />
    </Canvas>
  );
}
