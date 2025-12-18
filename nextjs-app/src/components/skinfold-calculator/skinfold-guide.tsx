'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n/types';

interface SkinfoldGuideProps {
  dict: Dictionary;
}

export function SkinfoldGuide({ dict }: SkinfoldGuideProps) {
  const guide = dict.skinfoldCalculator.guide;
  
  const sites = [
    { emoji: '🫁', key: 'chest', data: guide.measurementSites.chest },
    { emoji: '📍', key: 'midaxillary', data: guide.measurementSites.midaxillary },
    { emoji: '💪', key: 'triceps', data: guide.measurementSites.triceps },
    { emoji: '🔙', key: 'subscapular', data: guide.measurementSites.subscapular },
    { emoji: '🎯', key: 'abdominal', data: guide.measurementSites.abdominal },
    { emoji: '📐', key: 'suprailiac', data: guide.measurementSites.suprailiac },
    { emoji: '🦵', key: 'thigh', data: guide.measurementSites.thigh },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          {guide.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 测量技巧 */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>💡</span> {guide.tipsTitle}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {guide.tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>

        {/* 各部位详解 */}
        <div className="space-y-4">
          <h4 className="font-medium">{guide.sitesTitle}</h4>
          
          {sites.map((site) => (
            <div key={site.key} className="p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{site.emoji}</span>
                <span className="font-medium">{site.data.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{site.data.description}</p>
              <p className="text-xs text-primary mt-1">💡 {site.data.tips}</p>
            </div>
          ))}
        </div>

        {/* 简易模式说明 */}
        <div className="space-y-3">
          <h4 className="font-medium">{guide.modesTitle}</h4>
          
          <div className="p-3 rounded-lg border">
            <h5 className="font-medium text-sm mb-1">{guide.simpleMode.title}</h5>
            <p className="text-sm text-muted-foreground">
              {guide.simpleMode.description}
            </p>
            <div className="mt-2 text-xs">
              <p>{guide.simpleMode.male}</p>
              <p>{guide.simpleMode.female}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border">
            <h5 className="font-medium text-sm mb-1">{guide.preciseMode.title}</h5>
            <p className="text-sm text-muted-foreground">
              {guide.preciseMode.description}
            </p>
            <p className="mt-2 text-xs">
              {guide.preciseMode.sites}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
