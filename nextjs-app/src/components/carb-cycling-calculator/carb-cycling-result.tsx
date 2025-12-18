'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type CarbCyclingOutput, type DayPlan } from '@/lib/utils/carb-cycling';
import type { Locale, Dictionary } from '@/lib/i18n';

interface CarbCyclingResultProps {
  result: CarbCyclingOutput;
  inputData?: {
    weight: number;
    bodyFat: number;
    activityLevel: string;
  };
  locale: Locale;
  dict: Dictionary;
}

const dayTypeColors = {
  high: {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-500/30',
    icon: '🟢',
  },
  medium: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-500/30',
    icon: '🔵',
  },
  low: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    border: 'border-orange-500/30',
    icon: '🟠',
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
        💡 {plan.trainingAdvice}
      </div>
    </div>
  );
}


export function CarbCyclingResult({ result, inputData, locale, dict }: CarbCyclingResultProps) {
  const { bmr, tdee, leanMass, mode, dayPlans, weeklyAverage, weekSchedule } = result;
  const t = dict.carbCyclingCalculator;
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
        {/* 使用的模式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          {mode === 'simple' ? (isZh ? '简易版（高碳/低碳）' : 'Simple (High/Low Carb)') : (isZh ? '进阶版（高碳/中碳/低碳）' : 'Advanced (High/Med/Low Carb)')} · Katch-McArdle
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
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">{isZh ? '瘦体重' : 'Lean Mass'}</div>
            <div className="text-xl font-bold text-green-500">{leanMass}</div>
            <div className="text-xs text-muted-foreground">kg</div>
          </div>
        </div>

        {/* 各日期类型方案 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '每日营养方案' : 'Daily Nutrition Plan'}</h4>
          <div className={`grid gap-3 ${mode === 'advanced' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
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
            <span>🟢 {isZh ? '高碳' : 'High'} ×{weekSchedule.highDays}</span>
            {weekSchedule.mediumDays > 0 && <span>🔵 {isZh ? '中碳' : 'Med'} ×{weekSchedule.mediumDays}</span>}
            <span>🟠 {isZh ? '低碳' : 'Low'} ×{weekSchedule.lowDays}</span>
          </div>
        </div>

        {/* 周平均热量 */}
        <div className="p-4 bg-purple-500/10 rounded-lg text-center">
          <div className="text-sm text-muted-foreground mb-1">{isZh ? '周平均每日热量' : 'Weekly Avg Daily Calories'}</div>
          <div className="text-2xl font-bold text-purple-600">{weeklyAverage} {calLabel}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {isZh 
              ? `相比 TDEE ${weeklyAverage < tdee ? '减少' : '增加'} ${Math.abs(weeklyAverage - tdee)} 千卡/天`
              : `${weeklyAverage < tdee ? '-' : '+'}${Math.abs(weeklyAverage - tdee)} kcal/day vs TDEE`
            }
          </div>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">{dict.common.toolLinks.otherFatLossPlans}</h4>
            <div className="space-y-2">
              <ToolLinkCard
                {...toolLinks.carbCyclingToFatLossDiet(dict, inputData.bodyFat, inputData.weight)}
              />
              <ToolLinkCard
                {...toolLinks.toMetabolicDamageTest(dict, inputData.weight, undefined, undefined, inputData.bodyFat)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
