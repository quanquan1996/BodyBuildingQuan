import { SectionCard } from '@/components/ui/section-card';
import { DataCard } from '@/components/ui/data-card';
import { GradientProgress, StatusBadge } from '@/components/ui/gradient-progress';
import { type FFMIOutput, type FFMICategory } from '@/lib/utils/ffmi';
import { toolGradients } from '@/lib/config/theme';
import { BarChart3 } from 'lucide-react';

interface FFMIResultProps {
  result: FFMIOutput;
  weight: number;
}

const gradient = toolGradients['ffmi-calculator'];

const categoryLabels: Record<FFMICategory, string> = {
  below_average: '低于平均',
  average: '平均水平',
  above_average: '高于平均',
  excellent: '优秀',
  elite: '精英级',
};

const categoryStatus: Record<FFMICategory, 'poor' | 'average' | 'good' | 'excellent'> = {
  below_average: 'average',
  average: 'average',
  above_average: 'good',
  excellent: 'excellent',
  elite: 'excellent',
};

export function FFMIResult({ result, weight }: FFMIResultProps) {
  const progressPercent = Math.min((result.adjustedFfmi / 30) * 100, 100);
  const fatMass = weight - result.ffm;
  const muscleMass = result.ffm * 0.85;
  
  return (
    <div className="space-y-4">
      {/* 主要结果 */}
      <SectionCard
        title="计算结果"
        icon={<BarChart3 className="w-4 h-4" />}
        iconColor={gradient.from}
      >
        {/* FFMI 大数字展示 */}
        <div className="text-center mb-5">
          <div className="text-4xl font-bold tracking-tight" style={{ color: gradient.from }}>
            {result.adjustedFfmi}
          </div>
          <div className="text-sm text-muted-foreground mt-1">校正后 FFMI</div>
          <div className="mt-3">
            <StatusBadge 
              status={categoryStatus[result.category]} 
              label={categoryLabels[result.category]} 
            />
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-5">
          <GradientProgress
            value={progressPercent}
            gradientFrom={gradient.from}
            gradientTo={gradient.to}
            height="md"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
            <span>0</span>
            <span>18</span>
            <span>20</span>
            <span>22</span>
            <span>25</span>
            <span>30</span>
          </div>
        </div>

        {/* 数据卡片 */}
        <DataCard
          columns={2}
          items={[
            {
              label: 'FFMI 原始值',
              value: result.ffmi,
              bgColor: '#FFF5F5',
              valueColor: gradient.from,
              helpText: '未经身高校正的原始FFMI值',
            },
            {
              label: '瘦体重',
              value: result.ffm,
              unit: 'kg',
              bgColor: '#F0F9FF',
              valueColor: '#3B82F6',
              helpText: '去除脂肪后的体重，包括肌肉、骨骼、器官等',
            },
            {
              label: '脂肪质量',
              value: fatMass.toFixed(1),
              unit: 'kg',
              bgColor: '#FFFBEB',
              valueColor: '#F59E0B',
            },
            {
              label: '估算肌肉量',
              value: muscleMass.toFixed(1),
              unit: 'kg',
              bgColor: '#F0FDF4',
              valueColor: '#22C55E',
              helpText: '瘦体重的约85%为骨骼肌',
            },
          ]}
        />
      </SectionCard>

      {/* 身体成分分析 */}
      <SectionCard
        title="身体成分"
        icon={<BarChart3 className="w-4 h-4" />}
        iconColor="#3B82F6"
        bgColor="#3B82F615"
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">瘦体重</span>
              <span className="font-medium">{result.ffm} kg</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(result.ffm / weight) * 100}%`,
                  background: 'linear-gradient(90deg, #3B82F6, #60A5FA)',
                }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">肌肉量</span>
              <span className="font-medium">{muscleMass.toFixed(1)} kg</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(muscleMass / weight) * 100}%`,
                  background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">脂肪</span>
              <span className="font-medium">{fatMass.toFixed(1)} kg</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(fatMass / weight) * 100}%`,
                  background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                }}
              />
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
