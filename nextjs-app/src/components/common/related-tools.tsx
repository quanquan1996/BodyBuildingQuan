import Link from 'next/link';
import { 
  Calculator, 
  Ruler, 
  Flame, 
  Heart, 
  Camera, 
  Ratio, 
  RefreshCw, 
  Salad, 
  Wheat, 
  Activity,
  ChevronRight
} from 'lucide-react';
import { toolGradients, toolConfigs, type ToolId } from '@/lib/config/theme';

interface RelatedToolsProps {
  currentToolId: ToolId;
  relatedToolIds?: ToolId[];
  title?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5" />,
  ruler: <Ruler className="w-5 h-5" />,
  flame: <Flame className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  ratio: <Ratio className="w-5 h-5" />,
  refresh: <RefreshCw className="w-5 h-5" />,
  salad: <Salad className="w-5 h-5" />,
  wheat: <Wheat className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
};

const toolRoutes: Record<ToolId, string> = {
  'ffmi-calculator': '/tools/ffmi-calculator',
  'skinfold-calculator': '/tools/skinfold-calculator',
  'bmr-calculator': '/tools/bmr-calculator',
  'heart-rate-calculator': '/tools/heart-rate-calculator',
  'pose-comparator': '/tools/pose-comparator',
  'grecian-calculator': '/tools/grecian-calculator',
  'carb-cycling-calculator': '/tools/carb-cycling-calculator',
  'fat-loss-diet-calculator': '/tools/fat-loss-diet-calculator',
  'high-carb-diet-calculator': '/tools/high-carb-diet-calculator',
  'metabolic-damage-test': '/tools/metabolic-damage-test',
};

// 默认相关工具推荐
const defaultRelatedTools: Record<ToolId, ToolId[]> = {
  'ffmi-calculator': ['skinfold-calculator', 'bmr-calculator', 'grecian-calculator'],
  'skinfold-calculator': ['ffmi-calculator', 'bmr-calculator', 'carb-cycling-calculator'],
  'bmr-calculator': ['carb-cycling-calculator', 'fat-loss-diet-calculator', 'heart-rate-calculator'],
  'heart-rate-calculator': ['bmr-calculator', 'fat-loss-diet-calculator'],
  'pose-comparator': ['grecian-calculator', 'ffmi-calculator'],
  'grecian-calculator': ['pose-comparator', 'ffmi-calculator', 'skinfold-calculator'],
  'carb-cycling-calculator': ['fat-loss-diet-calculator', 'high-carb-diet-calculator', 'bmr-calculator'],
  'fat-loss-diet-calculator': ['carb-cycling-calculator', 'high-carb-diet-calculator', 'bmr-calculator'],
  'high-carb-diet-calculator': ['fat-loss-diet-calculator', 'carb-cycling-calculator', 'bmr-calculator'],
  'metabolic-damage-test': ['bmr-calculator', 'fat-loss-diet-calculator', 'carb-cycling-calculator'],
};

export function RelatedTools({ 
  currentToolId, 
  relatedToolIds,
  title = '相关工具推荐'
}: RelatedToolsProps) {
  const toolIds = relatedToolIds || defaultRelatedTools[currentToolId] || [];
  
  if (toolIds.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <Link 
          href="/" 
          className="text-sm text-primary flex items-center gap-1 hover:underline"
        >
          查看全部
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* 横向滚动 */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {toolIds.map((toolId) => {
          const config = toolConfigs[toolId];
          const gradient = toolGradients[toolId];
          const icon = iconMap[config.icon];

          return (
            <Link
              key={toolId}
              href={toolRoutes[toolId]}
              className="flex-shrink-0 group"
            >
              <div 
                className="flex items-center gap-3 bg-card rounded-2xl p-4 pr-6 transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {icon}
                </div>
                <span className="text-sm font-medium whitespace-nowrap group-hover:text-primary transition-colors">
                  {config.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
