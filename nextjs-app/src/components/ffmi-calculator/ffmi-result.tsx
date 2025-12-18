import { SectionCard } from '@/components/ui/section-card';
import { DataCard } from '@/components/ui/data-card';
import { GradientProgress, StatusBadge } from '@/components/ui/gradient-progress';
import { type FFMIOutput, type FFMICategory } from '@/lib/utils/ffmi';
import { toolGradients } from '@/lib/config/theme';
import { BarChart3 } from 'lucide-react';
import type { Locale, Dictionary } from '@/lib/i18n';

interface FFMIResultProps {
  result: FFMIOutput;
  weight: number;
  locale: Locale;
  dict: Dictionary;
}

const gradient = toolGradients['ffmi-calculator'];

const categoryStatus: Record<FFMICategory, 'poor' | 'average' | 'good' | 'excellent'> = {
  below_average: 'average',
  average: 'average',
  above_average: 'good',
  excellent: 'excellent',
  elite: 'excellent',
};

export function FFMIResult({ result, weight, locale, dict }: FFMIResultProps) {
  const t = dict.ffmiCalculator;
  const categoryLabels: Record<FFMICategory, string> = {
    below_average: t.categories.below_average,
    average: t.categories.average,
    above_average: t.categories.above_average,
    excellent: t.categories.excellent,
    elite: t.categories.elite,
  };
  const progressPercent = Math.min((result.adjustedFfmi / 30) * 100, 100);
  const fatMass = weight - result.ffm;
  const muscleMass = result.ffm * 0.85;
  
  return (
    <div className="space-y-4">
      {/* 主要结果 */}
      <SectionCard
        title={t.result.title}
        icon={<BarChart3 className="w-4 h-4" />}
        iconColor={gradient.from}
      >
        {/* FFMI 大数字展示 */}
        <div className="text-center mb-5">
          <div className="text-4xl font-bold tracking-tight" style={{ color: gradient.from }}>
            {result.adjustedFfmi}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{t.result.adjustedFfmi}</div>
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
              label: t.result.ffmiRaw,
              value: result.ffmi,
              bgColor: '#FFF5F5',
              valueColor: gradient.from,
            },
            {
              label: t.result.leanMass,
              value: result.ffm,
              unit: 'kg',
              bgColor: '#F0F9FF',
              valueColor: '#3B82F6',
              helpText: t.result.leanMassHelp,
            },
            {
              label: t.result.fatMass,
              value: fatMass.toFixed(1),
              unit: 'kg',
              bgColor: '#FFFBEB',
              valueColor: '#F59E0B',
            },
            {
              label: t.result.muscleMass,
              value: muscleMass.toFixed(1),
              unit: 'kg',
              bgColor: '#F0FDF4',
              valueColor: '#22C55E',
              helpText: t.result.muscleHelp,
            },
          ]}
        />
      </SectionCard>

      {/* 身体成分分析 */}
      <SectionCard
        title={t.result.bodyComposition}
        icon={<BarChart3 className="w-4 h-4" />}
        iconColor="#3B82F6"
        bgColor="#3B82F615"
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">{t.result.leanMass}</span>
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
              <span className="text-muted-foreground">{t.result.muscleMass}</span>
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
              <span className="text-muted-foreground">{t.result.fatMass}</span>
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
