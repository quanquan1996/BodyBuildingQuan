'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell } from 'lucide-react';
import type { Locale, Dictionary } from '@/lib/i18n';

interface MuscleDetailPanelProps {
  muscleId: string | null;
  locale: Locale;
  dict: Dictionary;
  compact?: boolean; // 紧凑模式，用于移动端
}

export function MuscleDetailPanel({ muscleId, locale, dict, compact = false }: MuscleDetailPanelProps) {
  // 获取肌肉详情数据
  const getMuscleDetail = (id: string) => {
    const details = dict.muscleAnatomy.muscleDetails;
    if (details && details[id]) {
      return details[id];
    }
    return null;
  };

  // 获取肌肉名称
  const getMuscleName = (id: string) => {
    const muscles = dict.muscleAnatomy.muscles;
    return muscles[id] || id;
  };

  if (!muscleId) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">👆</div>
        <p className="text-muted-foreground">
          {dict.muscleAnatomy.clickToView}
        </p>
      </div>
    );
  }

  const muscleName = getMuscleName(muscleId);
  const muscleDetail = getMuscleDetail(muscleId);
  const hasStrengthening = muscleDetail?.strengthening;

  return (
    <div className="space-y-4">
      {/* 肌肉名称标题 - 非紧凑模式才显示 */}
      {!compact && (
        <div className="text-center pb-2 border-b">
          <h2 className="text-lg font-semibold text-primary">
            {muscleName}
          </h2>
          {locale === 'zh' && dict.muscleAnatomy.muscles[muscleId] && (
            <p className="text-sm text-muted-foreground mt-1">
              {/* 显示英文名称作为副标题 */}
              {muscleId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          )}
        </div>
      )}

      {/* 英文名称 - 紧凑模式不再显示，由父组件 Sheet 处理 */}

      {/* 动态 Tab 数量：有补弱数据显示4个，否则3个，都是单行布局 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList
          className={`grid w-full gap-0.5 ${hasStrengthening ? 'grid-cols-4' : 'grid-cols-3'}`}
        >
          <TabsTrigger value="overview" className="text-xs px-2 py-1.5">
            {dict.muscleAnatomy.detailPanel.tabs.overview}
          </TabsTrigger>
          <TabsTrigger value="functions" className="text-xs px-2 py-1.5">
            {dict.muscleAnatomy.detailPanel.tabs.functions}
          </TabsTrigger>
          <TabsTrigger value="exercises" className="text-xs px-2 py-1.5">
            {dict.muscleAnatomy.detailPanel.tabs.exercises}
          </TabsTrigger>
          {hasStrengthening && (
            <TabsTrigger value="strengthening" className="text-xs px-2 py-1.5">
              {dict.muscleAnatomy.detailPanel.tabs.strengthening}
            </TabsTrigger>
          )}
        </TabsList>

        {/* 简介 Tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="space-y-3">
            {muscleDetail?.description ? (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {muscleDetail.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                {dict.muscleAnatomy.detailPanel.placeholder}
              </p>
            )}
          </div>
        </TabsContent>

        {/* 功能 Tab */}
        <TabsContent value="functions" className="mt-4">
          {muscleDetail?.functions && muscleDetail.functions.length > 0 ? (
            <ol className="space-y-2">
              {muscleDetail.functions.map((func, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{func}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              {dict.muscleAnatomy.detailPanel.placeholder}
            </p>
          )}
        </TabsContent>

        {/* 训练动作 Tab */}
        <TabsContent value="exercises" className="mt-4">
          {muscleDetail?.exercises && muscleDetail.exercises.length > 0 ? (
            <ul className="space-y-2">
              {muscleDetail.exercises.map((exercise, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Dumbbell className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{exercise}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              {dict.muscleAnatomy.detailPanel.placeholder}
            </p>
          )}
        </TabsContent>

        {/* 补弱策略 Tab */}
        {hasStrengthening && muscleDetail?.strengthening && (
          <TabsContent value="strengthening" className="mt-4">
            <div className="space-y-4">
              {/* 策略描述 */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <span className="text-amber-500">💡</span>
                  {dict.muscleAnatomy.detailPanel.strengthening?.strategyTitle || '补弱策略'}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {muscleDetail.strengthening.strategy}
                </p>
              </div>

              {/* 训练要点 */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <span className="text-blue-500">📌</span>
                  {dict.muscleAnatomy.detailPanel.strengthening?.keyPointsTitle || '训练要点'}
                </h4>
                <ul className="space-y-1.5">
                  {muscleDetail.strengthening.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 推荐动作 */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <span className="text-green-500">⭐</span>
                  {dict.muscleAnatomy.detailPanel.strengthening?.recommendedTitle || '高激活动作'}
                </h4>
                <div className="space-y-3">
                  {muscleDetail.strengthening.recommendedExercises.map((exercise: { name: string; reason: string }, index: number) => (
                    <div 
                      key={index} 
                      className="p-3 rounded-lg"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(90, 197, 122, 0.08) 0%, rgba(76, 175, 80, 0.08) 100%)',
                        border: '1px solid rgba(90, 197, 122, 0.2)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Dumbbell className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{exercise.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        {exercise.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
