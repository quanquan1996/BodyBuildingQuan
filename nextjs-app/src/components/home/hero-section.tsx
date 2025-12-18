import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  stats?: {
    users: string;
    usersLabel: string;
    tools: string;
    toolsLabel: string;
  };
}

export function HeroSection({
  title,
  description,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  stats,
}: HeroSectionProps) {
  // 检测是否为中文标题
  const isZh = title.includes('轻核') || title.includes('健身');

  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* 背景装饰 - 使用 CSS 替代 SVG 减少 DOM 节点 */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FFE5B4 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #C8E6C9 0%, transparent 70%)' }}
        />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-5 text-center max-w-lg mx-auto">
          {/* 标题 */}
          <h1 className="text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl leading-relaxed" style={{ color: '#333333' }}>
            {isZh ? (
              <>
                轻核
                <span
                  className="font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  健身AI
                </span>
                工具站
              </>
            ) : (
              <>
                LightCore{' '}
                <span
                  className="font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  AI
                </span>
                {' '}Fitness
              </>
            )}
          </h1>

          <p className="text-base font-normal md:text-lg leading-relaxed" style={{ color: '#555555' }}>
            {description}
          </p>

          {subtitle && (
            <p className="text-sm font-normal" style={{ color: '#777777' }}>
              {subtitle}
            </p>
          )}

          {/* 统计信息 */}
          {stats && (
            <div className="flex items-center justify-center gap-8 py-3">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>{stats.users}</div>
                <div className="text-xs font-normal mt-1" style={{ color: '#888888' }}>{stats.usersLabel}</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>{stats.tools}</div>
                <div className="text-xs font-normal mt-1" style={{ color: '#888888' }}>{stats.toolsLabel}</div>
              </div>
            </div>
          )}

          {/* CTA 按钮 */}
          <div className="w-full max-w-sm pt-2 space-y-3">
            <Button
              asChild
              size="lg"
              className="w-full h-12 rounded-full text-base font-medium text-white transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{
                background: 'linear-gradient(90deg, #6FCF97 0%, #4CAF50 50%, #45a049 100%)',
                boxShadow: '0 6px 20px rgba(76, 175, 80, 0.35)',
              }}
            >
              <Link href={ctaHref}>{ctaText} &gt;&gt;</Link>
            </Button>
            {secondaryCtaText && secondaryCtaHref && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 rounded-full text-base font-medium transition-all hover:bg-gray-50"
                style={{ borderColor: '#E8E8E8', borderWidth: '1px', color: '#666666' }}
              >
                <Link href={secondaryCtaHref}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
