// 首页加载骨架屏 - 改善感知性能
export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-5 text-center max-w-lg mx-auto">
            <div className="h-10 bg-muted rounded-lg w-3/4" />
            <div className="h-6 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="flex gap-8 py-3">
              <div className="h-12 w-20 bg-muted rounded" />
              <div className="h-12 w-20 bg-muted rounded" />
            </div>
            <div className="w-full max-w-sm space-y-3 pt-2">
              <div className="h-12 bg-muted rounded-full" />
              <div className="h-12 bg-muted/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Skeleton */}
      <section className="pt-10 pb-6 md:pt-16 md:pb-16">
        <div className="container px-4 md:px-6">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-10" />
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 sm:hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-muted rounded-[16px] mb-2" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            ))}
          </div>
          <div className="hidden sm:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl p-5 h-24">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-[16px]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
