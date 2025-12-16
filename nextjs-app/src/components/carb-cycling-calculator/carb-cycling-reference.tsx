import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CarbCyclingReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          碳循环指南
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 简易版周计划 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">简易版周计划 (2高5低)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>🟢 高碳日</span>
              <span className="font-medium">周三、周六</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>🟠 低碳日</span>
              <span className="font-medium">周一、二、四、五、日</span>
            </div>
          </div>
        </div>

        {/* 进阶版周计划 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">进阶版周计划 (2高2中3低)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>🟢 高碳日</span>
              <span className="font-medium">周三、周六</span>
            </div>
            <div className="flex justify-between p-2 bg-blue-500/10 rounded">
              <span>🔵 中碳日</span>
              <span className="font-medium">周一、周五</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>🟠 低碳日</span>
              <span className="font-medium">周二、四、日</span>
            </div>
          </div>
        </div>

        {/* 训练安排建议 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">训练安排建议</h4>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-green-600 mb-1">🟢 高碳日</div>
              <p className="text-muted-foreground">安排大肌群训练（腿、背、胸），高强度力量训练</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-blue-600 mb-1">🔵 中碳日</div>
              <p className="text-muted-foreground">安排小肌群训练（肩、手臂），中等强度训练</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-orange-600 mb-1">🟠 低碳日</div>
              <p className="text-muted-foreground">休息日或低强度有氧，如快走、瑜伽</p>
            </div>
          </div>
        </div>

        {/* 执行要点 */}
        <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-lg space-y-2">
          <p className="font-medium mb-2">💡 执行要点</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>高碳日碳水来源选择复合碳水（燕麦、糙米、红薯）</li>
            <li>低碳日增加蔬菜摄入，保持饱腹感</li>
            <li>蛋白质每天保持稳定，分散到每餐</li>
            <li>根据训练反馈灵活调整，不必严格固定</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
