import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type FFMIOutput, type FFMICategory } from '@/lib/utils/ffmi';
import { cn } from '@/lib/utils';

interface FFMIResultProps {
  result: FFMIOutput;
  weight: number;
}

const categoryColors: Record<FFMICategory, string> = {
  below_average: 'bg-yellow-500',
  average: 'bg-blue-500',
  above_average: 'bg-green-500',
  excellent: 'bg-purple-500',
  elite: 'bg-red-500',
};

const categoryLabels: Record<FFMICategory, string> = {
  below_average: '低于平均',
  average: '平均水平',
  above_average: '高于平均',
  excellent: '优秀',
  elite: '精英级',
};

export function FFMIResult({ result, weight }: FFMIResultProps) {
  // Calculate progress percentage (0-30 scale for FFMI)
  const progressPercent = Math.min((result.adjustedFfmi / 30) * 100, 100);
  
  return (
    <div className="space-y-4">
      {/* Main Result Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
          <CardTitle className="flex items-center justify-between">
            <span>📊 计算结果</span>
            <span className="text-3xl font-bold">FFMI: {result.adjustedFfmi}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Visual Body Composition */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-32 bg-gradient-to-b from-orange-300 to-orange-400 rounded-t-full rounded-b-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-xs">体重</div>
                  <div className="text-lg font-bold">{weight}kg</div>
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                瘦体重: {result.ffm}kg
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>FFMI 指数</span>
              <span className="font-medium">{result.adjustedFfmi}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', categoryColors[result.category])}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>18</span>
              <span>20</span>
              <span>22</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">FFMI 原始值</div>
              <div className="text-2xl font-bold text-primary">{result.ffmi}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">瘦体重</div>
              <div className="text-2xl font-bold text-primary">{result.ffm} kg</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">体脂率</div>
              <div className="text-2xl font-bold text-orange-500">15.0%</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">脂肪质量</div>
              <div className="text-2xl font-bold text-orange-500">{(weight - result.ffm).toFixed(1)} kg</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Badge */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">肌肉质评估</div>
              <div className="text-lg font-medium">{categoryLabels[result.category]}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">体格威胁</div>
              <div className="text-lg font-medium text-green-600">健康</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body Composition Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">身体成分分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-20 text-sm text-muted-foreground">瘦体重</div>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(result.ffm / weight) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{result.ffm}kg</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 text-sm text-muted-foreground">肌肉量</div>
              <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${((result.ffm * 0.85) / weight) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{(result.ffm * 0.85).toFixed(1)}kg</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            FFMI: {result.adjustedFfmi} · 肌肉发达程度评估
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
