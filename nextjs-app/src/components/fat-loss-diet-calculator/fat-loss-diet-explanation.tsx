import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface FatLossDietExplanationProps {
  dict: Dictionary;
}

export function FatLossDietExplanation({ dict }: FatLossDietExplanationProps) {
  const t = dict.fatLossDietCalculator.explanation;

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
          <p>{t.intro}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>✅</span> {t.advantages.title}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {t.advantages.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚠️</span> {t.warnings.title}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {t.warnings.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">{t.reasons.title}</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.reasons.items.map((item, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary">{item.number}</span>
                <div>
                  <strong>{item.title}</strong>：{item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>🍽️</span> {t.foodSuggestions.title}
          </h4>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            {t.foodSuggestions.categories.map((category, index) => (
              <div key={index}>
                <p className="font-medium text-foreground mb-1">{category.name}</p>
                <p>{category.foods}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
