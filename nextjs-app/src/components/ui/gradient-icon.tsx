import { cn } from '@/lib/utils';
import { toolGradients, type ToolId } from '@/lib/config/theme';

interface GradientIconProps {
  toolId: ToolId;
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { container: 'w-12 h-12', icon: '[&>svg]:w-6 [&>svg]:h-6' },
  md: { container: 'w-14 h-14', icon: '[&>svg]:w-7 [&>svg]:h-7' },
  lg: { container: 'w-16 h-16', icon: '[&>svg]:w-8 [&>svg]:h-8' },
};

export function GradientIcon({ toolId, icon, size = 'md', className }: GradientIconProps) {
  const gradient = toolGradients[toolId];
  const sizeClasses = sizeMap[size];

  return (
    <div
      className={cn(
        'rounded-[20px] flex items-center justify-center text-white relative overflow-hidden',
        sizeClasses.container,
        sizeClasses.icon,
        className
      )}
      style={{
        background: `linear-gradient(${gradient.angle}deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
        boxShadow: `0 4px 12px ${gradient.from}40`,
      }}
    >
      {/* 光泽效果 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10">{icon}</div>
    </div>
  );
}

// 自定义渐变图标（不依赖 toolId）
interface CustomGradientIconProps {
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  angle?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CustomGradientIcon({
  icon,
  gradientFrom,
  gradientTo,
  angle = 135,
  size = 'md',
  className,
}: CustomGradientIconProps) {
  const sizeClasses = sizeMap[size];

  return (
    <div
      className={cn(
        'rounded-[20px] flex items-center justify-center text-white relative overflow-hidden',
        sizeClasses.container,
        sizeClasses.icon,
        className
      )}
      style={{
        background: `linear-gradient(${angle}deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        boxShadow: `0 4px 12px ${gradientFrom}40`,
      }}
    >
      {/* 光泽效果 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10">{icon}</div>
    </div>
  );
}
