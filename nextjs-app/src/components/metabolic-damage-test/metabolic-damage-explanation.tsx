'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function MetabolicDamageExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">❓</span>
          常见问题
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              代谢受损是真的吗？还是借口？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">
                代谢适应是经过科学验证的生理现象，不是借口。研究表明，长期热量限制会导致：
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>非运动性活动产热(NEAT)下降 - 你会不自觉地减少日常活动</li>
                <li>甲状腺激素T3下降 - 直接影响代谢率</li>
                <li>瘦素水平降低 - 增加饥饿感，降低能量消耗</li>
                <li>肌肉蛋白合成减少 - 可能导致肌肉流失</li>
              </ul>
              <p className="mt-2">
                但这不意味着你无法减脂，只是需要更科学的方法。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              为什么吃很少还是不瘦？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">可能的原因包括：</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>热量计算不准确</strong> - 低估了实际摄入（最常见原因）</li>
                <li><strong>代谢适应</strong> - 身体降低了能量消耗</li>
                <li><strong>水分波动</strong> - 体重变化被水分掩盖</li>
                <li><strong>压力和睡眠</strong> - 皮质醇升高导致水肿</li>
                <li><strong>周末放纵</strong> - 抵消了工作日的缺口</li>
              </ul>
              <p className="mt-2">
                建议先确认热量计算是否准确，再考虑代谢适应问题。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              什么是反向节食？怎么做？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">
                反向节食(Reverse Dieting)是一种逐步增加热量摄入的策略，目的是恢复代谢而不大幅增加体脂。
              </p>
              <p className="mb-2"><strong>具体做法：</strong></p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>每周增加50-100千卡热量（主要来自碳水化合物）</li>
                <li>保持蛋白质摄入稳定（1.6-2.2g/kg体重）</li>
                <li>继续力量训练，维持肌肉量</li>
                <li>监控体重变化，允许小幅上涨（主要是糖原和水分）</li>
                <li>持续4-16周，直到达到维持热量</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              代谢恢复需要多长时间？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">
                恢复时间取决于代谢适应的程度：
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>轻度适应</strong>：2-4周饮食休息即可恢复</li>
                <li><strong>中度受损</strong>：4-8周反向节食</li>
                <li><strong>严重受损</strong>：8-16周甚至更长</li>
              </ul>
              <p className="mt-2">
                研究表明，大多数代谢适应可以在恢复正常饮食后逆转，但需要耐心。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              如何避免代谢受损？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">预防代谢适应的策略：</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>适度热量缺口</strong>：每天300-500千卡，不要太激进</li>
                <li><strong>定期饮食休息</strong>：每4-8周安排1-2周维持期</li>
                <li><strong>保持蛋白质</strong>：高蛋白饮食保护肌肉</li>
                <li><strong>力量训练</strong>：维持肌肉量是关键</li>
                <li><strong>控制有氧量</strong>：避免过度有氧消耗</li>
                <li><strong>充足睡眠</strong>：7-9小时优质睡眠</li>
                <li><strong>管理压力</strong>：高压力会加速代谢下降</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">
              这个检测准确吗？
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              <p className="mb-2">
                此检测基于以下因素进行评估：
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>当前热量摄入与理论BMR的对比</li>
                <li>体重变化趋势与热量缺口的匹配度</li>
                <li>节食持续时间</li>
              </ul>
              <p className="mt-2">
                <strong>局限性：</strong>这是一个估算工具，不能替代专业的代谢测试（如间接测热法）。
                实际代谢率受很多因素影响，包括遗传、激素水平、肌肉量等。
              </p>
              <p className="mt-2">
                如果你有严重的代谢问题，建议咨询医生或营养师进行专业评估。
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
