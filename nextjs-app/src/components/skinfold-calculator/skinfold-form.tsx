'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  type Gender,
  type MeasurementMode,
  type SimpleSkinfoldInput,
  type PreciseSkinfoldInput,
  type SkinfoldOutput,
  calculateSimpleSkinfold,
  calculatePreciseSkinfold,
  measurementSites,
  validateSkinfoldInput,
} from '@/lib/utils/skinfold';

interface SkinfoldFormProps {
  onCalculate: (result: SkinfoldOutput, weight: number, height: number) => void;
}

export function SkinfoldForm({ onCalculate }: SkinfoldFormProps) {
  const [mode, setMode] = useState<MeasurementMode>('simple');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 简易模式数据
  const [site1, setSite1] = useState('');
  const [site2, setSite2] = useState('');
  const [site3, setSite3] = useState('');

  // 精确模式数据
  const [chest, setChest] = useState('');
  const [midaxillary, setMidaxillary] = useState('');
  const [triceps, setTriceps] = useState('');
  const [subscapular, setSubscapular] = useState('');
  const [abdominal, setAbdominal] = useState('');
  const [suprailiac, setSuprailiac] = useState('');
  const [thigh, setThigh] = useState('');

  // 简易模式的测量部位根据性别不同
  const simpleSites = gender === 'male' 
    ? [
        { key: 'site1', ...measurementSites.chest, value: site1, setter: setSite1 },
        { key: 'site2', ...measurementSites.abdominal, value: site2, setter: setSite2 },
        { key: 'site3', ...measurementSites.thigh, value: site3, setter: setSite3 },
      ]
    : [
        { key: 'site1', ...measurementSites.triceps, value: site1, setter: setSite1 },
        { key: 'site2', ...measurementSites.suprailiac, value: site2, setter: setSite2 },
        { key: 'site3', ...measurementSites.thigh, value: site3, setter: setSite3 },
      ];

  const preciseSites = [
    { key: 'chest', ...measurementSites.chest, value: chest, setter: setChest },
    { key: 'midaxillary', ...measurementSites.midaxillary, value: midaxillary, setter: setMidaxillary },
    { key: 'triceps', ...measurementSites.triceps, value: triceps, setter: setTriceps },
    { key: 'subscapular', ...measurementSites.subscapular, value: subscapular, setter: setSubscapular },
    { key: 'abdominal', ...measurementSites.abdominal, value: abdominal, setter: setAbdominal },
    { key: 'suprailiac', ...measurementSites.suprailiac, value: suprailiac, setter: setSuprailiac },
    { key: 'thigh', ...measurementSites.thigh, value: thigh, setter: setThigh },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const weightKg = parseFloat(weight);
    const ageNum = parseFloat(age);

    if (mode === 'simple') {
      const values = {
        age: ageNum,
        weight: weightKg,
        site1: parseFloat(site1),
        site2: parseFloat(site2),
        site3: parseFloat(site3),
      };

      const validation = validateSkinfoldInput(values, ['age', 'weight', 'site1', 'site2', 'site3']);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      const input: SimpleSkinfoldInput = {
        gender,
        age: ageNum,
        site1: values.site1,
        site2: values.site2,
        site3: values.site3,
      };

      setErrors({});
      onCalculate(calculateSimpleSkinfold(input, weightKg), weightKg, parseFloat(height));
    } else {
      const values = {
        age: ageNum,
        weight: weightKg,
        chest: parseFloat(chest),
        midaxillary: parseFloat(midaxillary),
        triceps: parseFloat(triceps),
        subscapular: parseFloat(subscapular),
        abdominal: parseFloat(abdominal),
        suprailiac: parseFloat(suprailiac),
        thigh: parseFloat(thigh),
      };

      const validation = validateSkinfoldInput(values, [
        'age', 'weight', 'chest', 'midaxillary', 'triceps', 
        'subscapular', 'abdominal', 'suprailiac', 'thigh'
      ]);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      const input: PreciseSkinfoldInput = {
        gender,
        age: ageNum,
        chest: values.chest,
        midaxillary: values.midaxillary,
        triceps: values.triceps,
        subscapular: values.subscapular,
        abdominal: values.abdominal,
        suprailiac: values.suprailiac,
        thigh: values.thigh,
      };

      setErrors({});
      onCalculate(calculatePreciseSkinfold(input, weightKg), weightKg, parseFloat(height));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📏</span>
          皮褶厚度测量
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 快速测量指南 */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
              <span>📋</span> 测量前必读
            </h4>
            <ol className="text-sm text-muted-foreground space-y-1.5 list-decimal list-inside">
              <li>用<strong className="text-foreground">拇指和食指</strong>捏起皮肤和皮下脂肪</li>
              <li>在捏起部位<strong className="text-foreground">旁边 1cm 处</strong>夹住体脂夹</li>
              <li>等待 <strong className="text-foreground">2-3 秒</strong>后读取数值</li>
              <li>每个部位测量 <strong className="text-foreground">2-3 次取平均值</strong></li>
            </ol>
          </div>

          {/* 性别选择 */}
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">性别选择</Label>
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

          {/* 基本信息 */}
          <div className="grid grid-cols-3 gap-4">
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

          {/* 测量模式选择 */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as MeasurementMode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple">简易模式 (3点)</TabsTrigger>
              <TabsTrigger value="precise">精确模式 (7点)</TabsTrigger>
            </TabsList>

            <TabsContent value="simple" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                {gender === 'male' 
                  ? '男性3点测量：胸部、腹部、大腿'
                  : '女性3点测量：三头肌、髂骨上、大腿'}
              </p>
              {simpleSites.map((site) => (
                <SiteInput
                  key={site.key}
                  site={site}
                  error={errors[site.key]}
                />
              ))}
            </TabsContent>

            <TabsContent value="precise" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                7点测量法提供更精确的体脂率估算
              </p>
              <div className="grid gap-4">
                {preciseSites.map((site) => (
                  <SiteInput
                    key={site.key}
                    site={site}
                    error={errors[site.key]}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button type="submit" className="w-full min-h-[48px] text-base">
            📊 计算体脂率
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface SiteInputProps {
  site: {
    key: string;
    name: string;
    emoji: string;
    description: string;
    tips: string;
    value: string;
    setter: (v: string) => void;
  };
  error?: string;
}

function SiteInput({ site, error }: SiteInputProps) {
  return (
    <div className="space-y-2 p-3 rounded-lg border bg-muted/30">
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-2">
          <span>{site.emoji}</span>
          <span className="font-medium">{site.name}</span>
        </Label>
      </div>
      
      {/* 测量方法始终显示 */}
      <div className="text-xs text-muted-foreground bg-background/80 p-2 rounded border-l-2 border-primary/50">
        <p className="font-medium text-foreground/80 mb-1">📍 测量位置</p>
        <p>{site.description}</p>
        <p className="mt-1.5 text-primary">💡 {site.tips}</p>
      </div>
      
      <div className="relative">
        <Input
          type="number"
          step="0.1"
          placeholder="输入测量值"
          value={site.value}
          onChange={(e) => site.setter(e.target.value)}
          className="min-h-[44px] pr-12"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          mm
        </span>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
