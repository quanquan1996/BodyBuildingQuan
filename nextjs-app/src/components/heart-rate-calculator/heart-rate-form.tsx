'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateHeartRateInput, type HeartRateInput } from '@/lib/utils/heart-rate';

interface HeartRateFormProps {
  onCalculate: (data: HeartRateInput) => void;
}

function HeartRateFormInner({ onCalculate }: HeartRateFormProps) {
  const searchParams = useSearchParams();
  const [age, setAge] = useState('30');
  const [restingHR, setRestingHR] = useState('');
  const [useKarvonen, setUseKarvonen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          心率区间计算
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 计算模式 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">计算模式</h3>
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
                <div className="font-medium text-sm">标准计算</div>
                <div className="text-xs text-muted-foreground">最大心率百分比</div>
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
                <div className="font-medium text-sm">进阶计算</div>
                <div className="text-xs text-muted-foreground">Karvonen 公式</div>
              </button>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">基本信息</h3>
            <div className="space-y-2">
              <Label htmlFor="age">年龄</Label>
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
                  岁
                </span>
              </div>
              {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
            </div>

            {useKarvonen && (
              <div className="space-y-2">
                <Label htmlFor="restingHR">静息心率</Label>
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
                  💡 早晨醒来后静躺测量的心率最准确
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            ❤️ 计算心率区间
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// 导出的组件，用 Suspense 包裹
export function HeartRateForm({ onCalculate }: HeartRateFormProps) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <HeartRateFormInner onCalculate={onCalculate} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          心率区间计算
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
