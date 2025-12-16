'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type HighCarbDietOutput, type DayPlan } from '@/lib/utils/high-carb-diet';

interface HighCarbDietResultProps {
  result: HighCarbDietOutput;
  inputData?: {
    weight: number;
    bodyFat?: number;
    activityLevel: string;
    age: number;
  };
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
        💡 {plan.description}
      </div>
    </div>
  );
}


export function HighCarbDietResult({ result, inputData }: HighCarbDietResultProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          高碳减脂方案
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的公式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          {leanMass ? 'Katch-McArdle 公式（基于体脂率）' : 'Mifflin-St Jeor 公式'} · 高碳低脂策略
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
          {leanMass && (
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">瘦体重</div>
              <div className="text-xl font-bold text-green-500">{leanMass}</div>
              <div className="text-xs text-muted-foreground">kg</div>
            </div>
          )}
          {!leanMass && (
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">周均热量</div>
              <div className="text-xl font-bold text-purple-500">{weeklyAverage}</div>
              <div className="text-xs text-muted-foreground">千卡/天</div>
            </div>
          )}
        </div>

        {/* 各日期类型方案 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">每日营养方案</h4>
          <div className={`grid gap-3 ${dayPlans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
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
            <span>🏋️ 训练 ×{weekSchedule.trainingDays}</span>
            <span>😴 休息 ×{weekSchedule.restDays}</span>
            {weekSchedule.refeedDays > 0 && <span>🍕 再喂 ×{weekSchedule.refeedDays}</span>}
          </div>
        </div>

        {/* 预估效果 */}
        <div className="p-4 bg-green-500/10 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground mb-1">周均热量缺口</div>
              <div className="text-xl font-bold text-green-600">{weeklyDeficit} 千卡</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">预估每周减重</div>
              <div className="text-xl font-bold text-green-600">{estimatedWeeklyLoss} kg</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            * 基于 7700 千卡 ≈ 1kg 脂肪估算，实际效果因人而异
          </p>
        </div>

        {/* 高碳低脂食物推荐 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">推荐食物来源</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium mb-2">🍚 高碳低脂主食</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 白米饭、糙米</li>
                <li>• 土豆、红薯</li>
                <li>• 燕麦、全麦面包</li>
                <li>• 香蕉、苹果</li>
              </ul>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium mb-2">🥩 优质蛋白</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 鸡胸肉、鱼肉</li>
                <li>• 蛋白、虾仁</li>
                <li>• 脱脂希腊酸奶</li>
                <li>• 脱脂牛奶</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">🔗 相关工具</h4>
            <div className="space-y-2">
              {inputData.bodyFat && (
                <ToolLinkCard
                  {...toolLinks.fatLossDietToCarbCycling(inputData.bodyFat, inputData.weight, inputData.activityLevel)}
                />
              )}
              <ToolLinkCard {...toolLinks.bmrToHeartRate(inputData.age)} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
