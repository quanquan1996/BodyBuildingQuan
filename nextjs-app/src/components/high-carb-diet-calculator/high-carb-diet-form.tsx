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
  validateHighCarbDietInput,
  type HighCarbDietInput,
  type DeficitLevel,
  type RefeedFrequency,
} from '@/lib/utils/high-carb-diet';

interface HighCarbDietFormProps {
  onCalculate: (data: HighCarbDietInput) => void;
}

const activityLevels: ActivityLevel[] = ['sedentary', 'light', 'moderate', 'active', 'very_active'];

const deficitLabels: Record<DeficitLevel, { label: string; desc: string }> = {
  conservative: { label: '保守', desc: '-300 kcal，慢速减脂' },
  standard: { label: '标准', desc: '-500 kcal，推荐' },
  aggressive: { label: '激进', desc: '-700 kcal，快速减脂' },
};

const refeedLabels: Record<RefeedFrequency, { label: string; desc: string }> = {
  weekly: { label: '每周1次', desc: '适合体脂较低者' },
  biweekly: { label: '每2周1次', desc: '适合体脂较高者' },
  none: { label: '不需要', desc: '短期减脂可不设' },
};


function HighCarbDietFormInner({ onCalculate }: HighCarbDietFormProps) {
  const searchParams = useSearchParams();
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [bodyFat, setBodyFat] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [deficitLevel, setDeficitLevel] = useState<DeficitLevel>('standard');
  const [trainingDays, setTrainingDays] = useState(4);
  const [refeedFrequency, setRefeedFrequency] = useState<RefeedFrequency>('weekly');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const input: HighCarbDietInput = {
      weightKg: parseFloat(weight),
      heightCm: parseFloat(height),
      age: parseInt(age),
      gender,
      bodyFatPercent: bodyFat ? parseFloat(bodyFat) : undefined,
      activityLevel,
      deficitLevel,
      trainingDaysPerWeek: trainingDays,
      refeedFrequency,
    };

    const validation = validateHighCarbDietInput(input);
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
          <span className="text-2xl">🍚</span>
          高碳减脂计算
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基础信息 */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">基础信息</h3>
            <div className="grid grid-cols-2 gap-4">
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
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">kg</span>
                </div>
                {errors.weight && <p className="text-xs text-destructive">{errors.weight}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">身高</Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">cm</span>
                </div>
                {errors.height && <p className="text-xs text-destructive">{errors.height}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">年龄</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="min-h-[44px]"
                />
                {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
              </div>
              <div className="space-y-2">
                <Label>性别</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                      gender === 'male' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    男
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex-1 p-2 rounded-lg border-2 transition-colors ${
                      gender === 'female' ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                    }`}
                  >
                    女
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* 体脂率（可选） */}
          <div className="space-y-2">
            <Label htmlFor="bodyFat">体脂率（可选，更精准）</Label>
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
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
                  <div className="text-xs text-muted-foreground">{activityLevelLabels[level].description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 减脂强度 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">减脂强度</h3>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(deficitLabels) as DeficitLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDeficitLevel(level)}
                  className={`p-3 rounded-lg border-2 transition-colors text-center ${
                    deficitLevel === level
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{deficitLabels[level].label}</div>
                  <div className="text-xs text-muted-foreground">{deficitLabels[level].desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 每周训练天数 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">每周训练天数</h3>
            <div className="grid grid-cols-4 gap-2">
              {[3, 4, 5, 6].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setTrainingDays(days)}
                  className={`p-3 rounded-lg border-2 transition-colors text-center ${
                    trainingDays === days
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-bold text-lg">{days}</div>
                  <div className="text-xs text-muted-foreground">天</div>
                </button>
              ))}
            </div>
          </div>

          {/* 再喂日频率 */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground">再喂日频率</h3>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(refeedLabels) as RefeedFrequency[]).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setRefeedFrequency(freq)}
                  className={`p-3 rounded-lg border-2 transition-colors text-center ${
                    refeedFrequency === freq
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{refeedLabels[freq].label}</div>
                  <div className="text-xs text-muted-foreground">{refeedLabels[freq].desc}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              💡 再喂日用于恢复瘦素和甲状腺激素，打破减脂平台期
            </p>
          </div>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            🍚 计算高碳减脂方案
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function HighCarbDietForm({ onCalculate }: HighCarbDietFormProps) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <HighCarbDietFormInner onCalculate={onCalculate} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🍚</span>
          高碳减脂计算
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
