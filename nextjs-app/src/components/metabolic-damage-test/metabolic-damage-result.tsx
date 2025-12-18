'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { 
  type MetabolicDamageOutput, 
  type MetabolicDamageInput,
  damageLevelInfo 
} from '@/lib/utils/metabolic-damage';
import type { Locale, Dictionary } from '@/lib/i18n';

interface MetabolicDamageResultProps {
  result: MetabolicDamageOutput;
  inputData: MetabolicDamageInput;
  locale: Locale;
  dict: Dictionary;
}

export function MetabolicDamageResult({ result, inputData, locale, dict }: MetabolicDamageResultProps) {
  const t = dict.metabolicDamageTest;
  const isZh = locale === 'zh';
  const calLabel = isZh ? '千卡' : 'kcal';
  const { 
    theoreticalBmr, 
    theoreticalTdee, 
    estimatedActualTdee,
    metabolicGap,
    metabolicGapPercent,
    damageLevel, 
    damageScore,
    recoveryWeeks,
    targetCalories,
    weeklyIncrease,
    formula,
    leanMass,
  } = result;

  const levelInfo = damageLevelInfo[damageLevel];
  
  // 颜色映射
  const colorMap: Record<string, string> = {
    green: 'text-green-600 bg-green-500/10',
    yellow: 'text-yellow-600 bg-yellow-500/10',
    orange: 'text-orange-600 bg-orange-500/10',
    red: 'text-red-600 bg-red-500/10',
  };

  // 生成反向节食计划
  const reverseDietPlan = [];
  let currentCal = inputData.currentCalories;
  for (let week = 1; week <= Math.min(recoveryWeeks, 8); week++) {
    currentCal += weeklyIncrease;
    if (currentCal > targetCalories) currentCal = targetCalories;
    reverseDietPlan.push({ week, calories: Math.round(currentCal) });
  }

  // Get localized damage level label
  const damageLevelLabels: Record<string, string> = {
    normal: t.result.levels.none,
    mild: t.result.levels.mild,
    moderate: t.result.levels.moderate,
    severe: t.result.levels.severe,
  };

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
          {isZh ? '使用公式：' : 'Formula: '}{formula === 'katch' ? (isZh ? 'Katch-McArdle（基于瘦体重）' : 'Katch-McArdle (lean mass)') : 'Mifflin-St Jeor'}
          {leanMass && ` · ${isZh ? '瘦体重' : 'Lean Mass'}: ${leanMass}kg`}
        </div>

        {/* 代谢受损等级 - 主要结果 */}
        <div className={`text-center p-6 rounded-lg ${colorMap[levelInfo.color]}`}>
          <div className="text-4xl mb-2">{levelInfo.emoji}</div>
          <div className="text-2xl font-bold mb-1">{damageLevelLabels[damageLevel]}</div>
          <div className="text-sm opacity-80">{levelInfo.description}</div>
          <div className="mt-3 text-3xl font-bold">{damageScore} {isZh ? '分' : 'pts'}</div>
          <div className="text-xs opacity-60">{isZh ? '受损评分 (0-100)' : 'Damage Score (0-100)'}</div>
        </div>

        {/* 代谢数据对比 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{isZh ? '代谢数据分析' : 'Metabolic Analysis'}</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{t.result.expectedBMR}</div>
              <div className="text-2xl font-bold text-primary">{theoreticalBmr}</div>
              <div className="text-xs text-muted-foreground">{isZh ? '千卡/天' : 'kcal/day'}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{isZh ? '理论每日消耗' : 'Expected TDEE'}</div>
              <div className="text-2xl font-bold text-blue-500">{theoreticalTdee}</div>
              <div className="text-xs text-muted-foreground">{isZh ? '千卡/天' : 'kcal/day'}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{t.result.actualIntake}</div>
              <div className="text-2xl font-bold text-orange-500">{inputData.currentCalories}</div>
              <div className="text-xs text-muted-foreground">{isZh ? '千卡/天' : 'kcal/day'}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">{isZh ? '估算实际代谢' : 'Est. Actual TDEE'}</div>
              <div className="text-2xl font-bold text-purple-500">{estimatedActualTdee}</div>
              <div className="text-xs text-muted-foreground">{isZh ? '千卡/天' : 'kcal/day'}</div>
            </div>
          </div>
        </div>

        {/* 代谢差距 */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">{isZh ? '代谢差距' : 'Metabolic Gap'}</div>
              <div className="text-xs text-muted-foreground">{isZh ? '理论消耗 vs 实际代谢' : 'Expected vs Actual'}</div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${metabolicGap > 300 ? 'text-red-500' : metabolicGap > 150 ? 'text-orange-500' : 'text-green-500'}`}>
                {metabolicGap > 0 ? '-' : '+'}{Math.abs(metabolicGap)} {calLabel}
              </div>
              <div className="text-xs text-muted-foreground">
                {isZh ? `降低了 ${metabolicGapPercent}%` : `Reduced by ${metabolicGapPercent}%`}
              </div>
            </div>
          </div>
        </div>

        {/* 恢复建议 */}
        {damageLevel !== 'normal' && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">🔄 {isZh ? '反向节食恢复计划' : 'Reverse Diet Recovery Plan'}</h4>
            <div className="p-4 bg-green-500/10 rounded-lg space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">{isZh ? '建议恢复周期' : 'Recovery Period'}</div>
                  <div className="font-bold text-green-600">{recoveryWeeks} {isZh ? '周' : 'weeks'}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{isZh ? '目标热量' : 'Target Calories'}</div>
                  <div className="font-bold text-green-600">{targetCalories} {calLabel}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{isZh ? '每周增加' : 'Weekly Increase'}</div>
                  <div className="font-bold text-green-600">+{weeklyIncrease} {calLabel}</div>
                </div>
              </div>
              
              {/* 反向节食时间表 */}
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-2">{isZh ? '热量递增计划' : 'Calorie Progression'}</div>
                <div className="grid grid-cols-4 gap-2">
                  {reverseDietPlan.map(({ week, calories }) => (
                    <div key={week} className="text-center p-2 bg-white/50 rounded text-xs">
                      <div className="text-muted-foreground">{isZh ? `第${week}周` : `Week ${week}`}</div>
                      <div className="font-medium">{calories}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 注意事项 */}
        <div className="p-4 bg-yellow-500/10 rounded-lg">
          <h4 className="font-medium text-sm text-yellow-700 mb-2">⚠️ {isZh ? '重要提示' : 'Important Notes'}</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            {isZh ? (
              <>
                <li>• 此检测仅供参考，不能替代专业医疗诊断</li>
                <li>• 代谢适应是身体的正常保护机制，不必过度担心</li>
                <li>• 恢复代谢需要耐心，避免急于求成</li>
                <li>• 建议配合力量训练，增加肌肉量提升基础代谢</li>
              </>
            ) : (
              <>
                <li>• This test is for reference only, not a medical diagnosis</li>
                <li>• Metabolic adaptation is a normal protective mechanism</li>
                <li>• Recovery takes patience, avoid rushing</li>
                <li>• Combine with strength training to boost metabolism</li>
              </>
            )}
          </ul>
        </div>

        {/* 工具联动 */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm text-muted-foreground">{dict.common.toolLinks.exploreMore}</h4>
          <div className="space-y-2">
            {inputData.bodyFatPercent && (
              <ToolLinkCard
                {...toolLinks.skinfoldToCarbCycling(
                  dict,
                  inputData.bodyFatPercent,
                  inputData.weightKg
                )}
              />
            )}
            <ToolLinkCard {...toolLinks.bmrToHeartRate(dict, inputData.age)} />
            {!inputData.bodyFatPercent && (
              <ToolLinkCard {...toolLinks.needBodyFat(dict)} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
