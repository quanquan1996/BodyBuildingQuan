'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VirtualJoystickProps {
  onRotate: (deltaX: number, deltaY: number) => void;
  onZoom: (delta: number) => void;
  onReset: () => void;
}

export function VirtualJoystick({ onRotate, onZoom, onReset }: VirtualJoystickProps) {
  const joystickRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const joystickRadius = 50; // 摇杆底座半径
  const knobRadius = 24; // 摇杆球半径
  const maxDistance = joystickRadius - knobRadius / 2;

  // 持续旋转
  useEffect(() => {
    if (isDragging && (knobPosition.x !== 0 || knobPosition.y !== 0)) {
      const animate = () => {
        // 根据摇杆位置计算旋转速度
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

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!joystickRef.current) return;
    setIsDragging(true);
    
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // 限制在圆形范围内
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setKnobPosition({ x: deltaX, y: deltaY });
  }, [maxDistance]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!joystickRef.current || !isDragging) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;

    // 限制在圆形范围内
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > maxDistance) {
      deltaX = (deltaX / distance) * maxDistance;
      deltaY = (deltaY / distance) * maxDistance;
    }

    setKnobPosition({ x: deltaX, y: deltaY });
  }, [isDragging, maxDistance]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    setKnobPosition({ x: 0, y: 0 });
    // 通知父组件停止旋转
    onRotate(0, 0);
  }, [onRotate]);

  // 鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    }
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [isDragging, handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // 全局事件监听
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // 长按缩放
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
      zoomIntervalRef.current = null;
    }
  };

  // 清理
  useEffect(() => {
    return () => {
      if (zoomIntervalRef.current) {
        clearInterval(zoomIntervalRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* 缩放按钮 */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-full border-2 transition-all active:scale-95"
          onMouseDown={() => startZoom(-0.15)}
          onMouseUp={stopZoom}
          onMouseLeave={stopZoom}
          onTouchStart={(e) => { e.preventDefault(); startZoom(-0.15); }}
          onTouchEnd={stopZoom}
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-full border-2 transition-all active:scale-95"
          onMouseDown={() => startZoom(0.15)}
          onMouseUp={stopZoom}
          onMouseLeave={stopZoom}
          onTouchStart={(e) => { e.preventDefault(); startZoom(0.15); }}
          onTouchEnd={stopZoom}
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
      </div>

      {/* 虚拟摇杆 */}
      <div
        ref={joystickRef}
        className="relative select-none touch-none"
        style={{
          width: joystickRadius * 2,
          height: joystickRadius * 2,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* 底座 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
            boxShadow: 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff',
          }}
        />
        {/* 方向指示 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute top-2 text-[10px] text-muted-foreground/60 font-medium">↑</div>
          <div className="absolute bottom-2 text-[10px] text-muted-foreground/60 font-medium">↓</div>
          <div className="absolute left-2 text-[10px] text-muted-foreground/60 font-medium">←</div>
          <div className="absolute right-2 text-[10px] text-muted-foreground/60 font-medium">→</div>
        </div>
        {/* 摇杆球 */}
        <div
          className="absolute rounded-full cursor-grab active:cursor-grabbing"
          style={{
            width: knobRadius * 2,
            height: knobRadius * 2,
            left: `calc(50% - ${knobRadius}px + ${knobPosition.x}px)`,
            top: `calc(50% - ${knobRadius}px + ${knobPosition.y}px)`,
            background: isDragging 
              ? 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
              : 'linear-gradient(135deg, #5AC57A 0%, #4CAF50 100%)',
            boxShadow: isDragging 
              ? '0 6px 16px rgba(76, 175, 80, 0.5)' 
              : '0 3px 10px rgba(90, 197, 122, 0.4)',
            transition: isDragging ? 'none' : 'all 0.15s ease-out',
            transform: isDragging ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      </div>

      {/* 重置按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="h-11 w-11 rounded-full border-2 transition-all active:scale-95"
        onClick={onReset}
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
    </div>
  );
}
