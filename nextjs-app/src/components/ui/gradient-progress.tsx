import { cn } from '@/lib/utils';
import { toolGradients, type ToolId } from '@/lib/config/theme';

interface GradientProgressProps {
  value: number; // 0-100
  gradientFrom: string;
  gradientTo: string;
  angle?: number;
  showLabel?: boolean;
  label?: string;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

const heightMap = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function GradientProgress({
  value,
  gradientFrom,
  gradientTo,
  angle = 90,
  showLabel = false,
  label,
  height = 'md',
  className,
}: GradientProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
          {showLabel && (
            <span className="text-xs font-medium text-foreground">
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden bg-muted',
          heightMap[height]
        )}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedValue}%`,
            background: `linear-gradient(${angle}deg, ${gradientFrom}, ${gradientTo})`,
          }}
        />
      </div>
    </div>
  );
}

// 使用工具ID的渐变进度条
interface ToolGradientProgressProps {
  value: number;
  toolId: ToolId;
  showLabel?: boolean;
  label?: string;
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ToolGradientProgress({
  value,
  toolId,
  showLabel = false,
  label,
  height = 'md',
  className,
}: ToolGradientProgressProps) {
  const gradient = toolGradients[toolId];

  return (
    <GradientProgress
      value={value}
      gradientFrom={gradient.from}
      gradientTo={gradient.to}
      angle={90}
      showLabel={showLabel}
      label={label}
      height={height}
      className={className}
    />
  );
}

// 状态徽章
interface StatusBadgeProps {
  status: 'excellent' | 'good' | 'average' | 'poor';
  label: string;
  className?: string;
}

const statusColors = {
  excellent: { bg: '#E8F5E9', text: '#2E7D32' },
  good: { bg: '#E3F2FD', text: '#1565C0' },
  average: { bg: '#FFF8E1', text: '#F57F17' },
  poor: { bg: '#FFEBEE', text: '#C62828' },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const colors = statusColors[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        className
      )}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {label}
    </span>
  );
}
