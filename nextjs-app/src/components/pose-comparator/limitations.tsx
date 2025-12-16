import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Limitations() {
  return (
    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <span>⚠️</span>
          使用说明与局限性
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-3">
          <section>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">📌 仅供参考</h4>
            <p className="text-amber-700/80 dark:text-amber-400/80">
              本工具的评分结果仅供练习参考，不能替代专业教练的指导和比赛裁判的评判。
              健美造型的评分涉及肌肉量、分离度、对称性、皮肤状态等多个维度，
              本工具仅能评估姿态角度的相似度。
            </p>
          </section>

          <section>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">🔍 技术局限</h4>
            <ul className="text-amber-700/80 dark:text-amber-400/80 space-y-1">
              <li>• <strong>2D 图像限制：</strong>只能分析平面角度，无法评估深度和立体感</li>
              <li>• <strong>遮挡问题：</strong>手臂遮挡躯干时可能影响检测准确性</li>
              <li>• <strong>光照影响：</strong>强烈的阴影或背光可能导致关键点识别偏差</li>
              <li>• <strong>服装干扰：</strong>宽松服装可能影响身体轮廓的准确识别</li>
              <li>• <strong>角度差异：</strong>拍摄角度不同会显著影响对比结果</li>
            </ul>
          </section>

          <section>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">✅ 最佳使用建议</h4>
            <ul className="text-amber-700/80 dark:text-amber-400/80 space-y-1">
              <li>• 使用相同拍摄角度的参考图和自拍照</li>
              <li>• 确保光线充足、背景简洁</li>
              <li>• 穿着贴身服装以便准确识别身体轮廓</li>
              <li>• 全身入镜，保持与参考图相似的距离</li>
              <li>• 多次拍摄取最佳效果进行对比</li>
            </ul>
          </section>

          <section>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">🏋️ 专业建议</h4>
            <p className="text-amber-700/80 dark:text-amber-400/80">
              如果你正在备赛或希望系统提升造型水平，建议寻求专业健美教练的指导。
              本工具可以作为日常练习的辅助，帮助你在镜子前自我检查时有一个量化参考。
            </p>
          </section>
        </div>

        <div className="pt-2 border-t border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-600/70 dark:text-amber-500/70 text-center">
            💡 提示：评分仅反映姿态角度相似度，不代表整体健美水平评价
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
