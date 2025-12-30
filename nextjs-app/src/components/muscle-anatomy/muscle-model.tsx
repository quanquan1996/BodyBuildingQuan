'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { getMuscleIdFromModelName, getMuscleLayer, type MuscleLayer } from '@/lib/data/muscles';

interface MuscleModelProps {
  onMuscleClick: (muscleId: string) => void;
  onMuscleHover: (muscleId: string | null) => void;
  hoveredMuscle: string | null;
  selectedMuscle: string | null;
  muscleLayer: MuscleLayer;
}

// 高亮颜色
const HIGHLIGHT_COLOR = new THREE.Color(0x5ac57a); // 薄荷绿
const SELECTED_COLOR = new THREE.Color(0x4caf50); // 深绿

// 肌肉颜色调色板 - 更自然的肌肉红色系
const MUSCLE_COLORS = [
  new THREE.Color(0xb85450), // 深红
  new THREE.Color(0xc96b67), // 中红
  new THREE.Color(0xd4817e), // 浅红
  new THREE.Color(0xa84a47), // 暗红
  new THREE.Color(0xbe5f5c), // 玫瑰红
  new THREE.Color(0xcc7673), // 珊瑚红
  new THREE.Color(0x9e4340), // 砖红
  new THREE.Color(0xb35855), // 赭红
];

// 根据名称生成一致的颜色索引
function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % MUSCLE_COLORS.length;
}

// 需要隐藏的非肌肉对象关键词（区域标记、标签等）
const HIDDEN_KEYWORDS = [
  'region',
  'fascia',
  'bursa',
  'tendon sheath',
  'retinaculum',
  'membrane',
  'ligament',
  'nodes',
  'fissure',
  'groove',
  'notch',
  'border',
  'line',
  'cord',
  'gyrus',
  '.j', // Z-Anatomy 的标签后缀
  '.t', // Z-Anatomy 的文本后缀
  'joints',
  'compartment',
  'pectoral girdle', // 胸带（骨骼结构）
  'interpectoral', // 胸肌间淋巴结
];

// 检查是否应该隐藏这个对象
function shouldHide(name: string): boolean {
  const lowerName = name.toLowerCase();
  return HIDDEN_KEYWORDS.some((keyword) => lowerName.includes(keyword));
}

// 检查是否是肌肉 mesh（通过名称判断）
function isMuscle(name: string): boolean {
  const muscleKeywords = [
    'muscle',
    'deltoid',
    'bicep',
    'tricep',
    'pectoralis', // 改为更精确的匹配
    'latissimus',
    'trapezius',
    'rectus',
    'oblique',
    'gluteus',
    'quadricep',
    'vastus',
    'hamstring',
    'gastrocnemius',
    'soleus',
    'tibialis',
    'serratus',
    'rhomboid',
    'erector',
    'teres',
    'infraspinatus',
    'adductor',
    'brachialis',
    'forearm',
    'flexor',
    'extensor',
    'femoris',
    'semitendinosus',
    'semimembranosus',
    'tensor',
    'sartorius',
    'gracilis',
    'piriformis',
    'iliopsoas',
    'subscapularis',
    'supraspinatus',
    'longissimus',
    'iliocostalis',
    'spinalis',
    'multifidus',
    'scalenus',
    'sternocleidomastoid',
    'omohyoid',
    'sternohyoid',
    'thyrohyoid',
    'digastric',
    'mylohyoid',
    'geniohyoid',
    'stylohyoid',
    'masseter',
    'temporalis',
    'pterygoid',
    'orbicularis',
    'zygomaticus',
    'frontalis',
    'occipitalis',
    'nasalis',
    'mentalis',
    'risorius',
    'procerus',
    'platysma',
    'longus',
    'iliacus',
    'psoas',
    'quadratus',
    'popliteus',
    'plantaris',
    'interossei',
    'lumbrical',
    'opponens',
    'abductor',
    'pronator',
    'supinator',
    'anconeus',
    'coracobrachialis',
    'sternocostal', // 胸大肌的胸肋部
    'clavicular head', // 锁骨头
    'intercostal', // 肋间肌
    'transversus', // 腹横肌
    'pyramidalis', // 锥状肌
    'subclavius', // 锁骨下肌
  ];
  const lowerName = name.toLowerCase();
  // 必须包含肌肉关键词，且不在隐藏列表中
  return (
    muscleKeywords.some((keyword) => lowerName.includes(keyword)) &&
    !shouldHide(name)
  );
}

// 获取肌肉的基础名称（去除左右后缀，用于同一肌肉使用相同颜色）
function getBaseMuscleNam(name: string): string {
  // 移除 Z-Anatomy 的后缀 (.l, .r, .el, .er, .ol, .or 等)
  return name
    .replace(/\.(l|r|el|er|ol|or|e\d+l|e\d+r|o\d+l|o\d+r)$/i, '')
    .toLowerCase();
}

