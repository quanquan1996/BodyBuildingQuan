'use client';

import { Button } from '@/components/ui/button';
import { getDictionary } from '@/lib/i18n';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // 错误页面使用默认语言
  const dict = getDictionary('zh');

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <h2 className="text-2xl font-bold mb-4">{dict.common.error}</h2>
      <p className="text-muted-foreground mb-6 text-center">{error.message}</p>
      <Button onClick={reset}>{dict.common.retry}</Button>
    </div>
  );
}
