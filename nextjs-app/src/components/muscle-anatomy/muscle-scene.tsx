'use client';

import { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MuscleModel } from './muscle-model';

interface MuscleSceneProps {
  onMuscleClick: (muscleId: string) => void;
  onMuscleHover: (muscleId: string | null) => void;
  hoveredMuscle: string | null;
  selectedMuscle: string | null;
  cameraView: 'front' | 'back' | 'default';
}

function CameraController({ view }: { view: 'front' | 'back' | 'default' }) {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (controlsRef.current) {
      const positions: Record<string, [number, number, number]> = {
        front: [0, 0.2, 2.5],
        back: [0, 0.2, -2.5],
        default: [1.5, 0.3, 2],
      };

      const [x, y, z] = positions[view];
      controlsRef.current.object.position.set(x, y, z);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [view]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={1}
      maxDistance={5}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
    />
  );
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
}: MuscleSceneProps) {
  return (
    <Canvas
      camera={{ position: [1.5, 0.3, 2], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
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
        />
      </Suspense>

      {/* 相机控制 */}
      <CameraController view={cameraView} />
    </Canvas>
  );
}
