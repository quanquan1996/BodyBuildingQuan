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
  validateFatLossDietInputBasic,
  validateFatLossDietInputAdvanced,
  type FatLossDietInput,
  type FatLossDietMode,
} from '@/lib/utils/fat-loss-diet';
import { activityLevelLabels, type ActivityLevel } from '@/lib/utils/bmr';
import type { Locale, Dictionary } from '@/lib/i18n';

interface FatLossDietFormProps {
  onCalculate: (data: FatLossDietInput) => void;
  locale: Locale;
  dict: Dictionary;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

function FatLossDietFormInner({ onCalculate, locale, dict }: FatLossDietFormProps) {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<FatLossDietMode>('basic');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [age, setAge] = useState('30');
  const [bodyFat, setBodyFat] = useState('20');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('light');
  const [weeks, setWeeks] = useState('4');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = dict.fatLossDietCalculator.form;
  const isZh = locale === 'zh';

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlWeight = searchParams.get('weight');
    const urlBodyFat = searchParams.get('bodyFat');
    const urlMode = searchParams.get('mode');
    if (urlWeight) setWeight(urlWeight);
    if (urlBodyFat) {
      setBodyFat(urlBodyFat);
      setMode('advanced');
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
        weeks: parseInt(weeks),
      };
      const validation = validateFatLossDietInputBasic(input);
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
        weeks: parseInt(weeks),
      };
      const validation = validateFatLossDietInputAdvanced(input);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setErrors({});
      onCalculate(input);
    }
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
          <span className="text-2xl">🥗</span>
          {dict.fatLossDietCalculator.title}
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
                onClick={() => setMode('basic')}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  mode === 'basic'
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{isZh ? '普通计算' : 'Basic'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '适合大部分人' : 'For most people'}</div>
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
                <div className="font-medium text-sm">{isZh ? '进阶计算' : 'Advanced'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '基于体脂率' : 'Body fat based'}</div>
              </button>
            </div>
          </div>

          {/* 基础模式输入 */}
          {mode === 'basic' && (
            <>
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
            </>
          )}

          {/* 进阶模式输入 */}
          {mode === 'advanced' && (
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '身体成分' : 'Body Composition'}</h3>
              <div className="p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600 mb-2">
                💡 {isZh ? '进阶模式使用体脂率计算，对健身人群更准确' : 'Advanced mode uses body fat for more accurate results'}
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
                      placeholder="20"
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
          )}

          {/* 减脂周数 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '减脂周期' : 'Diet Duration'}</h3>
            <div className="space-y-2">
              <Label htmlFor="weeks">{isZh ? '计划周数' : 'Weeks'}</Label>
              <div className="relative">
                <Input
                  id="weeks"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="4"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  className="min-h-[44px] pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {isZh ? '周' : 'wks'}
                </span>
              </div>
              {errors.weeks && <p className="text-xs text-destructive">{errors.weeks}</p>}
              <p className="text-xs text-muted-foreground">{isZh ? '建议 4-8 周为一个减脂周期' : 'Recommended: 4-8 weeks per cycle'}</p>
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
            🥗 {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function FatLossDietForm({ onCalculate, locale, dict }: FatLossDietFormProps) {
  return (
    <Suspense fallback={<FormSkeleton dict={dict} />}>
      <FatLossDietFormInner onCalculate={onCalculate} locale={locale} dict={dict} />
    </Suspense>
  );
}

function FormSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          {dict.fatLossDietCalculator.title}
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
