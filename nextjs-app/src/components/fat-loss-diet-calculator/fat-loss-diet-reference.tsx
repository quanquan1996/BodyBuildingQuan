import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FatLossDietReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          碳水递减参考
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">碳水递减原理</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              碳水递减是一种渐进式减脂策略，通过逐周降低碳水化合物摄入，
              让身体逐渐适应低碳水状态，避免代谢适应和平台期。
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">本计算器策略</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>初始碳水比例</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>每周递减</span>
              <span className="font-medium">8%</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>最低碳水比例</span>
              <span className="font-medium">20%</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>蛋白质</span>
              <span className="font-medium">2.0g/kg 体重</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>最低脂肪</span>
              <span className="font-medium">0.8g/kg 体重</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">热量缺口策略</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-green-500/10 rounded">
              <span>第1周</span>
              <span className="font-medium text-green-600">-300 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-500/10 rounded">
              <span>每周递增</span>
              <span className="font-medium text-yellow-600">+50 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-orange-500/10 rounded">
              <span>最大缺口</span>
              <span className="font-medium text-orange-600">-600 千卡</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="font-medium mb-1">💡 适用人群</p>
          <p>
            本计划适合普通健身爱好者和减脂新手。如果你是专业运动员或有特殊健康状况，
            建议咨询专业营养师。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
