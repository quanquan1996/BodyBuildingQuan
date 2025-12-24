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
  Bone,
  ChevronRight
} from 'lucide-react';
import { toolGradients, toolConfigs, type ToolId } from '@/lib/config/theme';

interface RelatedToolsProps {
  currentToolId: ToolId;
  relatedToolIds?: ToolId[];
  title?: string;
  locale: string;
  dict: any; // 使用 any 避免循环依赖，实际使用时会传入 Dictionary
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
  bone: <Bone className="w-5 h-5" />,
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
  'muscle-anatomy': '/tools/muscle-anatomy',
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
  'muscle-anatomy': ['ffmi-calculator', 'grecian-calculator', 'pose-comparator'],
};

// 工具标题映射函数
function getToolTitle(toolId: ToolId, dict: any): string {
  const titleMap: Record<ToolId, string> = {
    'ffmi-calculator': dict.ffmiCalculator.title,
    'skinfold-calculator': dict.skinfoldCalculator.title,
    'bmr-calculator': dict.bmrCalculator.title,
    'heart-rate-calculator': dict.heartRateCalculator.title,
    'pose-comparator': dict.poseComparator.title,
    'grecian-calculator': dict.grecianCalculator.title,
    'carb-cycling-calculator': dict.carbCyclingCalculator.title,
    'fat-loss-diet-calculator': dict.fatLossDietCalculator.title,
    'high-carb-diet-calculator': dict.highCarbDietCalculator.title,
    'metabolic-damage-test': dict.metabolicDamageTest.title,
    'muscle-anatomy': dict.muscleAnatomy.title,
  };
  return titleMap[toolId];
}

export function RelatedTools({ 
  currentToolId, 
  relatedToolIds,
  title,
  locale,
  dict
}: RelatedToolsProps) {
  const toolIds = relatedToolIds || defaultRelatedTools[currentToolId] || [];
  const displayTitle = title || dict.common.relatedTools;
  
  if (toolIds.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">{displayTitle}</h3>
        <Link 
          href={`/${locale}`} 
          className="text-sm text-primary flex items-center gap-1 hover:underline"
        >
          {dict.common.viewAll}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* 横向滚动 */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {toolIds.map((toolId) => {
          const config = toolConfigs[toolId];
          const gradient = toolGradients[toolId];
          const icon = iconMap[config.icon];
          const toolRoute = `/${locale}${toolRoutes[toolId]}`;
          const toolTitle = getToolTitle(toolId, dict);

          return (
            <Link
              key={toolId}
              href={toolRoute}
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
                  {toolTitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
