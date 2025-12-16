'use client';

import { Button } from '@/components/ui/button';
import { zh } from '@/lib/i18n/zh';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
      <h2 className="text-2xl font-bold mb-4">{zh.common.error}</h2>
      <p className="text-muted-foreground mb-6 text-center">{error.message}</p>
      <Button onClick={reset}>{zh.common.retry}</Button>
    </div>
  );
}
