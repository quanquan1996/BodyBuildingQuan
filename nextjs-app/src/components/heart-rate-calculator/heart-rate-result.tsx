'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type HeartRateOutput } from '@/lib/utils/heart-rate';

interface HeartRateResultProps {
  result: HeartRateOutput;
}

export function HeartRateResult({ result }: HeartRateResultProps) {
  const { maxHR, restingHR, heartRateReserve, zones, formula } = result;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          计算结果
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 使用的公式 */}
        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/30 rounded">
          使用公式：{formula === 'karvonen' ? 'Karvonen（基于心率储备）' : '标准最大心率百分比'}
        </div>

        {/* 基础数据 */}
        <div className={`grid gap-4 ${heartRateReserve ? 'grid-cols-3' : 'grid-cols-1'}`}>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">最大心率</div>
            <div className="text-3xl font-bold text-red-500">{maxHR}</div>
            <div className="text-sm text-muted-foreground">bpm</div>
          </div>
          {restingHR && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">静息心率</div>
              <div className="text-3xl font-bold text-blue-500">{restingHR}</div>
              <div className="text-sm text-muted-foreground">bpm</div>
            </div>
          )}
          {heartRateReserve && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">心率储备</div>
              <div className="text-3xl font-bold text-green-500">{heartRateReserve}</div>
              <div className="text-sm text-muted-foreground">bpm</div>
            </div>
          )}
        </div>

        {/* 心率区间 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">心率训练区间</h4>
          <div className="space-y-2">
            {zones.map((zone) => (
              <div
                key={zone.zone}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
              >
                <div className={`w-3 h-10 rounded ${zone.color}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">Zone {zone.zone}</span>
                      <span className="text-muted-foreground ml-2">{zone.name}</span>
                    </div>
                    <div className="text-lg font-bold">
                      {zone.minHR} - {zone.maxHR}
                      <span className="text-sm font-normal text-muted-foreground ml-1">bpm</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {zone.minPercent}-{zone.maxPercent}% · {zone.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
