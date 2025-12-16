import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function GrecianExplanation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>关于古典比例计算器</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="what-is">
            <AccordionTrigger>什么是希腊雕塑比例（Grecian Ideal）？</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                希腊雕塑比例源自古希腊对人体美学的研究，认为完美的人体应该符合特定的数学比例关系。
                这些比例以黄金分割率（φ = 1.618）为核心，被广泛应用于古希腊雕塑和建筑中。
              </p>
              <p className="text-muted-foreground mt-2">
                在现代健美运动中，这些古典比例被重新发现并应用，成为评判身材对称性和美感的重要标准。
                传奇健美运动员如 Steve Reeves、Frank Zane 等都以接近古典比例而闻名。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="golden-ratio">
            <AccordionTrigger>黄金分割率在健美中的应用</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                黄金分割率（约 1.618）是自然界中最常见的比例关系，被认为是最具美感的比例。
                在健美中，主要应用于以下方面：
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li><strong>肩腰比</strong>：理想的肩围应该是腰围的 1.618 倍，形成经典的 V 型身材</li>
                <li><strong>胸腰比</strong>：胸围与腰围的比例也应接近 1.618</li>
                <li><strong>上下身比例</strong>：腿长与上身的比例</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="wrist-method">
            <AccordionTrigger>为什么用手腕围度作为基准？</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                手腕是人体中几乎没有肌肉和脂肪覆盖的部位，其围度主要由骨骼大小决定。
                因此，手腕围度是衡量个人骨架大小的可靠指标。
              </p>
              <p className="text-muted-foreground mt-2">
                基于手腕围度计算理想身材比例的方法由 John McCallum 在 1960 年代提出，
                后来被 Steve Reeves 等健美运动员广泛采用。这种方法考虑了个体差异，
                为不同骨架大小的人提供了个性化的目标。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="symmetry">
            <AccordionTrigger>对称性在健美中的重要性</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                健美比赛评分中，对称性（Symmetry）是三大评判标准之一（另外两个是肌肉量和线条）。
                对称性不仅指左右对称，更重要的是上下身、前后身的比例协调。
              </p>
              <p className="text-muted-foreground mt-2">
                古典比例计算器帮助你识别身材中的弱项，让你能够针对性地训练，
                而不是盲目追求某个部位的肌肉量。记住：健美的本质是雕塑，而不是堆砌。
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitations">
            <AccordionTrigger>计算器的局限性</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground">
                本计算器基于经典公式和黄金分割率，但需要注意：
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>每个人的骨骼结构和肌肉附着点不同，理想比例会有个体差异</li>
                <li>测量误差会影响结果准确性，建议多次测量取平均值</li>
                <li>古典比例更适合追求美感的健体/古典健美，而非追求极限肌肉量的健美</li>
                <li>女性的理想比例与男性有所不同，本计算器主要针对男性设计</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
