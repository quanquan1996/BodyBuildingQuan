'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle, X } from 'lucide-react';

interface DataItem {
  label: string;
  value: string | number;
  unit?: string;
  helpText?: string;
  bgColor?: string;
  valueColor?: string;
}

interface DataCardProps {
  items: DataItem[];
  columns?: 1 | 2;
  className?: string;
}

export function DataCard({ items, columns = 2, className }: DataCardProps) {
  const [activeHelp, setActiveHelp] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid gap-3',
        columns === 2 ? 'grid-cols-2' : 'grid-cols-1',
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative rounded-xl p-4"
          style={{
            backgroundColor: item.bgColor || '#F9FAFB',
          }}
        >
          {/* 标签和帮助图标 */}
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            {item.helpText && (
              <button
                type="button"
                onClick={() => setActiveHelp(activeHelp === index ? null : index)}
                className="help-icon"
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 数值和单位 */}
          <div className="flex items-baseline">
            <span
              className="text-2xl font-bold tracking-tight"
              style={{ color: item.valueColor || '#1F2937' }}
            >
              {item.value}
            </span>
            {item.unit && (
              <span className="text-sm text-muted-foreground ml-1">
                {item.unit}
              </span>
            )}
          </div>

          {/* 帮助提示弹窗 */}
          {activeHelp === index && item.helpText && (
            <div className="absolute z-10 top-full left-0 right-0 mt-2 p-3 bg-card rounded-lg shadow-lg border text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => setActiveHelp(null)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3 h-3" />
              </button>
              {item.helpText}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 单个数据项组件
interface DataItemDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  helpText?: string;
  bgColor?: string;
  valueColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DataItemDisplay({
  label,
  value,
  unit,
  helpText,
  bgColor = '#F9FAFB',
  valueColor = '#1F2937',
  size = 'md',
  className,
}: DataItemDisplayProps) {
  const [showHelp, setShowHelp] = useState(false);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div
      className={cn('relative rounded-xl p-4', className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex items-center gap-1 mb-2">
        <span className="text-xs text-muted-foreground">{label}</span>
        {helpText && (
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="help-icon"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-baseline">
        <span
          className={cn('font-bold tracking-tight', sizeClasses[size])}
          style={{ color: valueColor }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground ml-1">{unit}</span>
        )}
      </div>

      {showHelp && helpText && (
        <div className="absolute z-10 top-full left-0 right-0 mt-2 p-3 bg-card rounded-lg shadow-lg border text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
          {helpText}
        </div>
      )}
    </div>
  );
}
