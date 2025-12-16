import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Camera, Calculator, Ruler, Flame, Heart, Ratio, RefreshCw, Salad, Wheat, Activity } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: 'camera' | 'calculator' | 'ruler' | 'flame' | 'heart' | 'ratio' | 'refresh' | 'salad' | 'wheat' | 'activity';
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
};

export function FeatureGrid({ features, title }: FeatureGridProps) {
  return (
    <section className="py-4 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        {title && (
          <h2 className="text-lg font-bold tracking-tighter text-center mb-4 md:text-3xl md:mb-8">
            {title}
          </h2>
        )}
        {/* 移动端：紧凑网格布局 */}
        <div className="grid grid-cols-3 gap-2 sm:hidden">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Link key={feature.id} href={feature.href} className="group">
                <Card className="h-full p-2 transition-colors hover:bg-muted/80">
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {feature.title}
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        {/* 平板和桌面端：保持原有布局 */}
        <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Link key={feature.id} href={feature.href} className="group">
                <Card className="h-full transition-colors hover:bg-muted/80">
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
