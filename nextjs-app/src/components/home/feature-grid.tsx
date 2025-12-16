import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Calculator, Ruler } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: 'camera' | 'calculator' | 'ruler';
}

interface FeatureGridProps {
  features: FeatureItem[];
  title?: string;
}

const iconMap = {
  camera: Camera,
  calculator: Calculator,
  ruler: Ruler,
};

export function FeatureGrid({ features, title }: FeatureGridProps) {
  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        {title && (
          <h2 className="text-2xl font-bold tracking-tighter text-center mb-8 md:text-3xl">
            {title}
          </h2>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Link key={feature.id} href={feature.href} className="group">
                <Card className="h-full transition-colors hover:bg-muted/80">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
