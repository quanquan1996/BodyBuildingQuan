'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type CarbCyclingOutput, type DayPlan } from '@/lib/utils/carb-cycling';

interface CarbCyclingResultProps {
  result: CarbCyclingOutput;
  inputData?: {
    weight: number;
    bodyFat: number;
    activityLevel: string;
  };
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

function DayPlanCard({ plan }: { plan: DayPlan }) {
  const colors = dayTypeColors[plan.dayType];

  return (
    <div className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-2 mb-3">
        <span>{colors.icon}</span>
        <span className={`font-bold ${colors.text}`}>{plan.label}</span>
      </div>
      
      <div className={`text-2xl font-bold ${colors.text} mb-2`}>
        {plan.calories} <span className="text-sm font-normal">千卡</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">蛋白质</div>
          <div className="font-bold">{plan.protein}g</div>
          <div className="text-xs text-muted-foreground">{plan.proteinPercent}%</div>
        </div>
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">碳水</div>
          <div className="font-bold">{plan.carbs}g</div>
          <div className="text-xs text-muted-foreground">{plan.carbsPercent}%</div>
        </div>
        <div className="p-2 bg-white/50 rounded">
          <div className="text-muted-foreground text-xs">脂肪</div>
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


export function CarbCyclingResult({ result, inputData }: CarbCyclingResultProps) {
  const { bmr, tdee, leanMass, mode, dayPlans, weeklyAverage, weekSchedule } = result;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          碳循环方案
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的模式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          {mode === 'simple' ? '简易版（高碳/低碳）' : '进阶版（高碳/中碳/低碳）'} · Katch-McArdle 公式
        </div>

        {/* 基础数据 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">基础代谢 (BMR)</div>
            <div className="text-xl font-bold text-primary">{bmr}</div>
            <div className="text-xs text-muted-foreground">千卡/天</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">每日消耗 (TDEE)</div>
            <div className="text-xl font-bold text-orange-500">{tdee}</div>
            <div className="text-xs text-muted-foreground">千卡/天</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">瘦体重</div>
            <div className="text-xl font-bold text-green-500">{leanMass}</div>
            <div className="text-xs text-muted-foreground">kg</div>
          </div>
        </div>

        {/* 各日期类型方案 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">每日营养方案</h4>
          <div className={`grid gap-3 ${mode === 'advanced' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {dayPlans.map((plan) => (
              <DayPlanCard key={plan.dayType} plan={plan} />
            ))}
          </div>
        </div>

        {/* 周计划 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">建议周计划</h4>
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
            <span>🟢 高碳 ×{weekSchedule.highDays}</span>
            {weekSchedule.mediumDays > 0 && <span>🔵 中碳 ×{weekSchedule.mediumDays}</span>}
            <span>🟠 低碳 ×{weekSchedule.lowDays}</span>
          </div>
        </div>

        {/* 周平均热量 */}
        <div className="p-4 bg-purple-500/10 rounded-lg text-center">
          <div className="text-sm text-muted-foreground mb-1">周平均每日热量</div>
          <div className="text-2xl font-bold text-purple-600">{weeklyAverage} 千卡</div>
          <div className="text-xs text-muted-foreground mt-1">
            相比 TDEE {weeklyAverage < tdee ? '减少' : '增加'} {Math.abs(weeklyAverage - tdee)} 千卡/天
          </div>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">🔗 其他减脂方案</h4>
            <div className="space-y-2">
              <ToolLinkCard
                {...toolLinks.carbCyclingToFatLossDiet(inputData.bodyFat, inputData.weight)}
              />
              <ToolLinkCard
                {...toolLinks.toMetabolicDamageTest(inputData.weight, undefined, undefined, inputData.bodyFat)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
