import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  title: string;
  description: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({ description, subtitle, ctaText, ctaHref }: HeroSectionProps) {
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* 背景装饰 - 更丰富的几何图形 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 右上角主装饰 */}
        <svg className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE5B4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFDAB9" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8F5E9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C8E6C9" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle cx="140" cy="60" r="60" fill="url(#heroGrad1)" />
          <circle cx="170" cy="100" r="30" fill="#FFE5B4" opacity="0.3" />
        </svg>
        {/* 左下角装饰 */}
        <svg className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48" viewBox="0 0 150 150">
          <circle cx="30" cy="120" r="50" fill="url(#heroGrad2)" />
          <circle cx="60" cy="100" r="25" fill="#C8E6C9" opacity="0.3" />
        </svg>
        {/* 流动线条装饰 */}
        <svg className="absolute top-1/3 left-1/4 w-24 h-24 opacity-20" viewBox="0 0 100 100">
          <path d="M10,50 Q30,20 50,50 T90,50" stroke="#4CAF50" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M10,60 Q30,30 50,60 T90,60" stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-5 text-center max-w-lg mx-auto">
          {/* 标题 - AI用渐变色突出 */}
          <h1 className="text-2xl font-medium tracking-normal sm:text-3xl md:text-4xl leading-relaxed" style={{ color: '#333333' }}>
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
          </h1>
          
          {/* 副标题 */}
          <p className="text-base font-normal md:text-lg leading-relaxed" style={{ color: '#555555' }}>
            {description}
          </p>

          {subtitle && (
            <p className="text-sm font-normal" style={{ color: '#777777' }}>
              {subtitle}
            </p>
          )}

          {/* 统计信息 - 数字加粗+品牌色 */}
          <div className="flex items-center justify-center gap-8 py-3">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>10,000+</div>
              <div className="text-xs font-normal mt-1" style={{ color: '#888888' }}>用户使用</div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#4CAF50' }}>10+</div>
              <div className="text-xs font-normal mt-1" style={{ color: '#888888' }}>专业工具</div>
            </div>
          </div>

          {/* CTA 按钮 - 悬浮效果+渐变 */}
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
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full h-12 rounded-full text-base font-medium transition-all hover:bg-gray-50"
              style={{ borderColor: '#E8E8E8', borderWidth: '1px', color: '#666666' }}
            >
              <Link href="/tools/fat-loss-diet-calculator">减脂饮食计算</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
