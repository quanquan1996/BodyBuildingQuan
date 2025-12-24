'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { MuscleControls } from './muscle-controls';
import { MuscleTooltip } from './muscle-tooltip';
import { MuscleExplanation } from './muscle-explanation';
import type { Locale, Dictionary } from '@/lib/i18n';

// 动态导入 3D 场景组件，禁用 SSR
const MuscleScene = dynamic(
  () => import('./muscle-scene').then((mod) => mod.MuscleScene),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

interface MuscleAnatomyClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function MuscleAnatomyClient({ locale, dict }: MuscleAnatomyClientProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const [cameraView, setCameraView] = useState<'front' | 'back' | 'default'>('default');
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检测 WebGL 支持
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
    setIsLoading(false);
  }, []);

  const handleMuscleClick = (muscleId: string) => {
    setSelectedMuscle(muscleId === selectedMuscle ? null : muscleId);
  };

  const handleMuscleHover = (muscleId: string | null) => {
    setHoveredMuscle(muscleId);
  };

  const handleViewChange = (view: 'front' | 'back' | 'default') => {
    setCameraView(view);
  };

  const handleReset = () => {
    setCameraView('default');
    setSelectedMuscle(null);
  };

  // 加载中
  if (isLoading) {
    return (
      <div className="container py-8 md:py-12 px-4 md:px-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">{dict.muscleAnatomy.loading}</span>
        </div>
      </div>
    );
  }

  // WebGL 不支持
  if (isWebGLSupported === false) {
    return (
      <div className="container py-8 md:py-12 px-4 md:px-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-xl font-semibold mb-2">WebGL Not Supported</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {dict.muscleAnatomy.webglError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          {dict.muscleAnatomy.title}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {dict.muscleAnatomy.description}
        </p>
      </div>

      {/* 主内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D 视图区域 */}
        <div className="lg:col-span-2">
          <div 
            className="bg-card rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
          >
            {/* 控制按钮 */}
            <div className="p-4 border-b">
              <MuscleControls
                onViewChange={handleViewChange}
                onReset={handleReset}
                currentView={cameraView}
                dict={dict}
              />
            </div>
            
            {/* 3D 场景 */}
            <div 
              className="relative"
              style={{ 
                height: '500px',
                background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
              }}
            >
              <MuscleScene
                onMuscleClick={handleMuscleClick}
                onMuscleHover={handleMuscleHover}
                hoveredMuscle={hoveredMuscle}
                selectedMuscle={selectedMuscle}
                cameraView={cameraView}
              />
            </div>
          </div>
        </div>

        {/* 信息面板 */}
        <div className="lg:col-span-1">
          <div 
            className="bg-card rounded-2xl p-6 sticky top-20"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
          >
            <MuscleTooltip
              muscleId={selectedMuscle || hoveredMuscle}
              locale={locale}
              dict={dict}
            />
            
            {/* 提示信息 */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-3">
                {dict.muscleAnatomy.explanation.howToUse}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {dict.muscleAnatomy.explanation.howToUseList.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SEO 说明内容 */}
      <div className="mt-12">
        <MuscleExplanation dict={dict} />
      </div>
    </div>
  );
}
