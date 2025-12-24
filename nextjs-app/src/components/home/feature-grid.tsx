// 服务端组件 - 移除 'use client' 以减少 JS bundle
import Link from 'next/link';
import {
  Camera,
  Calculator,
  Ruler,
  Flame,
  Heart,
  Ratio,
  RefreshCw,
  Salad,
  Wheat,
  Activity,
  Bone,
} from 'lucide-react';
import { toolGradients, type ToolId } from '@/lib/config/theme';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon:
    | 'camera'
    | 'calculator'
    | 'ruler'
    | 'flame'
    | 'heart'
    | 'ratio'
    | 'refresh'
    | 'salad'
    | 'wheat'
    | 'activity'
    | 'bone';
}

interface FeatureGridProps {
  features: FeatureItem[];
  title?: string;
}

const iconMap = {
  camera: Camera,
  calculator: Calculator,
  ruler: Ruler,
  flame: Flame,
  heart: Heart,
  ratio: Ratio,
  refresh: RefreshCw,
  salad: Salad,
  wheat: Wheat,
  activity: Activity,
  bone: Bone,
};

// 图标类型到工具ID映射
const iconToToolId: Record<string, ToolId> = {
  calculator: 'ffmi-calculator',
  ruler: 'skinfold-calculator',
  flame: 'bmr-calculator',
  heart: 'heart-rate-calculator',
  camera: 'pose-comparator',
  ratio: 'grecian-calculator',
  refresh: 'carb-cycling-calculator',
  salad: 'fat-loss-diet-calculator',
  wheat: 'high-carb-diet-calculator',
  activity: 'metabolic-damage-test',
  bone: 'muscle-anatomy',
};

export function FeatureGrid({ features, title }: FeatureGridProps) {
  return (
    <section className="pt-10 pb-6 md:pt-16 md:pb-16">
      <div className="container px-4 md:px-6">
        {title && (
          <h2 className="text-lg font-bold tracking-tighter text-center mb-6 md:text-2xl md:mb-10 text-foreground">
            {title}
          </h2>
        )}

        {/* 移动端：4列网格布局，3排 */}
        <div className="grid grid-cols-4 gap-x-3 gap-y-4 sm:hidden">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            const toolId = iconToToolId[feature.icon];
            const gradient = toolGradients[toolId];
            // AI功能标识
            const isAIFeature = toolId === 'pose-comparator' || toolId === 'metabolic-damage-test';

            return (
              <Link key={feature.id} href={feature.href} className="group">
                <div className="flex flex-col items-center relative">
                  {/* AI角标 - 带白色描边 */}
                  {isAIFeature && (
                    <div 
                      className="absolute -top-1.5 -right-0.5 z-10 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 0 0 2px white, 0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      AI
                    </div>
                  )}
                  {/* 渐变图标 - 增加质感 */}
                  <div
                    className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white mb-2 transition-all group-hover:scale-105 group-hover:shadow-lg relative overflow-hidden"
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
                    <Icon className="h-7 w-7 relative z-10" strokeWidth={1.5} />
                  </div>
                  {/* 标题 */}
                  <span className="text-[11px] font-medium text-center leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 平板和桌面端：网格布局 */}
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            const toolId = iconToToolId[feature.icon];
            const gradient = toolGradients[toolId];
            const isAIFeature = toolId === 'pose-comparator' || toolId === 'metabolic-damage-test';

            return (
              <Link key={feature.id} href={feature.href} className="group">
                <div
                  className="h-full bg-card rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative"
                  style={{
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* AI角标 - 带白色描边 */}
                  {isAIFeature && (
                    <div 
                      className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                      style={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 0 0 2px white',
                      }}
                    >
                      AI
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    {/* 渐变图标 - 增加质感 */}
                    <div
                      className="w-12 h-12 rounded-[16px] flex items-center justify-center text-white flex-shrink-0 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(${gradient.angle}deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                        boxShadow: `0 4px 12px ${gradient.from}50`,
                      }}
                    >
                      {/* 光泽效果 */}
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                        }}
                      />
                      <Icon className="h-6 w-6 relative z-10" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors mb-1 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-xs line-clamp-2" style={{ color: '#666666' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
