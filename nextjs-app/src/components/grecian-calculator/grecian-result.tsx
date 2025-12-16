'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, ArrowDown, Check, AlertCircle } from 'lucide-react';
import { ToolLinkCard, toolLinks } from '@/components/common/tool-link-card';
import { type GrecianIdealOutput, getCategoryLabel, GOLDEN_RATIO } from '@/lib/utils/grecian-ideal';
import { cn } from '@/lib/utils';

interface GrecianResultProps {
  result: GrecianIdealOutput;
}

const categoryColors: Record<GrecianIdealOutput['category'], string> = {
  legendary: 'bg-yellow-500',
  excellent: 'bg-green-500',
  good: 'bg-blue-500',
  average: 'bg-orange-500',
  developing: 'bg-gray-500',
};

const measurementLabels: Record<string, string> = {
  chest: '胸围',
  waist: '腰围',
  hip: '臀围',
  shoulder: '肩围',
  neck: '颈围',
  bicep: '上臂围',
  forearm: '前臂围',
  thigh: '大腿围',
  calf: '小腿围',
};

export function GrecianResult({ result }: GrecianResultProps) {
  return (
    <div className="space-y-6">
      {/* 总体得分卡片 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>古典比例得分</span>
            <Badge className={cn('text-white', categoryColors[result.category])}>
              {result.overallScore} 分
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={result.overallScore} className="h-3 mb-3" />
          <p className="text-sm text-muted-foreground">
            {getCategoryLabel(result.category)}
          </p>
        </CardContent>
      </Card>

      {/* 关键比例卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">黄金分割比例 (φ = {GOLDEN_RATIO})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <RatioItem
              label="肩腰比"
              current={result.keyRatios.shoulderToWaist.current}
              ideal={result.keyRatios.shoulderToWaist.ideal}
              score={result.keyRatios.shoulderToWaist.score}
            />
            <RatioItem
              label="胸腰比"
              current={result.keyRatios.chestToWaist.current}
              ideal={result.keyRatios.chestToWaist.ideal}
              score={result.keyRatios.chestToWaist.score}
            />
            <RatioItem
              label="臂颈比"
              current={result.keyRatios.armToNeck.current}
              ideal={result.keyRatios.armToNeck.ideal}
              score={result.keyRatios.armToNeck.score}
            />
            <RatioItem
              label="腿颈比"
              current={result.keyRatios.calfToNeck.current}
              ideal={result.keyRatios.calfToNeck.ideal}
              score={result.keyRatios.calfToNeck.score}
            />
          </div>
        </CardContent>
      </Card>

      {/* 各部位详情 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">各部位围度分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(result.measurements).map(([key, measurement]) => (
              <MeasurementRow
                key={key}
                label={measurementLabels[key]}
                measurement={measurement}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 改进建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            改进建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary font-bold">{index + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 工具联动 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔗 继续探索</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolLinkCard {...toolLinks.grecianToPose()} />
        </CardContent>
      </Card>
    </div>
  );
}

function RatioItem({ label, current, ideal, score }: {
  label: string;
  current: number;
  ideal: number;
  score: number;
}) {
  const isGood = score >= 85;
  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center justify-between">
        <span className={cn('text-lg font-bold', isGood ? 'text-green-600' : 'text-orange-600')}>
          {current}
        </span>
        <span className="text-sm text-muted-foreground">
          理想: {ideal}
        </span>
      </div>
      <Progress value={score} className="h-1.5 mt-2" />
    </div>
  );
}

function MeasurementRow({ label, measurement }: {
  label: string;
  measurement: GrecianIdealOutput['measurements']['chest'];
}) {
  const { current, ideal, difference, status } = measurement;
  
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center gap-2">
        {status === 'perfect' && <Check className="h-4 w-4 text-green-500" />}
        {status === 'close' && <Check className="h-4 w-4 text-blue-500" />}
        {status === 'needs_work' && (
          difference > 0 ? 
            <ArrowUp className="h-4 w-4 text-orange-500" /> : 
            <ArrowDown className="h-4 w-4 text-red-500" />
        )}
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span>当前: <strong>{current}</strong> cm</span>
        <span className="text-muted-foreground">理想: {ideal} cm</span>
        {difference !== 0 && (
          <Badge variant={difference > 0 ? 'outline' : 'destructive'} className="text-xs">
            {difference > 0 ? '+' : ''}{difference} cm
          </Badge>
        )}
      </div>
    </div>
  );
}
