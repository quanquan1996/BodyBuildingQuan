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
  validateBMRInputBasic,
  validateBMRInputAdvanced,
  activityLevelLabels,
  type BMRInput,
  type ActivityLevel,
  type CalculationMode,
} from '@/lib/utils/bmr';
import type { Locale, Dictionary } from '@/lib/i18n';

interface BMRFormProps {
  onCalculate: (data: BMRInput) => void;
  locale: Locale;
  dict: Dictionary;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

function BMRFormInner({ onCalculate, locale, dict }: BMRFormProps) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<CalculationMode>('basic');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [age, setAge] = useState('30');
  const [bodyFat, setBodyFat] = useState('15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = dict.bmrCalculator.form;
  const c = dict.common;

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlWeight = searchParams.get('weight');
    const urlBodyFat = searchParams.get('bodyFat');
    const urlMode = searchParams.get('mode');
    if (urlWeight) setWeight(urlWeight);
    if (urlBodyFat) {
      setBodyFat(urlBodyFat);
      setMode('advanced'); // 有体脂参数时自动切换到进阶模式
    }
    if (urlMode === 'advanced') setMode('advanced');
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'basic') {
      const input = {
        mode: 'basic' as const,
        heightCm: parseFloat(height),
        weightKg: parseFloat(weight),
        age: parseInt(age),
        gender,
        activityLevel,
      };
      const validation = validateBMRInputBasic(input);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setErrors({});
      onCalculate(input);
    } else {
      const input = {
        mode: 'advanced' as const,
        weightKg: parseFloat(weight),
        bodyFatPercent: parseFloat(bodyFat),
        activityLevel,
      };
      const validation = validateBMRInputAdvanced(input);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setErrors({});
      onCalculate(input);
    }
  };

  // Activity level labels from common translations
  const getActivityLabel = (level: ActivityLevel) => {
    const levelMap: Record<ActivityLevel, keyof typeof c.activityLevels> = {
      sedentary: 'sedentary',
      light: 'light',
      moderate: 'moderate',
      active: 'active',
      very_active: 'veryActive',
    };
    return c.activityLevels[levelMap[level]];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          {dict.bmrCalculator.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 模式切换 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{c.calculationMode}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('basic')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  mode === 'basic'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{c.basicMode}</div>
                <div className="text-xs text-muted-foreground">Mifflin-St Jeor</div>
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
                <div className="font-medium text-sm">{c.advancedMode}</div>
                <div className="text-xs text-muted-foreground">Katch-McArdle</div>
              </button>
            </div>
          </div>

          {/* 基础模式输入 */}
          {mode === 'basic' && (
            <>
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">{t.basicInfo}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">{t.height}</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="age">{t.age}</Label>
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
                      {c.ageUnit}
                    </span>
                  </div>
                  {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
                </div>
              </div>

              {/* 性别选择 */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">{t.gender}</h3>
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
            </>
          )}

          {/* 进阶模式输入 */}
          {mode === 'advanced' && (
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">{c.bodyComposition}</h3>
              <div className="p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600 mb-2">
                💡 {c.advancedModeHint}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-adv">{t.weight}</Label>
                  <div className="relative">
                    <Input
                      id="weight-adv"
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
                    {c.bodyFatHint}
                  </Link>
                </div>
              </div>
            </div>
          )}

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
            🔥 {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 导出的组件，用 Suspense 包裹
export function BMRForm({ onCalculate, locale, dict }: BMRFormProps) {
  return (
    <Suspense fallback={<FormSkeleton dict={dict} />}>
      <BMRFormInner onCalculate={onCalculate} locale={locale} dict={dict} />
    </Suspense>
  );
}

function FormSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          {dict.bmrCalculator.title}
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
