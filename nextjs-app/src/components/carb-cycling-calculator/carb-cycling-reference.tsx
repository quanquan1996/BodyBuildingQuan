import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface CarbCyclingReferenceProps {
  dict: Dictionary;
}

export function CarbCyclingReference({ dict }: CarbCyclingReferenceProps) {
  const t = dict.carbCyclingCalculator.reference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Simple Plan */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.simplePlan.title}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>{t.simplePlan.highCarb}</span>
              <span className="font-medium">{t.simplePlan.highCarbDays}</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>{t.simplePlan.lowCarb}</span>
              <span className="font-medium">{t.simplePlan.lowCarbDays}</span>
            </div>
          </div>
        </div>

        {/* Advanced Plan */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.advancedPlan.title}</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>{t.advancedPlan.highCarb}</span>
              <span className="font-medium">{t.advancedPlan.highCarbDays}</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-500/10 rounded">
              <span>{t.advancedPlan.mediumCarb}</span>
              <span className="font-medium">{t.advancedPlan.mediumCarbDays}</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>{t.advancedPlan.lowCarb}</span>
              <span className="font-medium">{t.advancedPlan.lowCarbDays}</span>
            </div>
          </div>
        </div>

        {/* Training Tips */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{t.trainingTips.title}</h4>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-green-600 mb-1">{t.trainingTips.highCarb.title}</div>
              <p className="text-muted-foreground">{t.trainingTips.highCarb.description}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-blue-600 mb-1">{t.trainingTips.mediumCarb.title}</div>
              <p className="text-muted-foreground">{t.trainingTips.mediumCarb.description}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-orange-600 mb-1">{t.trainingTips.lowCarb.title}</div>
              <p className="text-muted-foreground">{t.trainingTips.lowCarb.description}</p>
            </div>
          </div>
        </div>

        {/* Execution Tips */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-lg space-y-2">
          <p className="font-medium mb-2">{t.executionTips.title}</p>
          <ul className="space-y-1 list-disc list-inside">
            {t.executionTips.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
