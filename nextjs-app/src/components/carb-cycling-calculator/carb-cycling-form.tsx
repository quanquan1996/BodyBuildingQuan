'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler } from 'lucide-react';
import { activityLevelLabels, type ActivityLevel } from '@/lib/utils/bmr';
import {
  validateCarbCyclingInput,
  type CarbCyclingInput,
  type CarbCyclingMode,
} from '@/lib/utils/carb-cycling';
import type { Locale, Dictionary } from '@/lib/i18n';

interface CarbCyclingFormProps {
  onCalculate: (data: CarbCyclingInput) => void;
  locale: Locale;
  dict: Dictionary;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

function CarbCyclingFormInner({ onCalculate, locale, dict }: CarbCyclingFormProps) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<CarbCyclingMode>('simple');
  const [weight, setWeight] = useState('70');
  const [bodyFat, setBodyFat] = useState('15');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = dict.carbCyclingCalculator.form;
  const isZh = locale === 'zh';

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlWeight = searchParams.get('weight');
    const urlBodyFat = searchParams.get('bodyFat');
    const urlActivity = searchParams.get('activityLevel') as ActivityLevel;
    if (urlWeight) setWeight(urlWeight);
    if (urlBodyFat) setBodyFat(urlBodyFat);
    if (urlActivity && activityLevels.includes(urlActivity)) setActivityLevel(urlActivity);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: CarbCyclingInput = {
      mode,
      weightKg: parseFloat(weight),
      bodyFatPercent: parseFloat(bodyFat),
      activityLevel,
    };

    const validation = validateCarbCyclingInput(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    onCalculate(input);
  };


  // Activity level labels with translations
  const getActivityLabel = (level: ActivityLevel) => {
    const labels: Record<ActivityLevel, { label: string; description: string }> = {
      sedentary: { label: isZh ? '久坐' : 'Sedentary', description: isZh ? '几乎不运动' : 'Little or no exercise' },
      light: { label: isZh ? '轻度活动' : 'Light', description: isZh ? '每周1-3天运动' : '1-3 days/week' },
      moderate: { label: isZh ? '中度活动' : 'Moderate', description: isZh ? '每周3-5天运动' : '3-5 days/week' },
      active: { label: isZh ? '活跃' : 'Active', description: isZh ? '每周6-7天运动' : '6-7 days/week' },
      very_active: { label: isZh ? '非常活跃' : 'Very Active', description: isZh ? '每天高强度运动' : 'Intense daily exercise' },
    };
    return labels[level];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          {dict.carbCyclingCalculator.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 模式切换 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '计算模式' : 'Calculation Mode'}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('simple')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  mode === 'simple'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{isZh ? '简易版' : 'Simple'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '高碳 / 低碳 两档' : 'High / Low carb'}</div>
              </button>
              <button
                type="button"
                onClick={() => setMode('advanced')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  mode === 'advanced'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{isZh ? '进阶版' : 'Advanced'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '高碳 / 中碳 / 低碳 三档' : 'High / Med / Low'}</div>
              </button>
            </div>
          </div>

          {/* 身体数据输入 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '身体成分' : 'Body Composition'}</h3>
            <div className="p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600 mb-2">
              💡 {isZh ? '基于 Katch-McArdle 公式，使用体脂率计算瘦体重，对健身人群更准确' : 'Based on Katch-McArdle formula, uses body fat for lean mass calculation'}
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="bodyFat">{t.bodyFat}</Label>
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


          {/* 活动水平 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{t.activityLevel}</h3>
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActivityLevel(level)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    activityLevel === level
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{getActivityLabel(level).label}</div>
                  <div className="text-xs text-muted-foreground">
                    {getActivityLabel(level).description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            🔄 {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 导出的组件，用 Suspense 包裹
export function CarbCyclingForm({ onCalculate, locale, dict }: CarbCyclingFormProps) {
  return (
    <Suspense fallback={<FormSkeleton dict={dict} />}>
      <CarbCyclingFormInner onCalculate={onCalculate} locale={locale} dict={dict} />
    </Suspense>
  );
}

function FormSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          {dict.carbCyclingCalculator.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 animate-pulse">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