export function MuscleModel({
  onMuscleClick,
  onMuscleHover,
  hoveredMuscle,
  selectedMuscle,
  muscleLayer,
}: MuscleModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // 加载模型 - useGLTF 会自动处理加载状态
  const { scene } = useGLTF('/models/muscle-anatomy.glb');

  // 存储原始材质
  const originalMaterials = useRef<
    Map<string, THREE.Material | THREE.Material[]>
  >(new Map());

  // 初始化：克隆场景并存储原始材质
  const clonedScene = useMemo(() => {
    if (!scene || !scene.children.length) {
      console.log('No scene or empty scene');
      return null;
    }

    console.log('Scene loaded, children count:', scene.children.length);

    const clone = scene.clone(true);

    let muscleCount = 0;
    let hiddenCount = 0;
    const objectsToRemove: THREE.Object3D[] = [];

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 标记需要移除的非肌肉对象（区域标记、标签等）
        if (shouldHide(child.name)) {
          objectsToRemove.push(child);
          hiddenCount++;
          return;
        }

        const isMuscleMesh = isMuscle(child.name);

        if (isMuscleMesh) {
          muscleCount++;
          // 确保肌肉可以被射线检测
          child.layers.enable(0);
        } else {
          // 非肌肉对象禁用射线检测，但保持可见
          child.layers.disable(0);
        }

        // 克隆材质以便独立修改
        if (Array.isArray(child.material)) {
          child.material = child.material.map((m: THREE.Material) => {
            const cloned = m.clone();
            // 为肌肉设置颜色（基于名称生成不同色调）
            if (isMuscleMesh && cloned instanceof THREE.MeshStandardMaterial) {
              const baseName = getBaseMuscleNam(child.name);
              const colorIndex = getColorIndex(baseName);
              cloned.color = MUSCLE_COLORS[colorIndex].clone();
              // 添加轻微的边缘效果
              cloned.roughness = 0.7;
              cloned.metalness = 0.1;
            }
            return cloned;
          });
          originalMaterials.current.set(
            child.uuid,
            child.material.map((m: THREE.Material) => m.clone())
          );
        } else {
          child.material = child.material.clone();
          // 为肌肉设置颜色
          if (
            isMuscleMesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            const baseName = getBaseMuscleNam(child.name);
            const colorIndex = getColorIndex(baseName);
            child.material.color = MUSCLE_COLORS[colorIndex].clone();
            // 添加轻微的边缘效果
            child.material.roughness = 0.7;
            child.material.metalness = 0.1;
          }
          originalMaterials.current.set(child.uuid, child.material.clone());
        }
      }
    });

    // 从场景中完全移除需要隐藏的对象
    objectsToRemove.forEach((obj) => {
      if (obj.parent) {
        obj.parent.remove(obj);
      }
    });

    console.log('Muscle meshes found:', muscleCount);
    console.log('Removed objects:', hiddenCount);

    return clone;
  }, [scene]);

  // 更新高亮效果
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && isMuscle(child.name)) {
        const material = child.material as THREE.MeshStandardMaterial;

        // 获取当前 mesh 对应的肌肉 ID
        const meshMuscleId = getMuscleIdFromModelName(child.name) || child.name;

        const isHovered =
          meshMuscleId === hoveredMuscle || child.name === hoveredMuscle;
        const isSelected =
          meshMuscleId === selectedMuscle || child.name === selectedMuscle;

        if (material && 'emissive' in material) {
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
      }
    });
  }, [hoveredMuscle, selectedMuscle, clonedScene]);

  // 根据层级显示/隐藏肌肉
  useEffect(() => {
    if (!clonedScene) return;
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh && isMuscle(child.name)) {
        const meshMuscleId = getMuscleIdFromModelName(child.name) || child.name;
        const layer = getMuscleLayer(meshMuscleId);
        const shouldShow = layer === muscleLayer;
        
        child.visible = shouldShow;
        
        if (shouldShow) {
          child.layers.enable(0);
        } else {
          child.layers.disable(0);
        }
      }
    });
  }, [muscleLayer, clonedScene]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    // 只对肌肉 mesh 响应
    if (mesh.name && isMuscle(mesh.name)) {
      // 尝试匹配到已知肌肉
      const muscleId = getMuscleIdFromModelName(mesh.name) || mesh.name;
      onMuscleHover(muscleId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    onMuscleHover(null);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const mesh = e.object as THREE.Mesh;
    // 只对肌肉 mesh 响应
    if (mesh.name && isMuscle(mesh.name)) {
      const muscleId = getMuscleIdFromModelName(mesh.name) || mesh.name;
      onMuscleClick(muscleId);
    }
  };

  if (!clonedScene) {
    return null;
  }

  return (
    <primitive
      ref={groupRef}
      object={clonedScene}
      scale={1}
      position={[0, -0.84, 0]}
      rotation={[0, 0, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    />
  );
}

// 预加载模型
useGLTF.preload('/models/muscle-anatomy.glb');
