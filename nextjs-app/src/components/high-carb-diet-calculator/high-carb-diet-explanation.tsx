'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function HighCarbDietExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">❓</span>
          常见问题
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">高碳减脂和低碳减脂哪个更好？</h4>
              <p className="text-sm text-muted-foreground">
                没有绝对的好坏，取决于个人情况。高碳减脂适合训练量大、喜欢碳水、代谢较快的人；
                低碳减脂适合久坐、胰岛素敏感性差、不爱运动的人。选择能长期坚持的方案最重要。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">为什么要设置脂肪下限？</h4>
              <p className="text-sm text-muted-foreground">
                脂肪是必需营养素，参与激素合成、细胞膜构建、脂溶性维生素吸收等重要功能。
                男性每天至少需要30g，女性至少需要35g脂肪来维持正常生理功能。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">再喂日可以随便吃吗？</h4>
              <p className="text-sm text-muted-foreground">
                不是。再喂日的目的是恢复激素水平，而不是暴饮暴食。应该选择干净的碳水来源，
                适当提高脂肪摄入，但仍需控制总热量在TDEE左右。
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">什么时候需要再喂日？</h4>
              <p className="text-sm text-muted-foreground">
                体脂率较低（男性&lt;12%，女性&lt;20%）或减脂时间较长（超过8周）时，
                建议每周安排1次再喂日。体脂较高者可以每2周1次或暂时不需要。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">高碳减脂会不会掉肌肉？</h4>
              <p className="text-sm text-muted-foreground">
                只要蛋白质摄入充足（2.0-2.2g/kg）并保持力量训练，高碳减脂不会比其他方案更容易掉肌肉。
                充足的碳水反而能保证训练强度，有助于保持肌肉。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">如何选择高碳低脂食物？</h4>
              <p className="text-sm text-muted-foreground">
                优先选择天然、未加工的碳水来源：米饭、土豆、红薯、燕麦、水果等。
                避免高脂碳水组合如薯片、蛋糕、油炸食品。蛋白质选择瘦肉、鱼、蛋白。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
