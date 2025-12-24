'use client';

import type { Dictionary } from '@/lib/i18n';

interface MuscleExplanationProps {
  dict: Dictionary;
}

export function MuscleExplanation({ dict }: MuscleExplanationProps) {
  const { explanation } = dict.muscleAnatomy;

  return (
    <section 
      className="rounded-2xl p-6 md:p-8"
      style={{ background: '#F9FAFB' }}
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-6">
        {explanation.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 什么是肌肉解剖学 */}
        <div>
          <h3 className="font-medium text-lg mb-3">
            {explanation.whatIs}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {explanation.whatIsContent}
          </p>
        </div>

        {/* 学习肌肉解剖的好处 */}
        <div>
          <h3 className="font-medium text-lg mb-3">
            {explanation.benefits}
          </h3>
          <ul className="space-y-2">
            {explanation.benefitsList.map((benefit, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span 
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #5AC57A 0%, #4CAF50 100%)' }}
                >
                  {index + 1}
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
