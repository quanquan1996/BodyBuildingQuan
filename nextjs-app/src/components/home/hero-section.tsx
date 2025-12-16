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
    <section className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
            🚀 免费在线工具 · 无需下载
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {description}
          </p>
          {subtitle && (
            <p className="text-sm text-primary font-medium">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="min-h-[48px] min-w-[140px]">
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-h-[48px] min-w-[140px]">
              <Link href="/tools/pose-comparator">健美造型评分</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            已帮助 10,000+ 健身爱好者科学评估训练效果
          </p>
        </div>
      </div>
    </section>
  );
}
