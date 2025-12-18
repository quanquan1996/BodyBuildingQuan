'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateHeartRateInput, type HeartRateInput } from '@/lib/utils/heart-rate';
import type { Locale, Dictionary } from '@/lib/i18n';

interface HeartRateFormProps {
  onCalculate: (data: HeartRateInput) => void;
  locale: Locale;
  dict: Dictionary;
}

function HeartRateFormInner({ onCalculate, locale, dict }: HeartRateFormProps) {
  const searchParams = useSearchParams();
  const [age, setAge] = useState('30');
  const [restingHR, setRestingHR] = useState('');
  const [useKarvonen, setUseKarvonen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = dict.heartRateCalculator.form;
  const isZh = locale === 'zh';

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlAge = searchParams.get('age');
    if (urlAge) setAge(urlAge);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const input: HeartRateInput = {
      age: parseInt(age),
      restingHR: useKarvonen && restingHR ? parseInt(restingHR) : undefined,
    };

    const validation = validateHeartRateInput(input);
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
          <span className="text-2xl">❤️</span>
          {dict.heartRateCalculator.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 计算模式 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '计算模式' : 'Calculation Mode'}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUseKarvonen(false)}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  !useKarvonen
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{isZh ? '标准计算' : 'Standard'}</div>
                <div className="text-xs text-muted-foreground">{isZh ? '最大心率百分比' : 'Max HR %'}</div>
              </button>
              <button
                type="button"
                onClick={() => setUseKarvonen(true)}
                className={`flex-1 p-3 rounded-lg border-2 transition-colors text-center ${
                  useKarvonen
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                <div className="font-medium text-sm">{isZh ? '进阶计算' : 'Advanced'}</div>
                <div className="text-xs text-muted-foreground">Karvonen</div>
              </button>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">{isZh ? '基本信息' : 'Basic Info'}</h3>
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
                  {isZh ? '岁' : 'yrs'}
                </span>
              </div>
              {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
            </div>

            {useKarvonen && (
              <div className="space-y-2">
                <Label htmlFor="restingHR">{t.restingHR}</Label>
                <div className="relative">
                  <Input
                    id="restingHR"
                    type="number"
                    placeholder="60"
                    value={restingHR}
                    onChange={(e) => setRestingHR(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    bpm
                  </span>
                </div>
                {errors.restingHR && <p className="text-xs text-destructive">{errors.restingHR}</p>}
                <p className="text-xs text-muted-foreground">
                  💡 {isZh ? '早晨醒来后静躺测量的心率最准确' : 'Measure resting HR in the morning for best accuracy'}
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            ❤️ {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 导出的组件，用 Suspense 包裹
export function HeartRateForm({ onCalculate, locale, dict }: HeartRateFormProps) {
  return (
    <Suspense fallback={<FormSkeleton dict={dict} />}>
      <HeartRateFormInner onCalculate={onCalculate} locale={locale} dict={dict} />
    </Suspense>
  );
}

function FormSkeleton({ dict }: { dict: Dictionary }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          {dict.heartRateCalculator.title}
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
