'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface HighCarbDietExplanationProps {
  dict: Dictionary;
}

export function HighCarbDietExplanation({ dict }: HighCarbDietExplanationProps) {
  const t = dict.highCarbDietCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">❓</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {t.faq.map((item, index) => (
            <div key={index}>
              <h4 className="font-medium mb-2">{item.question}</h4>
              <p className="text-sm text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
