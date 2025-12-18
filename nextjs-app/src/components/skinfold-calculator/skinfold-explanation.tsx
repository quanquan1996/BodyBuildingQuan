'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface SkinfoldExplanationProps {
  dict: Dictionary;
}

export function SkinfoldExplanation({ dict }: SkinfoldExplanationProps) {
  const t = dict.skinfoldCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔬</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Jackson-Pollock Formula */}
          <div>
            <h4 className="font-medium mb-2">{t.jacksonPollock.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {t.jacksonPollock.description}
            </p>
            <div className="p-3 rounded bg-muted/50 text-xs font-mono">
              <p>{t.jacksonPollock.formula}</p>
              <p className="mt-1 text-muted-foreground">{t.jacksonPollock.note}</p>
            </div>
          </div>

          {/* Siri Formula */}
          <div>
            <h4 className="font-medium mb-2">{t.siriFormula.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {t.siriFormula.description}
            </p>
            <div className="p-3 rounded bg-muted/50 text-xs font-mono">
              <p>{t.siriFormula.formula}</p>
            </div>
          </div>
        </div>

        {/* Accuracy Notes */}
        <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>⚠️</span> {t.accuracy.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {t.accuracy.points.map((point, index) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>

        {/* Comparison Table */}
        <div>
          <h4 className="font-medium mb-3">{t.comparison.title}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {t.comparison.headers.map((header, index) => (
                    <th key={index} className="text-left py-2 pr-4">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {t.comparison.methods.map((method, index) => (
                  <tr key={index} className={index < t.comparison.methods.length - 1 ? 'border-b' : ''}>
                    <td className={`py-2 pr-4 ${method.name.includes('Skinfold') || method.name.includes('皮褶') ? 'font-medium text-foreground' : ''}`}>
                      {method.name}
                    </td>
                    <td className="py-2 pr-4">{method.accuracy}</td>
                    <td className="py-2 pr-4">{method.cost}</td>
                    <td className="py-2">{method.convenience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
