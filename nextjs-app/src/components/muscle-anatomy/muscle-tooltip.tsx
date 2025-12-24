'use client';

import { getMuscleById } from '@/lib/data/muscles';
import { muscleAnatomy as zhMuscleAnatomy } from '@/lib/i18n/locales/zh/muscle-anatomy';
import { muscleAnatomy as enMuscleAnatomy } from '@/lib/i18n/locales/en/muscle-anatomy';
import type { Locale, Dictionary } from '@/lib/i18n';

interface MuscleTooltipProps {
  muscleId: string | null;
  locale: Locale;
  dict: Dictionary;
}

// 从翻译字典获取肌肉名称（中英文）
function getMuscleName(muscleId: string, locale: Locale): { primary: string; secondary: string } {
  const zhName = zhMuscleAnatomy.muscles[muscleId as keyof typeof zhMuscleAnatomy.muscles];
  const enName = enMuscleAnatomy.muscles[muscleId as keyof typeof enMuscleAnatomy.muscles];
  
  // 如果两种语言都有翻译
  if (zhName && enName) {
    return {
      primary: locale === 'zh' ? zhName : enName,
      secondary: locale === 'zh' ? enName : zhName,
    };
  }
  
  // 如果只有一种语言有翻译
  if (zhName || enName) {
    const name = zhName || enName;
    return {
      primary: name,
      secondary: '',
    };
  }
  
  // 如果没有翻译，从 ID 生成可读名称
  const fallbackName = muscleId
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    primary: fallbackName,
    secondary: '',
  };
}

export function MuscleTooltip({ muscleId, locale, dict }: MuscleTooltipProps) {
  if (!muscleId) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        {dict.muscleAnatomy.clickToView}
      </div>
    );
  }

  const muscle = getMuscleById(muscleId);
  const { primary, secondary } = getMuscleName(muscleId, locale);
  
  // 获取分组信息
  const group = muscle?.group || 'torso';

  return (
    <div className="text-center py-4">
      <div className="text-xs text-muted-foreground mb-1">
        {dict.muscleAnatomy.selectedMuscle}
      </div>
      <div className="text-xl font-semibold text-primary">
        {primary}
      </div>
      {secondary && (
        <div className="text-sm text-muted-foreground mt-1">
          {secondary}
        </div>
      )}
      <div className="mt-2">
        <span 
          className="inline-block px-2 py-0.5 rounded-full text-xs"
          style={{
            background: group === 'upper' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : group === 'torso'
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
          }}
        >
          {dict.muscleAnatomy.muscleGroups[group]}
        </span>
      </div>
    </div>
  );
}
