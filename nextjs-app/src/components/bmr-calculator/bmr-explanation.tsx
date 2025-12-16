import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function BMRExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          什么是基础代谢率 (BMR)？
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong className="text-foreground">基础代谢率 (BMR, Basal Metabolic Rate)</strong> 
            是指人体在完全静息状态下，维持生命所需的最低能量消耗。这包括呼吸、血液循环、
            细胞生长、体温调节等基本生理功能所需的能量。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>🔬</span> Mifflin-St Jeor 公式
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>男性：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">
                BMR = 10×体重(kg) + 6.25×身高(cm) - 5×年龄 + 5
              </p>
              <p><strong>女性：</strong></p>
              <p className="font-mono text-xs bg-muted p-2 rounded">
                BMR = 10×体重(kg) + 6.25×身高(cm) - 5×年龄 - 161
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚡</span> TDEE 计算
            </h4>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>每日总能量消耗 (TDEE)</strong> = BMR × 活动系数
              </p>
              <ul className="space-y-1 text-xs">
                <li>久坐不动：×1.2</li>
                <li>轻度活动：×1.375</li>
                <li>中度活动：×1.55</li>
                <li>积极活动：×1.725</li>
                <li>非常活跃：×1.9</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">影响 BMR 的因素</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              <div>
                <strong>年龄</strong>：随年龄增长，BMR 逐渐下降
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              <div>
                <strong>性别</strong>：男性通常比女性 BMR 更高
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              <div>
                <strong>肌肉量</strong>：肌肉越多，BMR 越高
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">•</span>
              <div>
                <strong>体重</strong>：体重越大，BMR 通常越高
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>💡</span> 实用建议
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 减脂时，每日热量摄入建议比 TDEE 低 300-500 千卡</li>
            <li>• 增肌时，每日热量摄入建议比 TDEE 高 200-300 千卡</li>
            <li>• 不建议热量摄入低于 BMR，以免影响基础代谢</li>
            <li>• 增加肌肉量可以提高 BMR，有助于长期体重管理</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
