import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface FFMIExplanationProps {
  dict: Dictionary;
}

export function FFMIExplanation({ dict }: FFMIExplanationProps) {
  const t = dict.ffmiCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📖</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-semibold mb-2">{t.whatIs}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.whatIsContent}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">{t.advantages}</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            {t.advantagesList.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">{t.howToImprove}</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            {t.improvementList.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">{t.vsBmi}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.vsBmiContent}
          </p>
        </section>

        <section className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📐 {t.formula}</h3>
          <div className="text-sm font-mono bg-background rounded p-3 space-y-1">
            {t.formulaContent.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
