'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type BMROutput, type ActivityLevel } from '@/lib/utils/bmr';

interface BMRResultProps {
  result: BMROutput;
  inputData?: {
    weight: number;
    bodyFat?: number;
    age?: number;
    activityLevel: ActivityLevel;
  };
}

export function BMRResult({ result, inputData }: BMRResultProps) {
  const { bmr, tdee, formula, leanMass } = result;
  
  // 计算不同目标的热量建议
  const cuttingCalories = Math.round(tdee - 500);  // 减脂：减少500卡
  const bulkingCalories = Math.round(tdee + 300);  // 增肌：增加300卡

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          计算结果
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的公式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          使用公式：{formula === 'katch' ? 'Katch-McArdle（基于瘦体重）' : 'Mifflin-St Jeor'}
        </div>

        {/* 主要结果 */}
        <div className={`grid gap-4 ${leanMass ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">基础代谢率 (BMR)</div>
            <div className="text-3xl font-bold text-primary">{bmr}</div>
            <div className="text-sm text-muted-foreground">千卡/天</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">每日总消耗 (TDEE)</div>
            <div className="text-3xl font-bold text-orange-500">{tdee}</div>
            <div className="text-sm text-muted-foreground">千卡/天</div>
          </div>
          {leanMass && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">瘦体重</div>
              <div className="text-3xl font-bold text-green-500">{leanMass}</div>
              <div className="text-sm text-muted-foreground">kg</div>
            </div>
          )}
        </div>

        {/* 热量建议 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">热量摄入建议</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
              <div>
                <div className="font-medium text-green-600">减脂目标</div>
                <div className="text-xs text-muted-foreground">每日减少 500 千卡</div>
              </div>
              <div className="text-xl font-bold text-green-600">{cuttingCalories} 千卡</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
              <div>
                <div className="font-medium text-blue-600">维持体重</div>
                <div className="text-xs text-muted-foreground">保持当前热量</div>
              </div>
              <div className="text-xl font-bold text-blue-600">{tdee} 千卡</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
              <div>
                <div className="font-medium text-orange-600">增肌目标</div>
                <div className="text-xs text-muted-foreground">每日增加 300 千卡</div>
              </div>
              <div className="text-xl font-bold text-orange-600">{bulkingCalories} 千卡</div>
            </div>
          </div>
        </div>

        {/* 宏量营养素建议 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">宏量营养素参考（维持体重）</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">蛋白质 (30%)</div>
              <div className="font-bold">{Math.round(tdee * 0.3 / 4)}g</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">碳水 (40%)</div>
              <div className="font-bold">{Math.round(tdee * 0.4 / 4)}g</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">脂肪 (30%)</div>
              <div className="font-bold">{Math.round(tdee * 0.3 / 9)}g</div>
            </div>
          </div>
        </div>

        {/* 工具联动 */}
        {inputData && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">🔗 继续探索</h4>
            <div className="space-y-2">
              {inputData.bodyFat && (
                <ToolLinkCard
                  {...toolLinks.bmrToCarbCycling(
                    inputData.bodyFat,
                    inputData.weight,
                    inputData.activityLevel
                  )}
                />
              )}
              {inputData.age && (
                <ToolLinkCard {...toolLinks.bmrToHeartRate(inputData.age)} />
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
