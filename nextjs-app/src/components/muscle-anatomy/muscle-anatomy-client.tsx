'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { MuscleControls } from './muscle-controls';
import { MuscleDetailPanel } from './muscle-detail-panel';
import { MuscleExplanation } from './muscle-explanation';
import { MuscleSearch } from './muscle-search';
import { VirtualJoystick } from './virtual-joystick';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import type { Locale, Dictionary } from '@/lib/i18n';
import type { MuscleLayer } from '@/lib/data/muscles';

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
  const [muscleLayer, setMuscleLayer] = useState<MuscleLayer>('superficial');
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  
  // 摇杆控制状态
  const [rotationDelta, setRotationDelta] = useState({ x: 0, y: 0 });
  const [zoomDelta, setZoomDelta] = useState(0);
  
  // 3D 场景容器 ref
  const sceneContainerRef = useRef<HTMLDivElement>(null);

  // 检测 WebGL 支持和屏幕尺寸
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);
    setIsLoading(false);
    
    // 检测移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 禁用 3D 场景容器的触摸和滚轮事件（使用 non-passive 监听器）
  useEffect(() => {
    const container = sceneContainerRef.current;
    if (!container) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // 添加 non-passive 事件监听器
    container.addEventListener('wheel', preventScroll, { passive: false });
    container.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScroll);
      container.removeEventListener('touchmove', preventScroll);
    };
  }, [isLoading, isWebGLSupported]);

  const handleMuscleClick = (muscleId: string) => {
    const newSelected = muscleId === selectedMuscle ? null : muscleId;
    setSelectedMuscle(newSelected);
    // 移动端点击肌肉时打开底部抽屉
    if (isMobile && newSelected) {
      setSheetOpen(true);
    }
  };

  const handleMuscleHover = (muscleId: string | null) => {
    setHoveredMuscle(muscleId);
  };

  const handleViewChange = (view: 'front' | 'back' | 'default') => {
    setCameraView(view);
  };

  const handleLayerChange = (layer: MuscleLayer) => {
    setMuscleLayer(layer);
    // 切换层级时清除选中状态
    setSelectedMuscle(null);
  };

  const handleReset = () => {
    setCameraView('default');
    setSelectedMuscle(null);
  };

  // 搜索选中肌肉
  const handleSearchSelect = (muscleId: string) => {
    setSelectedMuscle(muscleId);
    // 移动端打开底部抽屉
    if (isMobile) {
      setSheetOpen(true);
    }
  };

  // 摇杆旋转控制
  const handleJoystickRotate = useCallback((deltaX: number, deltaY: number) => {
    setRotationDelta({ x: deltaX, y: deltaY });
  }, []);

  // 缩放控制
  const handleZoom = useCallback((delta: number) => {
    setZoomDelta(delta);
    // 重置缩放增量
    setTimeout(() => setZoomDelta(0), 50);
  }, []);

  // 重置视角
  const handleJoystickReset = useCallback(() => {
    setCameraView('default');
    setRotationDelta({ x: 0, y: 0 });
  }, []);

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
        <div className="flex items-center justify-center gap-2 mb-3">
          <h1 className="text-2xl md:text-4xl font-bold">
            {dict.muscleAnatomy.title}
          </h1>
          <span 
            className="px-2 py-0.5 text-xs font-bold text-white rounded-full"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {dict.muscleAnatomy.betaBadge}
          </span>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          {dict.muscleAnatomy.description}
        </p>
        {/* Beta 提示 */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          style={{ 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
          }}
        >
          <span className="text-amber-500">⚠️</span>
          <span className="text-muted-foreground">
            {dict.muscleAnatomy.betaNotice}
          </span>
        </div>
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
              <div className="flex flex-col gap-4">
                {/* 搜索框 */}
                <div className="flex justify-center">
                  <MuscleSearch dict={dict} onSelect={handleSearchSelect} />
                </div>
                {/* 视图和层级控制 */}
                <MuscleControls
                  onViewChange={handleViewChange}
                  onReset={handleReset}
                  currentView={cameraView}
                  muscleLayer={muscleLayer}
                  onLayerChange={handleLayerChange}
                  dict={dict}
                />
              </div>
            </div>
            
            {/* 3D 场景 */}
            <div 
              ref={sceneContainerRef}
              className="relative touch-none"
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
                muscleLayer={muscleLayer}
                rotationDelta={rotationDelta}
                zoomDelta={zoomDelta}
              />
              
              {/* 虚拟摇杆 - 右下角 */}
              <div className="absolute bottom-4 right-4 z-10">
                <VirtualJoystick
                  onRotate={handleJoystickRotate}
                  onZoom={handleZoom}
                  onReset={handleJoystickReset}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 信息面板 - 桌面端 */}
        <div className="hidden lg:block lg:col-span-1">
          <div 
            className="bg-card rounded-2xl p-6 sticky top-20"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
          >
            <MuscleDetailPanel
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

      {/* 移动端底部抽屉 */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent 
          side="bottom" 
          className="max-h-[75vh] rounded-t-2xl"
        >
          {/* 拖动指示条 */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
          </div>
          
          <SheetHeader className="pb-2">
            <SheetTitle className="text-center text-lg font-semibold text-primary">
              {selectedMuscle && dict.muscleAnatomy.muscles[selectedMuscle] 
                ? dict.muscleAnatomy.muscles[selectedMuscle] 
                : dict.muscleAnatomy.selectedMuscle}
            </SheetTitle>
            {/* 英文名称副标题 */}
            {selectedMuscle && locale === 'zh' && (
              <p className="text-sm text-muted-foreground text-center">
                {selectedMuscle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
            )}
            <SheetDescription className="sr-only">
              {dict.muscleAnatomy.description}
            </SheetDescription>
          </SheetHeader>
          
          <div className="px-4 pb-6 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 100px)' }}>
            <MuscleDetailPanel
              muscleId={selectedMuscle}
              locale={locale}
              dict={dict}
              compact={true}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* SEO 说明内容 */}
      <div className="mt-12">
        <MuscleExplanation dict={dict} />
      </div>
    </div>
  );
}
