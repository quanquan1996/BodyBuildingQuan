'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface HighCarbDietReferenceProps {
  dict: Dictionary;
}

export function HighCarbDietReference({ dict }: HighCarbDietReferenceProps) {
  const t = dict.highCarbDietCalculator.reference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What Is */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{t.whatIs.title}</h4>
          <p className="text-sm text-muted-foreground">{t.whatIs.description}</p>
        </div>

        {/* Science */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{t.science.title}</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">{t.science.tef.title}</div>
              <ul className="text-xs space-y-1">
                {t.science.tef.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">{t.science.leptin.title}</div>
              <p className="text-xs">{t.science.leptin.description}</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">{t.science.performance.title}</div>
              <p className="text-xs">{t.science.performance.description}</p>
            </div>
          </div>
        </div>

        {/* Day Types */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{t.dayTypes.title}</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="font-medium text-green-600 mb-1">{t.dayTypes.training.title}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {t.dayTypes.training.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="font-medium text-blue-600 mb-1">{t.dayTypes.rest.title}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {t.dayTypes.rest.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="font-medium text-purple-600 mb-1">{t.dayTypes.refeed.title}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {t.dayTypes.refeed.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Suitable For */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{t.suitableFor.title}</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {t.suitableFor.items.map((item, index) => (
              <div key={index} className="p-2 bg-green-500/10 rounded text-center">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Warnings */}
        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <div className="font-medium text-yellow-600 mb-2">{t.warnings.title}</div>
          <ul className="text-xs text-muted-foreground space-y-1">
            {t.warnings.items.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
