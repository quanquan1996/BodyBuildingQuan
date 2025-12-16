import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({ title, description, subtitle, ctaText, ctaHref }: HeroSectionProps) {
  return (
    <section className="py-6 md:py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-3 md:space-y-6 text-center">
          <div className="hidden md:inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
            🚀 免费在线工具 · 无需下载
          </div>
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-sm text-muted-foreground md:text-xl">
            {description}
          </p>
          {subtitle && (
            <p className="text-xs md:text-sm text-primary font-medium">
              {subtitle}
            </p>
          )}
          <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-4">
            <Button asChild size="sm" className="min-h-[40px] md:min-h-[48px] md:min-w-[140px]">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="min-h-[40px] md:min-h-[48px] md:min-w-[140px]">
              <Link href="/tools/fat-loss-diet-calculator">减脂饮食计算</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="min-h-[40px] md:min-h-[48px] md:min-w-[140px]">
              <Link href="/tools/pose-comparator">健美造型评分</Link>
            </Button>
          </div>
          <p className="hidden md:block text-xs text-muted-foreground">
            已帮助 10,000+ 健身爱好者科学评估训练效果
          </p>
        </div>
      </div>
    </section>
  );
}
