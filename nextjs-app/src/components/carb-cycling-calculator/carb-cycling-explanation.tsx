import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CarbCyclingExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          碳循环原理
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 什么是碳循环 */}
        <div className="space-y-2">
          <h4 className="font-medium">什么是碳循环饮食？</h4>
          <p className="text-sm text-muted-foreground">
            碳循环（Carb Cycling）是一种饮食策略，通过在不同日期交替摄入高、中、低碳水化合物，
            来优化身体的能量利用和激素水平。高碳日补充糖原、促进训练表现，低碳日促进脂肪燃烧，
            两者结合可以在减脂的同时保持肌肉和训练状态。
          </p>
        </div>

        {/* Katch-McArdle 公式 */}
        <div className="space-y-2">
          <h4 className="font-medium">Katch-McArdle 公式</h4>
          <p className="text-sm text-muted-foreground">
            本计算器使用 Katch-McArdle 公式计算基础代谢率，该公式基于瘦体重（去脂体重）计算，
            对于健身人群和体脂率已知的用户更为准确。
          </p>
          <div className="p-3 bg-muted/30 rounded-lg font-mono text-sm">
            <p>BMR = 370 + (21.6 × 瘦体重)</p>
            <p className="text-xs text-muted-foreground mt-1">瘦体重 = 体重 × (1 - 体脂率/100)</p>
          </div>
        </div>

        {/* 碳循环的优势 */}
        <div className="space-y-2">
          <h4 className="font-medium">碳循环的优势</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>避免长期低碳导致的代谢适应和平台期</li>
            <li>高碳日补充糖原，保持训练强度和表现</li>
            <li>低碳日促进脂肪氧化，提高减脂效率</li>
            <li>心理上更容易坚持，有"放松日"的感觉</li>
            <li>保持瘦素和甲状腺激素水平稳定</li>
          </ul>
        </div>

        {/* 适合人群 */}
        <div className="space-y-2">
          <h4 className="font-medium">适合人群</h4>
          <p className="text-sm text-muted-foreground">
            碳循环适合有一定健身基础、希望在减脂期保持训练表现的人群。
            如果你是健身新手，建议先从简单的热量控制开始，熟悉后再尝试碳循环。
          </p>
        </div>

        {/* 注意事项 */}
        <div className="p-3 bg-yellow-500/10 rounded-lg">
          <p className="font-medium text-yellow-600 mb-2">⚠️ 注意事项</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>计算结果仅供参考，实际需求因人而异</li>
            <li>建议根据体重变化和训练感受调整</li>
            <li>如有健康问题，请咨询专业营养师</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
