'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type HighCarbDietOutput, type DayPlan } from '@/lib/utils/high-carb-diet';
import type { Locale, Dictionary } from '@/lib/i18n';

interface HighCarbDietResultProps {
  result: HighCarbDietOutput;
  inputData?: {
    weight: number;
    bodyFat?: number;
    activityLevel: string;
    age: number;
  };
  locale: Locale;
  dict: Dictionary;
}

const dayTypeColors = {
  training: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/30',
    icon: '🏋️',
  },
  rest: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/30',
    icon: '😴',
  },
  refeed: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    border: 'border-purple-500/30',
    icon: '🍕',
  },
};

function DayPlanCard({ plan, isZh }: { plan: DayPlan; isZh: boolean }) {
  const colors = dayTypeColors[plan.dayType];

  return (
    <div className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <span>{colors.icon}</span>
        <span className={`font-bold ${colors.text}`}>{plan.label}</span>
      </div>
      
      <div className={`text-2xl font-bold ${colors.text} mb-2`}>
        {plan.calories} <span className="text-sm font-normal">{isZh ? '千卡' : 'kcal'}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">{isZh ? '蛋白质' : 'Protein'}</div>
          <div className="font-bold">{plan.protein}g</div>
          <div className="text-xs text-muted-foreground">{plan.proteinPercent}%</div>
        </div>
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">{isZh ? '碳水' : 'Carbs'}</div>
          <div className="font-bold">{plan.carbs}g</div>
          <div className="text-xs text-muted-foreground">{plan.carbsPercent}%</div>
        </div>
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">{isZh ? '脂肪' : 'Fat'}</div>
          <div className="font-bold">{plan.fat}g</div>
          <div className="text-xs text-muted-foreground">{plan.fatPercent}%</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground">
        💡 {plan.description}
      </div>
    </div>
  );
}


export function HighCarbDietResult({ result, inputData, locale, dict }: HighCarbDietResultProps) {
  const {
    bmr,
    tdee,
    leanMass,
    dayPlans,
    weeklyAverage,
    weeklyDeficit,
    estimatedWeeklyLoss,
    weekSchedule,
  } = result;
  const t = dict.highCarbDietCalculator;
  const isZh = locale === 'zh';
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
          {leanMass ? (isZh ? 'Katch-McArdle 公式（基于体脂率）' : 'Katch-McArdle (body fat based)') : 'Mifflin-St Jeor'} · {isZh ? '高碳低脂策略' : 'High Carb Low Fat'}
        </div>

        {/* 基础数据 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">{isZh ? '基础代谢 (BMR)' : 'BMR'}</div>
            <div className="text-xl font-bold text-primary">{bmr}</div>
            <div className="text-xs text-muted-foreground">{calUnit}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">{isZh ? '每日消耗 (TDEE)' : 'TDEE'}</div>
            <div className="text-xl font-bold text-orange-500">{tdee}</div>
            <div className="text-xs text-muted-foreground">{calUnit}</div>
          </div>
          {leanMass && (
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{isZh ? '瘦体重' : 'Lean Mass'}</div>
              <div className="text-xl font-bold text-green-500">{leanMass}</div>
              <div className="text-xs text-muted-foreground">kg</div>
            </div>
          )}
          {!leanMass && (
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{isZh ? '周均热量' : 'Weekly Avg'}</div>
              <div className="text-xl font-bold text-purple-500">{weeklyAverage}</div>
              <div className="text-xs text-muted-foreground">{calUnit}</div>
            </div>
          )}
        </div>

        {/* 各日期类型方案 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '每日营养方案' : 'Daily Nutrition Plan'}</h4>
          <div className={`grid gap-3 ${dayPlans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {dayPlans.map((plan) => (
              <DayPlanCard key={plan.dayType} plan={plan} isZh={isZh} />
            ))}
          </div>
        </div>

        {/* 周计划 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '建议周计划' : 'Weekly Schedule'}</h4>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {weekSchedule.days.map(({ day, type }) => {
              const colors = dayTypeColors[type];
              return (
                <div key={day} className={`p-2 rounded ${colors.bg}`}>
                  <div className="font-medium">{day}</div>
                  <div className={colors.text}>{dayTypeColors[type].icon}</div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>🏋️ {isZh ? '训练' : 'Training'} ×{weekSchedule.trainingDays}</span>
            <span>😴 {isZh ? '休息' : 'Rest'} ×{weekSchedule.restDays}</span>
            {weekSchedule.refeedDays > 0 && <span>🍕 {isZh ? '再喂' : 'Refeed'} ×{weekSchedule.refeedDays}</span>}
          </div>
        </div>

        {/* 预估效果 */}
        <div className="p-4 bg-green-500/10 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground mb-1">{isZh ? '周均热量缺口' : 'Weekly Deficit'}</div>
              <div className="text-xl font-bold text-green-600">{weeklyDeficit} {calLabel}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">{isZh ? '预估每周减重' : 'Est. Weekly Loss'}</div>
              <div className="text-xl font-bold text-green-600">{estimatedWeeklyLoss} kg</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {isZh ? '* 基于 7700 千卡 ≈ 1kg 脂肪估算，实际效果因人而异' : '* Based on 7700 kcal ≈ 1kg fat, actual results may vary'}
          </p>
        </div>

        {/* 高碳低脂食物推荐 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '推荐食物来源' : 'Recommended Foods'}</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium mb-2">🍚 {isZh ? '高碳低脂主食' : 'High Carb Low Fat'}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {isZh ? (
                  <>
                    <li>• 白米饭、糙米</li>
                    <li>• 土豆、红薯</li>
                    <li>• 燕麦、全麦面包</li>
                    <li>• 香蕉、苹果</li>
                  </>
                ) : (
                  <>
                    <li>• White rice, brown rice</li>
                    <li>• Potato, sweet potato</li>
                    <li>• Oats, whole wheat bread</li>
                    <li>• Banana, apple</li>
                  </>
                )}
              </ul>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium mb-2">🥩 {isZh ? '优质蛋白' : 'Lean Protein'}</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                {isZh ? (
                  <>
                    <li>• 鸡胸肉、鱼肉</li>
                    <li>• 蛋白、虾仁</li>
                    <li>• 脱脂希腊酸奶</li>
                    <li>• 脱脂牛奶</li>
                  </>
                ) : (
                  <>
                    <li>• Chicken breast, fish</li>
                    <li>• Egg whites, shrimp</li>
                    <li>• Non-fat Greek yogurt</li>
                    <li>• Skim milk</li>
                  </>
                )}
              </ul>
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
                  {...toolLinks.fatLossDietToCarbCycling(dict, inputData.bodyFat, inputData.weight, inputData.activityLevel)}
                />
              )}
              <ToolLinkCard
                {...toolLinks.toMetabolicDamageTest(dict, inputData.weight, undefined, inputData.age, inputData.bodyFat)}
              />
              <ToolLinkCard {...toolLinks.bmrToHeartRate(dict, inputData.age)} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
