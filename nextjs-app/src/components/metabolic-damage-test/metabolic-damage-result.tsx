'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { 
  type MetabolicDamageOutput, 
  type MetabolicDamageInput,
  damageLevelInfo 
} from '@/lib/utils/metabolic-damage';

interface MetabolicDamageResultProps {
  result: MetabolicDamageOutput;
  inputData: MetabolicDamageInput;
}

export function MetabolicDamageResult({ result, inputData }: MetabolicDamageResultProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          检测结果
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的公式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          使用公式：{formula === 'katch' ? 'Katch-McArdle（基于瘦体重）' : 'Mifflin-St Jeor'}
          {leanMass && ` · 瘦体重: ${leanMass}kg`}
        </div>

        {/* 代谢受损等级 - 主要结果 */}
        <div className={`text-center p-6 rounded-lg ${colorMap[levelInfo.color]}`}>
          <div className="text-4xl mb-2">{levelInfo.emoji}</div>
          <div className="text-2xl font-bold mb-1">{levelInfo.label}</div>
          <div className="text-sm opacity-80">{levelInfo.description}</div>
          <div className="mt-3 text-3xl font-bold">{damageScore} 分</div>
          <div className="text-xs opacity-60">受损评分 (0-100)</div>
        </div>

        {/* 代谢数据对比 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">代谢数据分析</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">理论基础代谢</div>
              <div className="text-2xl font-bold text-primary">{theoreticalBmr}</div>
              <div className="text-xs text-muted-foreground">千卡/天</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">理论每日消耗</div>
              <div className="text-2xl font-bold text-blue-500">{theoreticalTdee}</div>
              <div className="text-xs text-muted-foreground">千卡/天</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">当前摄入热量</div>
              <div className="text-2xl font-bold text-orange-500">{inputData.currentCalories}</div>
              <div className="text-xs text-muted-foreground">千卡/天</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">估算实际代谢</div>
              <div className="text-2xl font-bold text-purple-500">{estimatedActualTdee}</div>
              <div className="text-xs text-muted-foreground">千卡/天</div>
            </div>
          </div>
        </div>

        {/* 代谢差距 */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">代谢差距</div>
              <div className="text-xs text-muted-foreground">理论消耗 vs 实际代谢</div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${metabolicGap > 300 ? 'text-red-500' : metabolicGap > 150 ? 'text-orange-500' : 'text-green-500'}`}>
                {metabolicGap > 0 ? '-' : '+'}{Math.abs(metabolicGap)} 千卡
              </div>
              <div className="text-xs text-muted-foreground">
                降低了 {metabolicGapPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* 恢复建议 */}
        {damageLevel !== 'normal' && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">🔄 反向节食恢复计划</h4>
            <div className="p-4 bg-green-500/10 rounded-lg space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-muted-foreground">建议恢复周期</div>
                  <div className="font-bold text-green-600">{recoveryWeeks} 周</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">目标热量</div>
                  <div className="font-bold text-green-600">{targetCalories} 千卡</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">每周增加</div>
                  <div className="font-bold text-green-600">+{weeklyIncrease} 千卡</div>
                </div>
              </div>
              
              {/* 反向节食时间表 */}
              <div className="mt-4">
                <div className="text-xs text-muted-foreground mb-2">热量递增计划</div>
                <div className="grid grid-cols-4 gap-2">
                  {reverseDietPlan.map(({ week, calories }) => (
                    <div key={week} className="text-center p-2 bg-white/50 rounded text-xs">
                      <div className="text-muted-foreground">第{week}周</div>
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
          <h4 className="font-medium text-sm text-yellow-700 mb-2">⚠️ 重要提示</h4>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• 此检测仅供参考，不能替代专业医疗诊断</li>
            <li>• 代谢适应是身体的正常保护机制，不必过度担心</li>
            <li>• 恢复代谢需要耐心，避免急于求成</li>
            <li>• 建议配合力量训练，增加肌肉量提升基础代谢</li>
          </ul>
        </div>

        {/* 工具联动 */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm text-muted-foreground">🔗 相关工具</h4>
          <div className="space-y-2">
            {inputData.bodyFatPercent && (
              <ToolLinkCard
                {...toolLinks.skinfoldToCarbCycling(
                  inputData.bodyFatPercent,
                  inputData.weightKg
                )}
              />
            )}
            <ToolLinkCard {...toolLinks.bmrToHeartRate(inputData.age)} />
            {!inputData.bodyFatPercent && (
              <ToolLinkCard {...toolLinks.needBodyFat()} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
