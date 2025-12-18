import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n';

interface PoseCategoriesProps {
  dict: Dictionary;
}

export function PoseCategories({ dict }: PoseCategoriesProps) {
  const poseCategories = dict.poseComparator?.poseCategories;
  
  // 防御性检查：如果 poseCategories 未定义，不渲染组件
  if (!poseCategories?.poses) {
    return null;
  }

  const poses = [
    { emoji: '💪', name: poseCategories.poses.frontDoubleBiceps.name, data: poseCategories.poses.frontDoubleBiceps },
    { emoji: '🦅', name: poseCategories.poses.frontLatSpread.name, data: poseCategories.poses.frontLatSpread },
    { emoji: '🏋️', name: poseCategories.poses.sideChest.name, data: poseCategories.poses.sideChest },
    { emoji: '🔙', name: poseCategories.poses.backDoubleBiceps.name, data: poseCategories.poses.backDoubleBiceps },
    { emoji: '🦋', name: poseCategories.poses.backLatSpread.name, data: poseCategories.poses.backLatSpread },
    { emoji: '🎯', name: poseCategories.poses.abdominalAndThigh.name, data: poseCategories.poses.abdominalAndThigh },
    { emoji: '⚡', name: poseCategories.poses.mostMuscular.name, data: poseCategories.poses.mostMuscular },
  ];

  // 获取标签文本，支持国际化
  const keyPointsLabel = poseCategories.keyPointsLabel || 'Key Points:';
  const tipsLabel = poseCategories.tipsLabel || 'Tips:';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏆</span>
          {poseCategories.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {poses.map((pose, index) => (
          <section key={index}>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <span>{pose.emoji}</span>
              {pose.name}
            </h3>
            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="font-medium mb-1">{keyPointsLabel}</p>
              <ul className="text-muted-foreground space-y-1">
                {pose.data.keyPoints.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
              <p className="font-medium mt-2 mb-1">{tipsLabel}</p>
              <ul className="text-muted-foreground space-y-1">
                {pose.data.tips.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </CardContent>
    </Card>
  );
}
