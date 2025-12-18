'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateGrecianInput, type GrecianIdealInput } from '@/lib/utils/grecian-ideal';
import type { Locale, Dictionary } from '@/lib/i18n';

interface GrecianFormProps {
  onCalculate: (data: GrecianIdealInput) => void;
  locale: Locale;
  dict: Dictionary;
}

export function GrecianForm({ onCalculate, locale, dict }: GrecianFormProps) {
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
  const t = dict.grecianCalculator.form;
  const isZh = locale === 'zh';

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
    { key: 'heightCm', label: isZh ? '身高 (cm)' : 'Height (cm)', placeholder: '175' },
    { key: 'wristCm', label: `${t.wrist} (cm)`, placeholder: '17' },
    { key: 'shoulderCm', label: isZh ? '肩围 (cm)' : 'Shoulders (cm)', placeholder: '120' },
    { key: 'chestCm', label: `${t.chest} (cm)`, placeholder: '100' },
    { key: 'waistCm', label: `${t.waist} (cm)`, placeholder: '80' },
    { key: 'hipCm', label: `${t.hips} (cm)`, placeholder: '95' },
    { key: 'neckCm', label: `${t.neck} (cm)`, placeholder: '38' },
    { key: 'bicepCm', label: `${t.biceps} (cm)`, placeholder: '35' },
    { key: 'forearmCm', label: `${t.forearm} (cm)`, placeholder: '30' },
    { key: 'thighCm', label: `${t.thigh} (cm)`, placeholder: '55' },
    { key: 'calfCm', label: `${t.calf} (cm)`, placeholder: '38' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isZh ? '输入你的身体围度' : 'Enter Your Body Measurements'}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {isZh ? '手腕围度是计算理想比例的基准，请准确测量' : 'Wrist circumference is the baseline for calculating ideal proportions'}
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
            {t.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
