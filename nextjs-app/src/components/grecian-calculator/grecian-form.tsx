'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateGrecianInput, type GrecianIdealInput } from '@/lib/utils/grecian-ideal';

interface GrecianFormProps {
  onCalculate: (data: GrecianIdealInput) => void;
}

export function GrecianForm({ onCalculate }: GrecianFormProps) {
  const [formData, setFormData] = useState<Partial<GrecianIdealInput>>({
    heightCm: 175,
    wristCm: 17,
    chestCm: 100,
    waistCm: 80,
    hipCm: 95,
    shoulderCm: 120,
    neckCm: 38,
    bicepCm: 35,
    forearmCm: 30,
    thighCm: 55,
    calfCm: 38,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GrecianIdealInput, string>>>({});

  const handleChange = (field: keyof GrecianIdealInput, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateGrecianInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    onCalculate(formData as GrecianIdealInput);
  };

  const inputFields: { key: keyof GrecianIdealInput; label: string; placeholder: string }[] = [
    { key: 'heightCm', label: '身高 (cm)', placeholder: '175' },
    { key: 'wristCm', label: '手腕围度 (cm)', placeholder: '17' },
    { key: 'shoulderCm', label: '肩围 (cm)', placeholder: '120' },
    { key: 'chestCm', label: '胸围 (cm)', placeholder: '100' },
    { key: 'waistCm', label: '腰围 (cm)', placeholder: '80' },
    { key: 'hipCm', label: '臀围 (cm)', placeholder: '95' },
    { key: 'neckCm', label: '颈围 (cm)', placeholder: '38' },
    { key: 'bicepCm', label: '上臂围 (cm)', placeholder: '35' },
    { key: 'forearmCm', label: '前臂围 (cm)', placeholder: '30' },
    { key: 'thighCm', label: '大腿围 (cm)', placeholder: '55' },
    { key: 'calfCm', label: '小腿围 (cm)', placeholder: '38' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>输入你的身体围度</CardTitle>
        <p className="text-sm text-muted-foreground">
          手腕围度是计算理想比例的基准，请准确测量
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {inputFields.map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  type="number"
                  step="0.1"
                  placeholder={placeholder}
                  value={formData[key] || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className={errors[key] ? 'border-destructive' : ''}
                />
                {errors[key] && (
                  <p className="text-xs text-destructive">{errors[key]}</p>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">
            计算古典比例
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
