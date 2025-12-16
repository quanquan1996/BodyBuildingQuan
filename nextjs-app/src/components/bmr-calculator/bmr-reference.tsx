import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BMRReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          BMR 参考范围
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">男性 BMR 参考值</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>18-30 岁</span>
              <span className="font-medium">1600-1800 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>31-50 岁</span>
              <span className="font-medium">1500-1700 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>51+ 岁</span>
              <span className="font-medium">1400-1600 千卡</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">女性 BMR 参考值</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>18-30 岁</span>
              <span className="font-medium">1300-1500 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>31-50 岁</span>
              <span className="font-medium">1200-1400 千卡</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/30 rounded">
              <span>51+ 岁</span>
              <span className="font-medium">1100-1300 千卡</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/20 rounded-lg">
          <p className="font-medium mb-1">💡 提示</p>
          <p>以上为一般参考范围，实际 BMR 因个体差异（身高、体重、肌肉量等）会有所不同。</p>
        </div>
      </CardContent>
    </Card>
  );
}
