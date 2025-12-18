import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface CarbCyclingExplanationProps {
  dict: Dictionary;
}

export function CarbCyclingExplanation({ dict }: CarbCyclingExplanationProps) {
  const t = dict.carbCyclingCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What is Carb Cycling */}
        <div className="space-y-2">
          <h4 className="font-medium">{t.whatIs.title}</h4>
          <p className="text-sm text-muted-foreground">
            {t.whatIs.content}
          </p>
        </div>

        {/* Katch-McArdle Formula */}
        <div className="space-y-2">
          <h4 className="font-medium">{t.formula.title}</h4>
          <p className="text-sm text-muted-foreground">
            {t.formula.description}
          </p>
          <div className="p-3 bg-muted/30 rounded-lg font-mono text-sm">
            <p>{t.formula.bmr}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.formula.leanMass}</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h4 className="font-medium">{t.benefits.title}</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            {t.benefits.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Suitable For */}
        <div className="space-y-2">
          <h4 className="font-medium">{t.suitableFor.title}</h4>
          <p className="text-sm text-muted-foreground">
            {t.suitableFor.content}
          </p>
        </div>

        {/* Warnings */}
        <div className="p-3 bg-yellow-500/10 rounded-lg">
          <p className="font-medium text-yellow-600 mb-2">⚠️ {t.warnings.title}</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            {t.warnings.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
