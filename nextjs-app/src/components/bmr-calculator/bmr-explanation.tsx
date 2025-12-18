import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface BMRExplanationProps {
  dict: Dictionary;
}

export function BMRExplanation({ dict }: BMRExplanationProps) {
  const t = dict.bmrCalculator.explanation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong className="text-foreground">{t.whatIs}</strong>{' '}
            {t.whatIsContent}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🔬</span> {t.mifflinFormula.title}
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>{t.mifflinFormula.male}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">
                {t.mifflinFormula.maleFormula}
              </p>
              <p><strong>{t.mifflinFormula.female}</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">
                {t.mifflinFormula.femaleFormula}
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚡</span> {t.tdee.title}
            </h4>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>{t.tdee.description}</strong>
              </p>
              <ul className="space-y-1 text-xs">
                {t.tdee.levels.map((level, index) => (
                  <li key={index}>{level}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">{t.factors.title}</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.factors.items.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary">•</span>
                <div>
                  <strong>{item.name}</strong>：{item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span> {t.tips.title}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {t.tips.items.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
