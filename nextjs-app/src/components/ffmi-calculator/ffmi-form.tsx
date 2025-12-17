'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionCard } from '@/components/ui/section-card';
import { Ruler, User } from 'lucide-react';
import { validateFFMIInput, type FFMIInput } from '@/lib/utils/ffmi';
import { toolGradients } from '@/lib/config/theme';

interface FFMIFormProps {
  onCalculate: (data: FFMIInput) => void;
}

const gradient = toolGradients['ffmi-calculator'];

function FFMIFormInner({ onCalculate }: FFMIFormProps) {
  const searchParams = useSearchParams();
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('75');
  const [bodyFat, setBodyFat] = useState('15');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    <SectionCard
      title="基本信息"
      icon={<User className="w-4 h-4" />}
      iconColor={gradient.from}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 身高体重 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-xs text-muted-foreground">身高</Label>
            <div className="relative">
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder="175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="pr-10"
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
            <Label htmlFor="weight" className="text-xs text-muted-foreground">体重</Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="75"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="pr-10"
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

        {/* 体脂率 */}
        <div className="space-y-2">
          <Label htmlFor="bodyFat" className="text-xs text-muted-foreground">体脂率</Label>
          <div className="relative">
            <Input
              id="bodyFat"
              type="number"
              step="0.1"
              placeholder="15"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="pr-10"
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

        {/* 性别选择 */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">性别</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                gender === 'male'
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-input hover:border-primary/30'
              }`}
            >
              <span className="text-xl">👨</span>
              <span className="text-sm font-medium">男性</span>
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                gender === 'female'
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-input hover:border-primary/30'
              }`}
            >
              <span className="text-xl">👩</span>
              <span className="text-sm font-medium">女性</span>
            </button>
          </div>
        </div>

        <Button 
          type="submit" 
          size="lg"
          className="w-full"
          style={{
            background: `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`,
          }}
        >
          计算 FFMI 指数
        </Button>
      </form>
    </SectionCard>
  );
}

export function FFMIForm({ onCalculate }: FFMIFormProps) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <FFMIFormInner onCalculate={onCalculate} />
    </Suspense>
  );
}

function FormSkeleton() {
  return (
    <SectionCard
      title="基本信息"
      icon={<User className="w-4 h-4" />}
      iconColor={gradient.from}
    >
      <div className="space-y-5 animate-pulse">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 bg-input rounded-xl" />
          <div className="h-11 bg-input rounded-xl" />
        </div>
        <div className="h-11 bg-input rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 bg-input rounded-xl" />
          <div className="h-14 bg-input rounded-xl" />
        </div>
        <div className="h-12 bg-input rounded-xl" />
      </div>
    </SectionCard>
  );
}
