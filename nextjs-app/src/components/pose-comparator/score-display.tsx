'use client';

import { getScoreRating } from '@/lib/utils/angle-calculator';
import type { Dictionary } from '@/lib/i18n';

interface ScoreDisplayProps {
  score: number;
  dict: Dictionary;
}

export function ScoreDisplay({ score, dict }: ScoreDisplayProps) {
  const scoreRatings = dict.poseComparator?.scoreRatings;
  const scoring = dict.poseComparator?.scoring;
  
  // 防御性检查
  if (!scoreRatings || !scoring) {
    return null;
  }

  const rating = getScoreRating(score, scoreRatings);

  return (
    <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border">
      <p className="text-sm text-muted-foreground mb-2">{scoring.overall}</p>
      <div className="flex items-center justify-center gap-2">
        <span className={`text-5xl font-bold ${rating.color}`}>
          {Math.round(score)}
        </span>
        <div className="text-left">
          <div className={`text-sm font-medium px-2 py-0.5 rounded ${rating.color} bg-current/10`}>
            {rating.text}
          </div>
        </div>
      </div>
    </div>
  );
}
