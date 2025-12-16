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

interface FatLossDietFormProps {
  onCalculate: (data: FatLossDietInput) => void;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

function FatLossDietFormInner({ onCalculate }: FatLossDietFormProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          减脂饮食计算
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 模式切换 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">计算模式</h3>
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
                <div className="font-medium text-sm">普通计算</div>
                <div className="text-xs text-muted-foreground">适合大部分人</div>
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
                <div className="font-medium text-sm">进阶计算</div>
                <div className="text-xs text-muted-foreground">基于体脂率</div>
              </button>
            </div>
          </div>

          {/* 基础模式输入 */}
          {mode === 'basic' && (
            <>
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">基本信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">身高</Label>
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
                    <Label htmlFor="weight">体重</Label>
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
              </div>

              {/* 性别选择 */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground">性别选择</h3>
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
                    <span className="text-sm font-medium">男性</span>
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
                    <span className="text-sm font-medium">女性</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 进阶模式输入 */}
          {mode === 'advanced' && (
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-muted-foreground">身体成分</h3>
              <div className="p-3 bg-blue-500/10 rounded-lg text-sm text-blue-600 mb-2">
                💡 进阶模式使用体脂率计算，对健身人群更准确
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-adv">体重</Label>
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
                  <Label htmlFor="bodyFat">体脂率</Label>
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
                    href="/tools/skinfold-calculator"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <Ruler className="w-3 h-3" />
                    不知道体脂率？用体脂夹测量
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 减脂周数 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">减脂周期</h3>
            <div className="space-y-2">
              <Label htmlFor="weeks">计划周数</Label>
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
                  周
                </span>
              </div>
              {errors.weeks && <p className="text-xs text-destructive">{errors.weeks}</p>}
              <p className="text-xs text-muted-foreground">建议 4-8 周为一个减脂周期</p>
            </div>
          </div>

          {/* 活动水平 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">活动水平</h3>
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
                  <div className="font-medium text-sm">{activityLevelLabels[level].label}</div>
                  <div className="text-xs text-muted-foreground">
                    {activityLevelLabels[level].description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            🥗 生成减脂饮食计划
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function FatLossDietForm({ onCalculate }: FatLossDietFormProps) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <FatLossDietFormInner onCalculate={onCalculate} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🥗</span>
          减脂饮食计算
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
