'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { measurementSites } from '@/lib/utils/skinfold';

export function SkinfoldGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          测量部位详解
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 测量技巧 */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <span>💡</span> 测量技巧
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 使用专业体脂夹，确保刻度清晰可读</li>
            <li>• 用拇指和食指捏起皮褶，距离约 1cm</li>
            <li>• 在捏起后 2-3 秒内读取数值</li>
            <li>• 每个部位测量 2-3 次取平均值</li>
            <li>• 测量时保持肌肉放松</li>
            <li>• 建议在相同时间、相同条件下测量</li>
          </ul>
        </div>

        {/* 各部位详解 */}
        <div className="space-y-4">
          <h4 className="font-medium">各测量部位说明</h4>
          
          {Object.entries(measurementSites).map(([key, site]) => (
            <div key={key} className="p-3 rounded-lg border bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{site.emoji}</span>
                <span className="font-medium">{site.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{site.description}</p>
              <p className="text-xs text-primary mt-1">💡 {site.tips}</p>
            </div>
          ))}
        </div>

        {/* 简易模式说明 */}
        <div className="space-y-3">
          <h4 className="font-medium">测量模式说明</h4>
          
          <div className="p-3 rounded-lg border">
            <h5 className="font-medium text-sm mb-1">简易模式 (3点测量)</h5>
            <p className="text-sm text-muted-foreground">
              适合日常快速评估，准确度约 ±3-4%
            </p>
            <div className="mt-2 text-xs">
              <p><span className="font-medium">男性：</span>胸部、腹部、大腿</p>
              <p><span className="font-medium">女性：</span>三头肌、髂骨上、大腿</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border">
            <h5 className="font-medium text-sm mb-1">精确模式 (7点测量)</h5>
            <p className="text-sm text-muted-foreground">
              更全面的评估，准确度约 ±2-3%
            </p>
            <p className="mt-2 text-xs">
              测量全部7个部位：胸部、腋中线、三头肌、肩胛下、腹部、髂骨上、大腿
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
