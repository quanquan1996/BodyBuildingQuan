'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SkinfoldExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔬</span>
          计算原理
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Jackson-Pollock 公式 */}
          <div>
            <h4 className="font-medium mb-2">Jackson-Pollock 公式</h4>
            <p className="text-sm text-muted-foreground mb-3">
              本计算器使用 Jackson-Pollock 公式，这是目前最广泛使用的皮褶厚度体脂率估算方法。
              该公式通过测量特定部位的皮下脂肪厚度来估算全身体脂率。
            </p>
            <div className="p-3 rounded bg-muted/50 text-xs font-mono">
              <p>体密度 = a - b×(皮褶总和) + c×(皮褶总和)² - d×(年龄)</p>
              <p className="mt-1 text-muted-foreground">其中 a, b, c, d 为性别相关系数</p>
            </div>
          </div>

          {/* Siri 公式 */}
          <div>
            <h4 className="font-medium mb-2">Siri 公式</h4>
            <p className="text-sm text-muted-foreground mb-3">
              计算出体密度后，使用 Siri 公式将体密度转换为体脂率百分比。
              这个公式假设脂肪组织密度为 0.9 g/cm³，瘦体组织密度为 1.1 g/cm³。
            </p>
            <div className="p-3 rounded bg-muted/50 text-xs font-mono">
              <p>体脂率(%) = (495 / 体密度) - 450</p>
            </div>
          </div>
        </div>

        {/* 准确性说明 */}
        <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>⚠️</span> 准确性说明
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 皮褶厚度法的标准误差约为 ±3-4%</li>
            <li>• 测量技术和体脂夹质量会影响结果</li>
            <li>• 对于体脂率极低或极高的人群，准确性可能下降</li>
            <li>• 建议作为趋势追踪工具，而非绝对值参考</li>
            <li>• 如需精确测量，建议使用 DEXA 或水下称重法</li>
          </ul>
        </div>

        {/* 与其他方法对比 */}
        <div>
          <h4 className="font-medium mb-3">体脂测量方法对比</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">方法</th>
                  <th className="text-left py-2 pr-4">准确度</th>
                  <th className="text-left py-2 pr-4">成本</th>
                  <th className="text-left py-2">便捷性</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 pr-4">DEXA 扫描</td>
                  <td className="py-2 pr-4">⭐⭐⭐⭐⭐</td>
                  <td className="py-2 pr-4">💰💰💰</td>
                  <td className="py-2">需专业设备</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">水下称重</td>
                  <td className="py-2 pr-4">⭐⭐⭐⭐⭐</td>
                  <td className="py-2 pr-4">💰💰💰</td>
                  <td className="py-2">需专业设备</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-foreground">皮褶厚度法</td>
                  <td className="py-2 pr-4">⭐⭐⭐⭐</td>
                  <td className="py-2 pr-4">💰</td>
                  <td className="py-2">便携易用</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">生物电阻抗</td>
                  <td className="py-2 pr-4">⭐⭐⭐</td>
                  <td className="py-2 pr-4">💰💰</td>
                  <td className="py-2">方便快捷</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">目测/照片</td>
                  <td className="py-2 pr-4">⭐⭐</td>
                  <td className="py-2 pr-4">免费</td>
                  <td className="py-2">最便捷</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
