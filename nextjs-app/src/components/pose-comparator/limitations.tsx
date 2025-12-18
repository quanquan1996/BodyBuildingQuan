import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Dictionary } from '@/lib/i18n';

interface LimitationsProps {
  dict: Dictionary;
}

export function Limitations({ dict }: LimitationsProps) {
  const limitations = dict.poseComparator?.limitations;
  
  // 防御性检查
  if (!limitations?.items) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <span>⚠️</span>
          {limitations.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-3">
          {limitations.items.map((item, index) => (
            <section key={index}>
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                {['📌', '🔍', '✅', '🏋️'][index]} {item.title}
              </h4>
              <p className="text-amber-700/80 dark:text-amber-400/80">
                {item.description}
              </p>
            </section>
          ))}
        </div>

        <div className="pt-2 border-t border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-600/70 dark:text-amber-500/70 text-center">
            💡 {limitations.conclusion}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
