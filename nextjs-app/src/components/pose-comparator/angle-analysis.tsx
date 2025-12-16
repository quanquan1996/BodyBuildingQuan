'use client';

import { AngleResult, getAngleRating } from '@/lib/utils/angle-calculator';

interface AngleAnalysisProps {
  angles: AngleResult[];
}

export function AngleAnalysis({ angles }: AngleAnalysisProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <span className="text-primary">📊</span>
        关键角度对比分析
      </h3>
      <p className="text-sm text-muted-foreground">
        以下是健美造型中关键身体角度的对比结果
      </p>
      <div className="space-y-2">
        {angles.map((angle, index) => {
          const rating = getAngleRating(angle.difference);
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
                  参考: {angle.referenceAngle.toFixed(1)}°
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  你的: {angle.userAngle.toFixed(1)}°
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
