import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HeartRateExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          心率训练区间详解
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong className="text-foreground">心率训练区间</strong>
            是根据最大心率划分的不同强度范围，每个区间对应不同的训练效果。
            了解并利用心率区间可以让你的有氧训练更加科学高效。
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">五大心率区间</h4>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-gray-400 bg-muted/20 rounded-r-lg">
              <div className="font-medium">Zone 1 - 热身区 (50-60%)</div>
              <p className="text-sm text-muted-foreground mt-1">
                非常轻松的活动，适合热身、恢复训练。可以轻松交谈，几乎不出汗。
              </p>
            </div>
            <div className="p-3 border-l-4 border-blue-400 bg-muted/20 rounded-r-lg">
              <div className="font-medium">Zone 2 - 燃脂区 (60-70%)</div>
              <p className="text-sm text-muted-foreground mt-1">
                最佳脂肪燃烧区间，适合长时间有氧运动。可以说完整句子，微微出汗。
              </p>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-muted/20 rounded-r-lg">
              <div className="font-medium">Zone 3 - 有氧区 (70-80%)</div>
              <p className="text-sm text-muted-foreground mt-1">
                提升心肺耐力的核心区间，中等强度。说话开始困难，明显出汗。
              </p>
            </div>
            <div className="p-3 border-l-4 border-orange-500 bg-muted/20 rounded-r-lg">
              <div className="font-medium">Zone 4 - 无氧区 (80-90%)</div>
              <p className="text-sm text-muted-foreground mt-1">
                高强度训练，提升速度耐力和乳酸阈值。只能说几个词，大量出汗。
              </p>
            </div>
            <div className="p-3 border-l-4 border-red-500 bg-muted/20 rounded-r-lg">
              <div className="font-medium">Zone 5 - 极限区 (90-100%)</div>
              <p className="text-sm text-muted-foreground mt-1">
                最大强度输出，只能维持很短时间。无法说话，全力冲刺。
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🔬</span> 标准公式
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>最大心率：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">MHR = 220 - 年龄</p>
              <p><strong>目标心率：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">THR = MHR × 强度%</p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚡</span> Karvonen 公式
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>心率储备：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">HRR = MHR - 静息心率</p>
              <p><strong>目标心率：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">THR = 静息心率 + HRR × 强度%</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span> 训练建议
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 减脂为主：70-80% 时间在 Zone 2，偶尔 Zone 3</li>
            <li>• 提升耐力：主要在 Zone 3，配合 Zone 2 恢复</li>
            <li>• 提升速度：间歇训练，Zone 4-5 配合 Zone 1-2 恢复</li>
            <li>• 初学者建议从 Zone 2 开始，逐步增加强度</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
