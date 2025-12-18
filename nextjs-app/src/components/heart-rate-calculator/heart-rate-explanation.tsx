import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface HeartRateExplanationProps {
  dict: Dictionary;
}

const zoneColors: Record<string, string> = {
  gray: 'border-gray-400',
  blue: 'border-blue-400',
  green: 'border-green-500',
  orange: 'border-orange-500',
  red: 'border-red-500',
};

export function HeartRateExplanation({ dict }: HeartRateExplanationProps) {
  const t = dict.heartRateCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{t.intro}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">{t.zones.title}</h4>
          <div className="space-y-3">
            {t.zones.items.map((zone, index) => (
              <div key={index} className={`p-3 border-l-4 ${zoneColors[zone.color] || 'border-gray-400'} bg-muted/20 rounded-r-lg`}>
                <div className="font-medium">{zone.name} ({zone.range})</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {zone.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🔬</span> {t.formulas.standard.title}
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>{t.formulas.standard.maxHR}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">{t.formulas.standard.maxHRFormula}</p>
              <p><strong>{t.formulas.standard.targetHR}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">{t.formulas.standard.targetHRFormula}</p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚡</span> {t.formulas.karvonen.title}
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>{t.formulas.karvonen.hrr}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">{t.formulas.karvonen.hrrFormula}</p>
              <p><strong>{t.formulas.karvonen.targetHR}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">{t.formulas.karvonen.targetHRFormula}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span> {t.tips.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {t.tips.items.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
