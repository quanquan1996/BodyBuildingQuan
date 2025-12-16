'use client';

import { getScoreRating } from '@/lib/utils/angle-calculator';

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const rating = getScoreRating(score);

  return (
    <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border">
      <p className="text-sm text-muted-foreground mb-2">造型评分</p>
      <div className="flex items-center justify-center gap-2">
        <span className={`text-5xl font-bold ${rating.color}`}>
          {Math.round(score)}
        </span>
        <div className="text-left">
          <span className="text-xl text-muted-foreground">分</span>
          <div className={`text-sm font-medium px-2 py-0.5 rounded ${rating.color} bg-current/10`}>
            {rating.text}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        {score >= 90 ? '姿态非常标准，继续保持！' :
         score >= 80 ? '姿态很好，细节可以再优化' :
         score >= 70 ? '姿态良好，注意关节角度' :
         score >= 60 ? '基本到位，多练习可以提升' :
         '需要多加练习，注意参考标准姿态'}
      </p>
    </div>
  );
}
