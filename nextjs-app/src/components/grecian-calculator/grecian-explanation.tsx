import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Dictionary } from '@/lib/i18n/types';

interface GrecianExplanationProps {
  dict: Dictionary;
}

export function GrecianExplanation({ dict }: GrecianExplanationProps) {
  const t = dict.grecianCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is">
            <AccordionTrigger>{t.faq.whatIs.question}</AccordionTrigger>
            <AccordionContent>
              {t.faq.whatIs.answer.map((paragraph, index) => (
                <p key={index} className={`text-muted-foreground ${index > 0 ? 'mt-2' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="golden-ratio">
            <AccordionTrigger>{t.faq.goldenRatio.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {t.faq.goldenRatio.answer}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                {t.faq.goldenRatio.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="wrist-method">
            <AccordionTrigger>{t.faq.wristMethod.question}</AccordionTrigger>
            <AccordionContent>
              {t.faq.wristMethod.answer.map((paragraph, index) => (
                <p key={index} className={`text-muted-foreground ${index > 0 ? 'mt-2' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="symmetry">
            <AccordionTrigger>{t.faq.symmetry.question}</AccordionTrigger>
            <AccordionContent>
              {t.faq.symmetry.answer.map((paragraph, index) => (
                <p key={index} className={`text-muted-foreground ${index > 0 ? 'mt-2' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitations">
            <AccordionTrigger>{t.faq.limitations.question}</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                {t.faq.limitations.intro}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                {t.faq.limitations.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
