import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  iconColor?: string;
  bgColor?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  title,
  icon,
  iconColor = '#4CAF50',
  bgColor,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  // 如果没有提供 bgColor，使用 iconColor 的 10% 透明度
  const titleBgColor = bgColor || `${iconColor}15`;

  return (
    <div
      className={cn(
        'bg-card rounded-2xl p-5',
        className
      )}
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* 左上角胶囊标题 */}
      <div className="mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{
            backgroundColor: titleBgColor,
            color: iconColor,
          }}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {title}
        </span>
      </div>

      {/* 内容区域 */}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

// 简化版本，不带标题
interface SimpleCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SimpleCard({ children, className }: SimpleCardProps) {
  return (
    <div
      className={cn('bg-card rounded-2xl p-5', className)}
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      }}
    >
      {children}
    </div>
  );
}
