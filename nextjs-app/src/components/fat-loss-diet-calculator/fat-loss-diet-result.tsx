'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type FatLossDietOutput } from '@/lib/utils/fat-loss-diet';
import { type ActivityLevel } from '@/lib/utils/bmr';
import type { Locale, Dictionary } from '@/lib/i18n';

interface FatLossDietResultProps {
  result: FatLossDietOutput;
  inputData?: {
    weight: number;
    bodyFat?: number;
    activityLevel: ActivityLevel;
  };
  locale: Locale;
  dict: Dictionary;
}

export function FatLossDietResult({ result, inputData, locale, dict }: FatLossDietResultProps) {
  const t = dict.fatLossDietCalculator;
  const isZh = locale === 'zh';
  const calUnit = isZh ? '千卡/天' : 'kcal/day';
  const calLabel = isZh ? '千卡' : 'kcal';
  const {
    bmr,
    tdee,
    formula,
    leanMass,
    weekPlans,
    totalDeficit,
    estimatedFatLoss,
    initialCarbs,
    finalCarbs,
  } = result;

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
          {isZh ? '使用公式：' : 'Formula: '}{formula === 'katch' ? (isZh ? 'Katch-McArdle（基于瘦体重）' : 'Katch-McArdle (lean mass)') : (isZh ? 'Mifflin-St Jeor（普通版）' : 'Mifflin-St Jeor')}
        </div>

        {/* 基础数据 */}
        <div className={`grid gap-4 ${leanMass ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{isZh ? '基础代谢 (BMR)' : 'BMR'}</div>
            <div className="text-2xl font-bold text-primary">{bmr}</div>
            <div className="text-xs text-muted-foreground">{calUnit}</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">{isZh ? '每日消耗 (TDEE)' : 'TDEE'}</div>
            <div className="text-2xl font-bold text-orange-500">{tdee}</div>
            <div className="text-xs text-muted-foreground">{calUnit}</div>
          </div>
          {leanMass && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">{isZh ? '瘦体重' : 'Lean Mass'}</div>
              <div className="text-2xl font-bold text-green-500">{leanMass}</div>
              <div className="text-xs text-muted-foreground">kg</div>
            </div>
          )}
        </div>

        {/* 预估效果 */}
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <h4 className="font-medium text-green-600 mb-2">📈 {isZh ? '预估减脂效果' : 'Estimated Results'}</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">{isZh ? '总热量缺口：' : 'Total Deficit: '}</span>
              <span className="font-bold">{totalDeficit.toLocaleString()} {calLabel}</span>
            </div>
            <div>
              <span className="text-muted-foreground">{isZh ? '预估减脂：' : 'Est. Fat Loss: '}</span>
              <span className="font-bold text-green-600">{estimatedFatLoss} kg</span>
            </div>
            <div>
              <span className="text-muted-foreground">{isZh ? '碳水变化：' : 'Carb Change: '}</span>
              <span className="font-bold">{initialCarbs}g → {finalCarbs}g</span>
            </div>
            <div>
              <span className="text-muted-foreground">{isZh ? '减少碳水：' : 'Carb Reduction: '}</span>
              <span className="font-bold text-orange-500">{initialCarbs - finalCarbs}g</span>
            </div>
          </div>
        </div>

        {/* 每周计划 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">📅 {isZh ? '每周饮食计划' : 'Weekly Diet Plan'}</h4>
          <div className="space-y-2">
            {weekPlans.map((plan) => (
              <div
                key={plan.week}
                className="p-3 bg-muted/30 rounded-lg border border-muted"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{isZh ? `第 ${plan.week} 周` : `Week ${plan.week}`}</span>
                  <span className="text-sm text-orange-500">-{plan.deficit} {isZh ? '千卡/天' : 'kcal/day'}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div className="p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{t.result.calories}</div>
                    <div className="font-bold">{plan.calories}</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{t.result.protein}</div>
                    <div className="font-bold text-blue-500">{plan.protein}g</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{t.result.carbs}</div>
                    <div className="font-bold text-yellow-600">{plan.carbs}g</div>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <div className="text-xs text-muted-foreground">{t.result.fat}</div>
                    <div className="font-bold text-red-500">{plan.fat}g</div>
                  </div>
                </div>
                {plan.carbReduction > 0 && (
                  <div className="text-xs text-muted-foreground mt-2 text-right">
                    {isZh ? `碳水较第1周减少 ${plan.carbReduction}g` : `Carbs reduced by ${plan.carbReduction}g from Week 1`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 饮食建议 */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span> {isZh ? '执行建议' : 'Tips'}
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {isZh ? (
              <>
                <li>• 蛋白质优先，每餐均匀分配</li>
                <li>• 碳水集中在训练前后摄入</li>
                <li>• 选择复合碳水（糙米、燕麦、红薯）</li>
                <li>• 脂肪选择健康来源（坚果、橄榄油、鱼油）</li>
                <li>• 每周称重1-2次，根据效果微调</li>
              </>
            ) : (
              <>
                <li>• Prioritize protein, distribute evenly across meals</li>
                <li>• Time carbs around workouts</li>
                <li>• Choose complex carbs (brown rice, oats, sweet potato)</li>
                <li>• Select healthy fats (nuts, olive oil, fish oil)</li>
                <li>• Weigh yourself 1-2x per week, adjust as needed</li>
              </>
            )}
          </ul>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">{dict.common.toolLinks.otherFatLossPlans}</h4>
            <div className="space-y-2">
              {inputData.bodyFat && (
                <ToolLinkCard
                  {...toolLinks.fatLossDietToCarbCycling(
                    dict,
                    inputData.bodyFat,
                    inputData.weight,
                    inputData.activityLevel
                  )}
                />
              )}
              <ToolLinkCard
                {...toolLinks.toMetabolicDamageTest(dict, inputData.weight, undefined, undefined, inputData.bodyFat)}
              />
              {!inputData.bodyFat && <ToolLinkCard {...toolLinks.needBodyFat(dict)} />}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
