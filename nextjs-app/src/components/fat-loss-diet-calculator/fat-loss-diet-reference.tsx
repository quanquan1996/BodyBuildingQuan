import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface FatLossDietReferenceProps {
  dict: Dictionary;
}

export function FatLossDietReference({ dict }: FatLossDietReferenceProps) {
  const t = dict.fatLossDietCalculator.reference;

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
          <h4 className="font-medium text-sm text-muted-foreground">{t.principle.title}</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>{t.principle.description}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.strategy.title}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>{t.strategy.initialCarb.label}</span>
              <span className="font-medium">{t.strategy.initialCarb.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>{t.strategy.weeklyReduction.label}</span>
              <span className="font-medium">{t.strategy.weeklyReduction.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>{t.strategy.minCarb.label}</span>
              <span className="font-medium">{t.strategy.minCarb.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>{t.strategy.protein.label}</span>
              <span className="font-medium">{t.strategy.protein.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>{t.strategy.minFat.label}</span>
              <span className="font-medium">{t.strategy.minFat.value}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.deficitStrategy.title}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>{t.deficitStrategy.week1.label}</span>
              <span className="font-medium text-green-600">{t.deficitStrategy.week1.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-500/10 rounded">
              <span>{t.deficitStrategy.weeklyIncrease.label}</span>
              <span className="font-medium text-yellow-600">{t.deficitStrategy.weeklyIncrease.value}</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>{t.deficitStrategy.maxDeficit.label}</span>
              <span className="font-medium text-orange-600">{t.deficitStrategy.maxDeficit.value}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="font-medium mb-1">{t.suitableFor.title}</p>
          <p>{t.suitableFor.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
