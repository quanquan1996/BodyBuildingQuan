import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface BMRReferenceProps {
  dict: Dictionary;
}

export function BMRReference({ dict }: BMRReferenceProps) {
  const t = dict.bmrCalculator.reference;
  const ageKeys = ['young', 'middle', 'senior'] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.maleTitle}</h4>
          <div className="space-y-2 text-sm">
            {ageKeys.map((key) => (
              <div key={key} className="flex justify-between p-2 bg-muted/30 rounded">
                <span>{t.ageRanges[key]}</span>
                <span className="font-medium">{t.maleValues[key]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.femaleTitle}</h4>
          <div className="space-y-2 text-sm">
            {ageKeys.map((key) => (
              <div key={key} className="flex justify-between p-2 bg-muted/30 rounded">
                <span>{t.ageRanges[key]}</span>
                <span className="font-medium">{t.femaleValues[key]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="font-medium mb-1">{t.tip.title}</p>
          <p>{t.tip.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
