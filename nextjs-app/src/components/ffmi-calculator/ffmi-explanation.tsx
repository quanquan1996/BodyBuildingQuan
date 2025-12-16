import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FFMIExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📖</span>
          FFMI 原理与意义
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-semibold mb-2">什么是 FFMI？</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            FFMI（Fat-Free Mass Index，去脂体重指数）是一种用于评估肌肉发达程度的指标。
            与 BMI 不同，FFMI 排除了体脂的影响，更准确地反映了一个人的肌肉量水平。
            FFMI 特别适合用于评估健身者和运动员的肌肉发展情况。
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">FFMI 的优势特性</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>更准确地评估肌肉发达程度，不受体脂率影响</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>经过身高校正，可以在不同身高的人之间进行比较</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>可用于判断是否接近"自然极限"的肌肉量</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>帮助设定合理的健身目标和期望</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">如何 FFMI（增加肌肉量）</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>力量训练：每周 3-5 次，注重复合动作</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>蛋白质摄入：每公斤体重 1.6-2.2 克蛋白质</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>充足睡眠：每晚 7-9 小时高质量睡眠</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>渐进超负荷：逐步增加训练强度和重量</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold mb-2">FFMI 与 BMI 的区别</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            BMI 仅考虑身高和体重，无法区分肌肉和脂肪。一个肌肉发达的运动员可能 BMI 超标，
            但实际上非常健康。FFMI 通过排除体脂，专注于评估瘦体重（主要是肌肉），
            因此对于健身人群来说是更有意义的指标。
          </p>
        </section>

        <section className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">📐 计算公式</h3>
          <div className="text-sm font-mono bg-background rounded p-3 space-y-1">
            <p>瘦体重 = 体重 × (1 - 体脂率/100)</p>
            <p>FFMI = 瘦体重 / 身高²</p>
            <p>校正FFMI = FFMI + 6.1 × (1.8 - 身高)</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
