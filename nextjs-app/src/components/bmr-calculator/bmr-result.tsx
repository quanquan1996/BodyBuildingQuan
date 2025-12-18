'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type BMROutput, type ActivityLevel } from '@/lib/utils/bmr';
import type { Locale, Dictionary } from '@/lib/i18n';

interface BMRResultProps {
  result: BMROutput;
  inputData?: {
    weight: number;
    bodyFat?: number;
    age?: number;
    activityLevel: ActivityLevel;
  };
  locale: Locale;
  dict: Dictionary;
}

export function BMRResult({ result, inputData, locale, dict }: BMRResultProps) {
  const t = dict.bmrCalculator;
  const isZh = locale === 'zh';
  const { bmr, tdee, formula, leanMass } = result;
  
  // 计算不同目标的热量建议
  const cuttingCalories = Math.round(tdee - 500);  // 减脂：减少500卡
  const bulkingCalories = Math.round(tdee + 300);  // 增肌：增加300卡

  const calUnit = isZh ? '千卡/天' : 'kcal/day';
  const calLabel = isZh ? '千卡' : 'kcal';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          {t.result.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的公式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          {isZh ? '使用公式：' : 'Formula: '}{formula === 'katch' ? (isZh ? 'Katch-McArdle（基于瘦体重）' : 'Katch-McArdle (lean mass based)') : 'Mifflin-St Jeor'}
        </div>

        {/* 主要结果 */}
        <div className={`grid gap-4 ${leanMass ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t.result.bmr}</div>
            <div className="text-3xl font-bold text-primary">{bmr}</div>
            <div className="text-sm text-muted-foreground">{calUnit}</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{t.result.tdee}</div>
            <div className="text-3xl font-bold text-orange-500">{tdee}</div>
            <div className="text-sm text-muted-foreground">{calUnit}</div>
          </div>
          {leanMass && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{isZh ? '瘦体重' : 'Lean Mass'}</div>
              <div className="text-3xl font-bold text-green-500">{leanMass}</div>
              <div className="text-sm text-muted-foreground">kg</div>
            </div>
          )}
        </div>

        {/* 热量建议 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '热量摄入建议' : 'Calorie Recommendations'}</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
              <div>
                <div className="font-medium text-green-600">{isZh ? '减脂目标' : 'Fat Loss'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '每日减少 500 千卡' : '-500 kcal/day'}</div>
              </div>
              <div className="text-xl font-bold text-green-600">{cuttingCalories} {calLabel}</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
              <div>
                <div className="font-medium text-blue-600">{isZh ? '维持体重' : 'Maintain'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '保持当前热量' : 'Keep current intake'}</div>
              </div>
              <div className="text-xl font-bold text-blue-600">{tdee} {calLabel}</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
              <div>
                <div className="font-medium text-orange-600">{isZh ? '增肌目标' : 'Muscle Gain'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '每日增加 300 千卡' : '+300 kcal/day'}</div>
              </div>
              <div className="text-xl font-bold text-orange-600">{bulkingCalories} {calLabel}</div>
            </div>
          </div>
        </div>

        {/* 宏量营养素建议 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '宏量营养素参考（维持体重）' : 'Macros Reference (Maintenance)'}</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">{t.result.protein} (30%)</div>
              <div className="font-bold">{Math.round(tdee * 0.3 / 4)}g</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">{isZh ? '碳水' : 'Carbs'} (40%)</div>
              <div className="font-bold">{Math.round(tdee * 0.4 / 4)}g</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">{isZh ? '脂肪' : 'Fat'} (30%)</div>
              <div className="font-bold">{Math.round(tdee * 0.3 / 9)}g</div>
            </div>
          </div>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">{dict.common.toolLinks.exploreMore}</h4>
            <div className="space-y-2">
              {inputData.bodyFat && (
                <ToolLinkCard
                  {...toolLinks.bmrToCarbCycling(
                    dict,
                    inputData.bodyFat,
                    inputData.weight,
                    inputData.activityLevel
                  )}
                />
              )}
              <ToolLinkCard
                {...toolLinks.toMetabolicDamageTest(
                  dict,
                  inputData.weight,
                  undefined,
                  inputData.age,
                  inputData.bodyFat
                )}
              />
              {inputData.age && (
                <ToolLinkCard {...toolLinks.bmrToHeartRate(dict, inputData.age)} />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
