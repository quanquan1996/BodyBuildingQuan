'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface SkinfoldReferenceProps {
  dict: Dictionary;
}

export function SkinfoldReference({ dict }: SkinfoldReferenceProps) {
  const t = dict.skinfoldCalculator.reference;

  const categoryColors: Record<string, string> = {
    essential: 'bg-yellow-400',
    athletic: 'bg-green-400',
    fitness: 'bg-blue-400',
    average: 'bg-orange-400',
    obese: 'bg-red-400',
  };

  const categories = ['essential', 'athletic', 'fitness', 'average', 'obese'] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Male Standards */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>👨</span> {t.maleTitle}
          </h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <ReferenceRow
                key={category}
                label={t.categories[category]}
                range={t.maleRanges[category]}
                color={categoryColors[category]}
              />
            ))}
          </div>
        </div>

        {/* Female Standards */}
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>👩</span> {t.femaleTitle}
          </h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <ReferenceRow
                key={category}
                label={t.categories[category]}
                range={t.femaleRanges[category]}
                color={categoryColors[category]}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{t.source}</p>
      </CardContent>
    </Card>
  );
}

function ReferenceRow({ label, range, color }: { label: string; range: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-3 h-3 rounded ${color}`}></span>
      <span className="flex-1">{label}</span>
      <span className="text-muted-foreground">{range}</span>
    </div>
  );
}
