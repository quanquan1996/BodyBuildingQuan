import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n';

interface ScoringExplanationProps {
  dict: Dictionary;
}

export function ScoringExplanation({ dict }: ScoringExplanationProps) {
  const explanation = dict.poseComparator?.explanation;
  
  // 防御性检查
  if (!explanation?.aiDetection) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📐</span>
          {explanation.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Detection */}
        <section>
          <h3 className="font-semibold mb-2">🔬 {explanation.aiDetection.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation.aiDetection.description}
          </p>
        </section>

        {/* Scoring Methodology */}
        <section>
          <h3 className="font-semibold mb-2">📊 {explanation.angleComparison.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation.angleComparison.description}
          </p>
        </section>

        {/* Score Ratings */}
        <section>
          <h3 className="font-semibold mb-2">🎯 {explanation.scoringSystem.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {explanation.scoringSystem.description}
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
