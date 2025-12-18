'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler } from 'lucide-react';
import {
  validateMetabolicDamageInput,
  dietDurationLabels,
  weightTrendLabels,
  type MetabolicDamageInput,
  type WeightTrend,
  type DietDuration,
} from '@/lib/utils/metabolic-damage';
import type { Locale, Dictionary } from '@/lib/i18n';

interface MetabolicDamageFormProps {
  onCalculate: (data: MetabolicDamageInput) => void;
  locale: Locale;
  dict: Dictionary;
}

const weightTrends: WeightTrend[] = ['losing', 'stable', 'gaining'];
const dietDurations: DietDuration[] = ['short', 'medium', 'long', 'very_long'];

function MetabolicDamageFormInner({ onCalculate, locale, dict }: MetabolicDamageFormProps) {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentCalories, setCurrentCalories] = useState('1500');
  const [bodyFat, setBodyFat] = useState('');
  const [weightTrend, setWeightTrend] = useState<WeightTrend>('stable');
  const [dietDuration, setDietDuration] = useState<DietDuration>('medium');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = dict.metabolicDamageTest.form;
  const isZh = locale === 'zh';

  // Translated weight trend labels
  const getWeightTrendLabel = (trend: WeightTrend) => {
    const labels: Record<WeightTrend, { label: string; description: string }> = {
      losing: { label: isZh ? '持续下降' : 'Losing', description: isZh ? '体重仍在下降' : 'Still losing weight' },
      stable: { label: isZh ? '停滞不动' : 'Stable', description: isZh ? '体重不再变化' : 'Weight not changing' },
      gaining: { label: isZh ? '反弹上升' : 'Gaining', description: isZh ? '体重开始上升' : 'Weight increasing' },
    };
    return labels[trend];
  };

  // Translated diet duration labels
  const getDietDurationLabel = (duration: DietDuration) => {
    const labels: Record<DietDuration, { label: string; weeks: string }> = {
      short: { label: isZh ? '短期' : 'Short', weeks: isZh ? '1-4周' : '1-4 weeks' },
      medium: { label: isZh ? '中期' : 'Medium', weeks: isZh ? '5-12周' : '5-12 weeks' },
      long: { label: isZh ? '长期' : 'Long', weeks: isZh ? '13-24周' : '13-24 weeks' },
      very_long: { label: isZh ? '超长期' : 'Very Long', weeks: isZh ? '24周以上' : '24+ weeks' },
    };
    return labels[duration];
  };

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlWeight = searchParams.get('weight');
    const urlBodyFat = searchParams.get('bodyFat');
    const urlHeight = searchParams.get('height');
    const urlAge = searchParams.get('age');
    if (urlWeight) setWeight(urlWeight);
    if (urlBodyFat) setBodyFat(urlBodyFat);
    if (urlHeight) setHeight(urlHeight);
    if (urlAge) setAge(urlAge);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: MetabolicDamageInput = {
      heightCm: parseFloat(height),
      weightKg: parseFloat(weight),
      age: parseInt(age),
      gender,
      currentCalories: parseInt(currentCalories),
      weightTrend,
      dietDuration,
      bodyFatPercent: bodyFat ? parseFloat(bodyFat) : undefined,
    };

    const validation = validateMetabolicDamageInput(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    onCalculate(input);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          {dict.metabolicDamageTest.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '基本信息' : 'Basic Info'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">{isZh ? '身高' : 'Height'}</Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    cm
                  </span>
                </div>
                {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">{t.weight}</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    kg
                  </span>
                </div>
                {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">{isZh ? '年龄' : 'Age'}</Label>
                <div className="relative">
                  <Input
                    id="age"
                    type="number"
                    placeholder="30"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {isZh ? '岁' : 'yrs'}
                  </span>
                </div>
                {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFat">{t.bodyFat} {isZh ? '（可选）' : '(optional)'}</Label>
                <div className="relative">
                  <Input
                    id="bodyFat"
                    type="number"
                    step="0.1"
                    placeholder="15"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                {errors.bodyFat && <p className="text-xs text-destructive">{errors.bodyFat}</p>}
                <Link
                  href={`/${locale}/tools/skinfold-calculator`}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Ruler className="w-3 h-3" />
                  {isZh ? '不知道体脂率？用体脂夹测量' : "Don't know your body fat? Measure with calipers"}
                </Link>
              </div>
            </div>
          </div>

          {/* 性别选择 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '性别选择' : 'Gender'}</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                  gender === 'male'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <span className="text-3xl">👨</span>
                <span className="text-sm font-medium">{dict.common.male}</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                  gender === 'female'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <span className="text-3xl">👩</span>
                <span className="text-sm font-medium">{dict.common.female}</span>
              </button>
            </div>
          </div>

          {/* 当前热量摄入 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '当前饮食状况' : 'Current Diet'}</h3>
            <div className="p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600 mb-2">
              💡 {isZh ? '请填写你过去2-4周的平均每日热量摄入' : 'Enter your average daily calorie intake over the past 2-4 weeks'}
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">{t.currentCalories}</Label>
              <div className="relative">
                <Input
                  id="calories"
                  type="number"
                  placeholder="1500"
                  value={currentCalories}
                  onChange={(e) => setCurrentCalories(e.target.value)}
                  className="min-h-[44px] pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isZh ? '千卡/天' : 'kcal/day'}
                </span>
              </div>
              {errors.calories && <p className="text-xs text-destructive">{errors.calories}</p>}
            </div>
          </div>

          {/* 体重变化趋势 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '过去4周体重变化' : 'Weight Change (Past 4 Weeks)'}</h3>
            <div className="space-y-2">
              {weightTrends.map((trend) => (
                <button
                  key={trend}
                  type="button"
                  onClick={() => setWeightTrend(trend)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    weightTrend === trend
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{getWeightTrendLabel(trend).label}</div>
                  <div className="text-xs text-muted-foreground">
                    {getWeightTrendLabel(trend).description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 节食时长 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{t.dietDuration}</h3>
            <div className="grid grid-cols-2 gap-2">
              {dietDurations.map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() => setDietDuration(duration)}
                  className={`text-left p-3 rounded-lg border-2 transition-colors ${
                    dietDuration === duration
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{getDietDurationLabel(duration).label}</div>
                  <div className="text-xs text-muted-foreground">
                    {getDietDurationLabel(duration).weeks}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            🔍 {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 导出的组件，用 Suspense 包裹
export function MetabolicDamageForm({ onCalculate, locale, dict }: MetabolicDamageFormProps) {
  return (
    <Suspense fallback={<FormSkeleton dict={dict} />}>
      <MetabolicDamageFormInner onCalculate={onCalculate} locale={locale} dict={dict} />
    </Suspense>
  );
}

function FormSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          {dict.metabolicDamageTest.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 animate-pulse">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
