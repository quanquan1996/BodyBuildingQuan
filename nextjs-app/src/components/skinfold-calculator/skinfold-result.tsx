'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type SkinfoldOutput, type BodyFatCategory } from '@/lib/utils/skinfold';
import type { Locale, Dictionary } from '@/lib/i18n';

interface SkinfoldResultProps {
  result: SkinfoldOutput;
  weight: number;
  height?: number;
  locale: Locale;
  dict: Dictionary;
}

const categoryColors: Record<BodyFatCategory, string> = {
  essential: 'text-yellow-600',
  athlete: 'text-green-600',
  fitness: 'text-blue-600',
  average: 'text-orange-500',
  obese: 'text-red-500',
};

const categoryBgColors: Record<BodyFatCategory, string> = {
  essential: 'bg-yellow-100 border-yellow-300',
  athlete: 'bg-green-100 border-green-300',
  fitness: 'bg-blue-100 border-blue-300',
  average: 'bg-orange-100 border-orange-300',
  obese: 'bg-red-100 border-red-300',
};

export function SkinfoldResult({ result, weight, height = 175, locale, dict }: SkinfoldResultProps) {
  const t = dict.skinfoldCalculator;
  const isZh = locale === 'zh';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {t.result.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 主要结果 */}
        <div className={`p-6 rounded-xl border-2 ${categoryBgColors[result.category]} text-center`}>
          <p className="text-sm text-muted-foreground mb-1">{t.result.bodyFat}</p>
          <p className={`text-5xl font-bold ${categoryColors[result.category]}`}>
            {result.bodyFatPercent}%
          </p>
          <p className={`mt-2 font-medium ${categoryColors[result.category]}`}>
            {dict.skinfoldCalculator.categoryLabels[result.category]}
          </p>
        </div>

        {/* 详细数据 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">{t.result.fatMass}</p>
            <p className="text-2xl font-bold text-foreground">{result.fatMass} kg</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">{t.result.leanMass}</p>
            <p className="text-2xl font-bold text-foreground">{result.leanMass} kg</p>
          </div>
        </div>

        {/* 体密度 */}
        <div className="p-4 rounded-lg border text-center">
          <p className="text-sm text-muted-foreground">{isZh ? '体密度' : 'Body Density'}</p>
          <p className="text-xl font-semibold">{result.bodyDensity} g/cm³</p>
          <p className="text-xs text-muted-foreground mt-1">
            {isZh ? '使用 Jackson-Pollock 公式计算' : 'Calculated using Jackson-Pollock formula'}
          </p>
        </div>

        {/* 身体成分条形图 */}
        <div className="space-y-2">
          <p className="text-sm font-medium">{isZh ? '身体成分比例' : 'Body Composition'}</p>
          <div className="h-6 rounded-full overflow-hidden flex">
            <div 
              className="bg-orange-400 flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${result.bodyFatPercent}%` }}
            >
              {result.bodyFatPercent > 10 && `${result.bodyFatPercent}%`}
            </div>
            <div 
              className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${100 - result.bodyFatPercent}%` }}
            >
              {100 - result.bodyFatPercent > 10 && `${(100 - result.bodyFatPercent).toFixed(1)}%`}
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-orange-400"></span>
              {isZh ? '脂肪' : 'Fat'}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              {t.result.leanMass}
            </span>
          </div>
        </div>

        {/* 工具联动 */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm text-muted-foreground">{dict.common.toolLinks.exploreMore}</h4>
          <div className="space-y-2">
            <ToolLinkCard {...toolLinks.skinfoldToFfmi(dict, result.bodyFatPercent, weight, height)} />
            <ToolLinkCard {...toolLinks.skinfoldToBmr(dict, result.bodyFatPercent, weight)} />
            <ToolLinkCard {...toolLinks.skinfoldToCarbCycling(dict, result.bodyFatPercent, weight)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
