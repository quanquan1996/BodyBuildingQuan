import { GradientIcon } from '@/components/ui/gradient-icon';
import { type ToolId } from '@/lib/config/theme';
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
  Bone
} from 'lucide-react';

interface ToolHeroProps {
  toolId: ToolId;
  title: string;
  description: string;
}

const iconMap: Record<ToolId, React.ReactNode> = {
  'ffmi-calculator': <Calculator className="w-8 h-8" />,
  'skinfold-calculator': <Ruler className="w-8 h-8" />,
  'bmr-calculator': <Flame className="w-8 h-8" />,
  'heart-rate-calculator': <Heart className="w-8 h-8" />,
  'pose-comparator': <Camera className="w-8 h-8" />,
  'grecian-calculator': <Ratio className="w-8 h-8" />,
  'carb-cycling-calculator': <RefreshCw className="w-8 h-8" />,
  'fat-loss-diet-calculator': <Salad className="w-8 h-8" />,
  'high-carb-diet-calculator': <Wheat className="w-8 h-8" />,
  'metabolic-damage-test': <Activity className="w-8 h-8" />,
  'muscle-anatomy': <Bone className="w-8 h-8" />,
};

export function ToolHero({ toolId, title, description }: ToolHeroProps) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <GradientIcon 
        toolId={toolId} 
        icon={iconMap[toolId]} 
        size="lg" 
      />
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-normal" style={{ color: '#333333' }}>
          {title}
        </h1>
        <p className="text-sm md:text-base mt-1" style={{ color: '#666666' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// 简化版本，居中显示
export function ToolHeroCenter({ toolId, title, description }: ToolHeroProps) {
  return (
    <div className="text-center mb-8 md:mb-10">
      <div className="flex justify-center mb-4">
        <GradientIcon 
          toolId={toolId} 
          icon={iconMap[toolId]} 
          size="lg" 
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-normal mb-2" style={{ color: '#333333' }}>
        {title}
      </h1>
      <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: '#666666' }}>
        {description}
      </p>
    </div>
  );
}
