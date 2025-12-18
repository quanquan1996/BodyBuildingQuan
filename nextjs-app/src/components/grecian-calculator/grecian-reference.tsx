import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GOLDEN_RATIO } from '@/lib/utils/grecian-ideal';
import type { Dictionary } from '@/lib/i18n/types';

interface GrecianReferenceProps {
  dict: Dictionary;
}

export function GrecianReference({ dict }: GrecianReferenceProps) {
  const t = dict.grecianCalculator.reference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{t.goldenRatio.title.replace('1.618', String(GOLDEN_RATIO))}</h4>
          <p className="text-sm text-muted-foreground">{t.goldenRatio.description}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t.steveReeves.title}</h4>
          <p className="text-sm text-muted-foreground mb-2">{t.steveReeves.description}</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            {t.steveReeves.standards.map((standard, index) => (
              <li key={index}>{standard}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">{t.measurementGuide.title}</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            {t.measurementGuide.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/10 p-3 rounded-lg">
          <h4 className="font-semibold mb-1 text-primary">{t.wristImportance.title}</h4>
          <p className="text-sm text-muted-foreground">{t.wristImportance.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
