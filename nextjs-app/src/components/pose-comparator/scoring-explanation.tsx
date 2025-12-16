import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ScoringExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📐</span>
          评分原理与依据
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 检测原理 */}
        <section>
          <h3 className="font-semibold mb-2">🔬 AI 姿态检测原理</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            本工具使用 Google MediaPipe Pose Landmarker 技术，通过深度学习模型识别人体的 33 个关键点位置，
            包括头部、肩膀、手肘、手腕、髋部、膝盖、脚踝等。AI 模型经过大量人体图像训练，
            能够在各种角度和光照条件下准确识别人体姿态。
          </p>
        </section>

        {/* 评分依据 */}
        <section>
          <h3 className="font-semibold mb-2">📊 评分计算依据</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>评分系统基于以下关键角度的对比分析：</p>
            <div className="grid gap-2">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium text-foreground">肩部角度</p>
                <p>测量双肩连线与水平面的夹角，评估肩部展开程度和对称性</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium text-foreground">手臂角度</p>
                <p>测量上臂与前臂的弯曲角度，评估肱二头肌展示效果</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium text-foreground">躯干角度</p>
                <p>测量脊柱倾斜角度，评估站姿稳定性和核心控制</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium text-foreground">腿部角度</p>
                <p>测量大腿与小腿的角度，评估下肢姿态和稳定性</p>
              </div>
            </div>
            <p className="mt-3">
              最终得分 = 100 - Σ(各关节角度差异 × 权重)，分数越高表示与参考造型越接近。
            </p>
          </div>
        </section>

        {/* 评分标准 */}
        <section>
          <h3 className="font-semibold mb-2">🎯 评分等级说明</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">分数范围</th>
                  <th className="text-left py-2 font-medium">等级</th>
                  <th className="text-left py-2 font-medium">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="py-2">90-100</td>
                  <td className="py-2 text-green-600 font-medium">优秀</td>
                  <td className="py-2">造型高度还原，角度差异极小</td>
                </tr>
                <tr>
                  <td className="py-2">75-89</td>
                  <td className="py-2 text-blue-600 font-medium">良好</td>
                  <td className="py-2">整体造型到位，部分细节可优化</td>
                </tr>
                <tr>
                  <td className="py-2">60-74</td>
                  <td className="py-2 text-yellow-600 font-medium">一般</td>
                  <td className="py-2">基本造型正确，多处需要调整</td>
                </tr>
                <tr>
                  <td className="py-2">&lt; 60</td>
                  <td className="py-2 text-red-600 font-medium">需改进</td>
                  <td className="py-2">造型差异较大，建议重新练习</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
