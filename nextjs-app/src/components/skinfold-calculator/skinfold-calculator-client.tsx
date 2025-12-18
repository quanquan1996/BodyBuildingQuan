'use client';

import { useState } from 'react';
import { SkinfoldForm } from './skinfold-form';
import { SkinfoldResult } from './skinfold-result';
import { SkinfoldReference } from './skinfold-reference';
import { SkinfoldGuide } from './skinfold-guide';
import { SkinfoldExplanation } from './skinfold-explanation';
import { ToolHero } from '@/components/common/tool-hero';
import { RelatedTools } from '@/components/common/related-tools';
import { type Locale, type Dictionary } from '@/lib/i18n';
import { type SkinfoldOutput } from '@/lib/utils/skinfold';

interface SkinfoldCalculatorClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function SkinfoldCalculatorClient({ locale, dict }: SkinfoldCalculatorClientProps) {
  const [result, setResult] = useState<SkinfoldOutput | null>(null);
  const [inputWeight, setInputWeight] = useState<number>(70);
  const [inputHeight, setInputHeight] = useState<number>(170);

  const handleCalculate = (output: SkinfoldOutput, weight: number, height: number) => {
    setResult(output);
    setInputWeight(weight);
    setInputHeight(height);
  };

  return (
    <div className="container py-6 md:py-10 px-4 md:px-6">
      <ToolHero
        toolId="skinfold-calculator"
        title={dict.skinfoldCalculator.title}
        description={dict.skinfoldCalculator.description}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <SkinfoldForm onCalculate={handleCalculate} locale={locale} dict={dict} />
          {result && (
            <SkinfoldResult
              result={result}
              weight={inputWeight}
              height={inputHeight}
              locale={locale}
              dict={dict}
            />
          )}
        </div>
        <div className="space-y-5">
          <SkinfoldReference dict={dict} />
          <SkinfoldGuide dict={dict} />
        </div>
      </div>

      <div className="mt-8">
        <SkinfoldExplanation dict={dict} />
      </div>

      <RelatedTools currentToolId="skinfold-calculator" locale={locale} dict={dict} />
    </div>
  );
}
