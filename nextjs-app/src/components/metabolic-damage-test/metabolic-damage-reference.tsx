'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MetabolicDamageReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">📚</span>
          代谢受损参考
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 什么是代谢受损 */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">什么是代谢受损？</h4>
          <p className="text-sm text-muted-foreground">
            代谢受损（Metabolic Adaptation）是指长期热量限制后，身体为了生存而降低能量消耗的适应性反应。
            这不是真正的"损伤"，而是身体的保护机制。
          </p>
        </div>

        {/* 常见症状 */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">代谢适应的常见表现</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { emoji: '⚖️', text: '体重停滞不降' },
              { emoji: '🥶', text: '经常感到寒冷' },
              { emoji: '😴', text: '疲劳感增加' },
              { emoji: '💪', text: '力量下降' },
              { emoji: '🍽️', text: '饥饿感强烈' },
              { emoji: '😤', text: '情绪波动大' },
              { emoji: '💤', text: '睡眠质量差' },
              { emoji: '🏃', text: '运动表现下降' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-sm">
                <span>{item.emoji}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 受损等级说明 */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">受损等级说明</h4>
          <div className="space-y-2">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <div className="font-medium text-green-600 text-sm">✅ 代谢正常 (0-24分)</div>
              <div className="text-xs text-muted-foreground mt-1">
                热量摄入与体重变化符合预期，代谢功能正常
              </div>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <div className="font-medium text-yellow-600 text-sm">⚠️ 轻度适应 (25-49分)</div>
              <div className="text-xs text-muted-foreground mt-1">
                存在轻微代谢适应，建议安排饮食休息日或适当增加热量
              </div>
            </div>
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <div className="font-medium text-orange-600 text-sm">🔶 中度受损 (50-74分)</div>
              <div className="text-xs text-muted-foreground mt-1">
                代谢明显下降，建议进行4-8周的反向节食恢复
              </div>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <div className="font-medium text-red-600 text-sm">🔴 严重受损 (75-100分)</div>
              <div className="text-xs text-muted-foreground mt-1">
                代谢严重受损，强烈建议停止节食，进行8-16周系统性恢复
              </div>
            </div>
          </div>
        </div>

        {/* 影响因素 */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">影响代谢适应的因素</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>热量缺口大小</strong>：缺口越大，适应越快</li>
            <li>• <strong>节食时长</strong>：时间越长，适应越明显</li>
            <li>• <strong>体脂水平</strong>：体脂越低，适应越强烈</li>
            <li>• <strong>肌肉量</strong>：肌肉流失会降低基础代谢</li>
            <li>• <strong>运动量</strong>：过度有氧会加速代谢下降</li>
          </ul>
        </div>

        {/* 恢复策略 */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">代谢恢复策略</h4>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">1. 反向节食 (Reverse Dieting)</div>
              <div className="text-xs text-muted-foreground mt-1">
                每周增加50-100千卡热量，逐步恢复到维持热量
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">2. 饮食休息 (Diet Break)</div>
              <div className="text-xs text-muted-foreground mt-1">
                每4-8周安排1-2周的维持热量期
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">3. 力量训练</div>
              <div className="text-xs text-muted-foreground mt-1">
                保持或增加肌肉量，提升基础代谢率
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">4. 减少有氧</div>
              <div className="text-xs text-muted-foreground mt-1">
                适当减少有氧运动量，避免过度消耗
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
