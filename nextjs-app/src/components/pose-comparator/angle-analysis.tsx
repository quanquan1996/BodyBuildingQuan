'use client';

import { AngleResult, getAngleRating } from '@/lib/utils/angle-calculator';
import type { Dictionary } from '@/lib/i18n';

interface AngleAnalysisProps {
  angles: AngleResult[];
  dict: Dictionary;
}

export function AngleAnalysis({ angles, dict }: AngleAnalysisProps) {
  const explanation = dict.poseComparator?.explanation;
  const angleRatings = dict.poseComparator?.angleRatings;
  
  // 防御性检查
  if (!explanation?.angleComparison || !angleRatings) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <span className="text-primary">📊</span>
        {explanation.angleComparison.title}
      </h3>
      <div className="space-y-2">
        {angles.map((angle, index) => {
          const rating = getAngleRating(angle.difference, angleRatings);
          const isPositive = angle.difference > 0;

          return (
            <div
              key={index}
              className="p-3 bg-muted/50 rounded-lg border"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{angle.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${rating.color}`}>
                  {rating.text}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {angle.referenceAngle.toFixed(1)}°
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {angle.userAngle.toFixed(1)}°
                </span>
                <span className={isPositive ? 'text-orange-500' : 'text-blue-500'}>
                  {isPositive ? '↑' : '↓'}{isPositive ? '+' : ''}{angle.difference.toFixed(1)}°
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{angle.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
