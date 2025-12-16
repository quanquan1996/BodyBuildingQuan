'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HighCarbDietReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          高碳减脂原理
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 核心理念 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">什么是高碳减脂？</h4>
          <p className="text-sm text-muted-foreground">
            高碳减脂（High Carb Fat Loss）是一种以高碳水、低脂肪为特点的减脂饮食策略。
            与传统低碳饮食相反，它通过保持较高的碳水摄入来维持代谢率和训练表现。
          </p>
        </div>

        {/* 科学原理 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">科学原理</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">🔥 食物热效应 (TEF)</div>
              <ul className="text-xs space-y-1">
                <li>• 蛋白质: 20-30% 热量用于消化</li>
                <li>• 碳水化合物: 5-10% 热量用于消化</li>
                <li>• 脂肪: 0-3% 热量用于消化</li>
              </ul>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">💪 维持瘦素水平</div>
              <p className="text-xs">
                碳水化合物能维持瘦素（Leptin）水平，避免代谢适应导致的减脂平台期。
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-foreground mb-1">⚡ 训练表现</div>
              <p className="text-xs">
                充足的糖原储备确保高强度训练的能量供应，避免掉肌肉。
              </p>
            </div>
          </div>
        </div>

        {/* 三种日类型 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">三种日类型</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="font-medium text-green-600 mb-1">🏋️ 训练日（高碳低脂）</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 蛋白质: 2.2g/kg 体重</li>
                <li>• 脂肪: 0.5g/kg（最低30-35g）</li>
                <li>• 碳水: 剩余热量，占比约50-60%</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="font-medium text-blue-600 mb-1">😴 休息日（中碳低脂）</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 蛋白质: 保持不变</li>
                <li>• 脂肪: 略微提高至0.6g/kg</li>
                <li>• 碳水: 减少30%</li>
              </ul>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="font-medium text-purple-600 mb-1">🍕 再喂日（高碳中脂）</div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 热量: 维持TDEE，不制造缺口</li>
                <li>• 脂肪: 提升至1.0g/kg</li>
                <li>• 碳水: 增加20%</li>
                <li>• 目的: 恢复激素，打破平台期</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 适合人群 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">适合人群</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-500/10 rounded text-center">
              <span className="text-green-600">✓</span> 训练量大
            </div>
            <div className="p-2 bg-green-500/10 rounded text-center">
              <span className="text-green-600">✓</span> 喜欢碳水
            </div>
            <div className="p-2 bg-green-500/10 rounded text-center">
              <span className="text-green-600">✓</span> 力量训练者
            </div>
            <div className="p-2 bg-green-500/10 rounded text-center">
              <span className="text-green-600">✓</span> 代谢较快
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
          <div className="font-medium text-yellow-600 mb-2">⚠️ 注意事项</div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 脂肪不能过低，需保证必需脂肪酸摄入</li>
            <li>• 选择低脂高碳食物，避免高脂碳水组合</li>
            <li>• 体脂较高者建议先用标准减脂方案</li>
            <li>• 每周称重1-2次，根据变化调整</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
