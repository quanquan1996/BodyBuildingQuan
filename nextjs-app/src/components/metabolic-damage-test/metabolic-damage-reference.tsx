'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface MetabolicDamageReferenceProps {
  dict: Dictionary;
}

export function MetabolicDamageReference({ dict }: MetabolicDamageReferenceProps) {
  const t = dict.metabolicDamageTest.reference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What Is */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{t.whatIs.title}</h4>
          <p className="text-sm text-muted-foreground">{t.whatIs.description}</p>
        </div>

        {/* Symptoms */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{t.symptoms.title}</h4>
          <div className="grid grid-cols-2 gap-2">
            {t.symptoms.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-sm">
                <span>{item.emoji}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{t.levels.title}</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <div className="font-medium text-green-600 text-sm">{t.levels.normal.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.levels.normal.description}</div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <div className="font-medium text-yellow-600 text-sm">{t.levels.mild.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.levels.mild.description}</div>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <div className="font-medium text-orange-600 text-sm">{t.levels.moderate.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.levels.moderate.description}</div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <div className="font-medium text-red-600 text-sm">{t.levels.severe.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.levels.severe.description}</div>
            </div>
          </div>
        </div>

        {/* Factors */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{t.factors.title}</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {t.factors.items.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Recovery */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">{t.recovery.title}</h4>
          <div className="space-y-2 text-sm">
            {t.recovery.strategies.map((strategy, index) => (
              <div key={index} className="p-3 bg-muted/30 rounded-lg">
                <div className="font-medium">{strategy.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{strategy.description}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
