'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler } from 'lucide-react';
import { validateFFMIInput, type FFMIInput } from '@/lib/utils/ffmi';

interface FFMIFormProps {
  onCalculate: (data: FFMIInput) => void;
}

// 内部表单组件，使用 useSearchParams
function FFMIFormInner({ onCalculate }: FFMIFormProps) {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('75');
  const [bodyFat, setBodyFat] = useState('15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 从 URL 参数读取预填数据
  useEffect(() => {
    const urlHeight = searchParams.get('height');
    const urlWeight = searchParams.get('weight');
    const urlBodyFat = searchParams.get('bodyFat');
    if (urlHeight) setHeight(urlHeight);
    if (urlWeight) setWeight(urlWeight);
    if (urlBodyFat) setBodyFat(urlBodyFat);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const input = {
      heightCm: parseFloat(height),
      weightKg: parseFloat(weight),
      bodyFatPercent: parseFloat(bodyFat),
    };

    const validation = validateFFMIInput(input);
    
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
          <span className="text-2xl">📊</span>
          身体参数设置
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
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
                    placeholder="175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    cm
                  </span>
                </div>
                {errors.height && (
                  <p className="text-xs text-destructive">{errors.height}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">体重</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="75"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="min-h-[44px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    kg
                  </span>
                </div>
                {errors.weight && (
                  <p className="text-xs text-destructive">{errors.weight}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat">体脂率</Label>
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
                {errors.bodyFat && (
                  <p className="text-xs text-destructive">{errors.bodyFat}</p>
                )}
                <Link
                  href="/tools/skinfold-calculator"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Ruler className="w-3 h-3" />
                  不知道体脂率？用体脂夹测量
                </Link>
              </div>

              <div className="space-y-2">
                <Label>年龄（可选）</Label>
                <Input
                  type="number"
                  placeholder="30"
                  className="min-h-[44px]"
                />
              </div>
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

          <Button type="submit" className="w-full min-h-[48px] text-base">
            🔢 计算 FFMI 指数
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


// 导出的组件，用 Suspense 包裹
export function FFMIForm({ onCalculate }: FFMIFormProps) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <FFMIFormInner onCalculate={onCalculate} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          身体参数设置
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
