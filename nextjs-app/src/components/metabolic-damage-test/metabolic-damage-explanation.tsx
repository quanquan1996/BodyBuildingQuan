'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Dictionary } from '@/lib/i18n/types';

interface MetabolicDamageExplanationProps {
  dict: Dictionary;
}

export function MetabolicDamageExplanation({ dict }: MetabolicDamageExplanationProps) {
  const t = dict.metabolicDamageTest.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">❓</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {t.faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.intro && <p className="mb-2">{item.intro}</p>}
                {item.points && (
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {item.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                )}
                {item.conclusion && <p className="mt-2">{item.conclusion}</p>}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
