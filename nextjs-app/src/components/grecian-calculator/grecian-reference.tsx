import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GOLDEN_RATIO } from '@/lib/utils/grecian-ideal';

export function GrecianReference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">古典比例参考标准</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">黄金分割率 (φ = {GOLDEN_RATIO})</h4>
          <p className="text-sm text-muted-foreground">
            古希腊人认为 1.618 是最完美的比例，广泛应用于建筑、艺术和人体美学。
            在健美中，理想的肩腰比和胸腰比都应接近这个数值。
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Steve Reeves 标准</h4>
          <p className="text-sm text-muted-foreground mb-2">
            传奇健美运动员 Steve Reeves 被认为拥有最接近古典理想的身材比例：
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>上臂围 = 颈围 = 小腿围</li>
            <li>胸围 = 手腕围 × 6.5</li>
            <li>腰围 = 手腕围 × 4.0</li>
            <li>肩围 = 腰围 × 1.618</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">测量方法</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>手腕围</strong>：在手腕最细处测量（骨头突出处）</li>
            <li><strong>肩围</strong>：双臂下垂，绕肩膀最宽处一圈</li>
            <li><strong>胸围</strong>：乳头水平位置，正常呼吸时测量</li>
            <li><strong>腰围</strong>：肚脐水平位置，放松状态测量</li>
            <li><strong>上臂围</strong>：屈臂时二头肌最高点</li>
            <li><strong>大腿围</strong>：大腿根部最粗处</li>
            <li><strong>小腿围</strong>：小腿最粗处</li>
          </ul>
        </div>

        <div className="bg-primary/10 p-3 rounded-lg">
          <h4 className="font-semibold mb-1 text-primary">为什么手腕围度很重要？</h4>
          <p className="text-sm text-muted-foreground">
            手腕围度反映了你的骨架大小，是计算理想身材比例的基准。
            骨架较大的人自然需要更多的肌肉量才能达到视觉上的平衡。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
