import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FatLossDietExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          什么是碳水递减减脂法？
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            <strong className="text-foreground">碳水递减减脂法</strong>
            是一种科学的渐进式减脂策略。与传统的固定热量减脂不同，
            它通过逐周降低碳水化合物摄入，让身体平稳过渡到燃脂状态，
            同时保持高蛋白摄入以保护肌肉。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>✅</span> 优点
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 避免代谢适应和平台期</li>
              <li>• 减少饥饿感和暴食风险</li>
              <li>• 保护肌肉量</li>
              <li>• 心理负担小，易于坚持</li>
              <li>• 适合普通人执行</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚠️</span> 注意事项
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 不适合极低体脂人群</li>
              <li>• 需要配合力量训练</li>
              <li>• 建议每周监测体重变化</li>
              <li>• 出现不适应及时调整</li>
              <li>• 减脂周期不宜过长</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">为什么选择碳水递减？</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">1</span>
              <div>
                <strong>避免代谢适应</strong>：突然大幅减少热量会导致代谢下降，
                渐进式减少让身体有时间适应
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">2</span>
              <div>
                <strong>保护肌肉</strong>：高蛋白摄入配合渐进减碳，
                最大程度保留肌肉量
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">3</span>
              <div>
                <strong>稳定血糖</strong>：逐渐降低碳水有助于稳定血糖，
                减少饥饿感和情绪波动
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-primary">4</span>
              <div>
                <strong>易于执行</strong>：每周只需小幅调整，
                比极端饮食更容易坚持
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>🍽️</span> 食物选择建议
          </h4>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">蛋白质来源</p>
              <p>鸡胸肉、牛肉、鱼虾、鸡蛋、豆腐、蛋白粉</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">优质碳水</p>
              <p>糙米、燕麦、红薯、全麦面包、藜麦</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">健康脂肪</p>
              <p>坚果、牛油果、橄榄油、深海鱼</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
