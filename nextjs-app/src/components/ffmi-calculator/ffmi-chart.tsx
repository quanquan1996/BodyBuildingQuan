'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FFMIChartProps {
  currentFFMI?: number;
}

export function FFMIChart({ currentFFMI }: FFMIChartProps) {
  // Age-based FFMI reference data (simplified)
  const ageData = [
    { age: '20', avg: 20.5, high: 22.5, elite: 24.5 },
    { age: '25', avg: 21.0, high: 23.0, elite: 25.0 },
    { age: '30', avg: 20.8, high: 22.8, elite: 24.8 },
    { age: '35', avg: 20.5, high: 22.5, elite: 24.5 },
    { age: '40', avg: 20.0, high: 22.0, elite: 24.0 },
    { age: '45', avg: 19.5, high: 21.5, elite: 23.5 },
    { age: '50', avg: 19.0, high: 21.0, elite: 23.0 },
  ];

  const maxValue = 26;
  const chartHeight = 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📈</span>
          FFMI 与年龄关系
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span>普通FFMI</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span>优秀FFMI</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded" />
            <span>精英FFMI</span>
          </div>
          {currentFFMI && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded" />
              <span>你的FFMI</span>
            </div>
          )}
        </div>

        {/* Simple Bar Chart */}
        <div className="relative" style={{ height: chartHeight }}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-muted-foreground">
            <span>26</span>
            <span>22</span>
            <span>18</span>
            <span>14</span>
          </div>

          {/* Chart area */}
          <div className="ml-10 h-full flex items-end justify-around gap-1 border-l border-b border-muted">
            {ageData.map((data, index) => (
              <div key={data.age} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full flex justify-center gap-0.5" style={{ height: chartHeight - 20 }}>
                  {/* Average bar */}
                  <div
                    className="w-2 bg-blue-500 rounded-t"
                    style={{ height: `${(data.avg / maxValue) * 100}%` }}
                  />
                  {/* High bar */}
                  <div
                    className="w-2 bg-green-500 rounded-t"
                    style={{ height: `${(data.high / maxValue) * 100}%` }}
                  />
                  {/* Elite bar */}
                  <div
                    className="w-2 bg-purple-500 rounded-t"
                    style={{ height: `${(data.elite / maxValue) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.age}</span>
              </div>
            ))}
          </div>

          {/* Current FFMI line */}
          {currentFFMI && (
            <div
              className="absolute left-10 right-0 border-t-2 border-dashed border-orange-500"
              style={{ bottom: `${(currentFFMI / maxValue) * (chartHeight - 20)}px` }}
            >
              <span className="absolute right-0 -top-4 text-xs text-orange-500 font-medium">
                你: {currentFFMI}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          年龄（岁）
        </p>
      </CardContent>
    </Card>
  );
}
