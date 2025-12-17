import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';
import { mainNav } from '@/lib/config/navigation';

// 热门工具关键词（SEO）
const hotKeywords = [
  'FFMI计算器',
  '体脂率计算',
  '肌肉量评估',
  '健美造型评分',
  '基础代谢计算',
  '心率区间',
  '碳循环减脂',
  '古典比例',
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#1A202C' }}>
      <div className="container px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div 
                className="flex items-center justify-center w-8 h-8 rounded-[10px]"
                style={{
                  background: 'linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%)',
                }}
              >
                <span className="text-white font-bold text-[10px] leading-none">轻核</span>
              </div>
              <span className="font-semibold text-lg text-white">
                健身<span style={{ color: '#5AC57A' }}>AI</span>工具站
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              免费在线健身工具平台，提供FFMI计算、健美造型评分等专业工具，
              帮助健身爱好者科学评估训练效果。
            </p>
          </div>

          {/* Quick Links - 分两列 */}
          <div className="grid grid-cols-2 gap-6">
            {/* 身体评估 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-sm">身体评估</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/tools/ffmi-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>FFMI计算器</Link>
                <Link href="/tools/skinfold-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>体脂夹计算器</Link>
                <Link href="/tools/grecian-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>古典比例计算器</Link>
                <Link href="/tools/pose-comparator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>健美造型评分</Link>
              </nav>
            </div>
            {/* 饮食计算 */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-sm">饮食计算</h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/tools/bmr-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>代谢计算器</Link>
                <Link href="/tools/carb-cycling-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>碳循环计算器</Link>
                <Link href="/tools/fat-loss-diet-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>减脂饮食计算器</Link>
                <Link href="/tools/heart-rate-calculator" className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>心率区间计算器</Link>
              </nav>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">联系我们</h3>
            <div className="space-y-2 text-sm" style={{ color: '#94A3B8' }}>
              <p>合作/广告咨询：</p>
              <a
                href="mailto:quanquanyiyi520@gmail.com"
                className="hover:text-white transition-colors break-all"
                style={{ color: '#5AC57A' }}
              >
                quanquanyiyi520@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Hot Keywords - SEO */}
        <div className="mt-10 pt-6" style={{ borderTop: '1px solid #2D3748' }}>
          <p className="text-xs mb-3" style={{ color: '#64748B' }}>热门工具</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {hotKeywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs"
                style={{ color: '#64748B' }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #2D3748' }}>
          <p className="text-xs text-center md:text-left" style={{ color: '#64748B' }}>
            © {currentYear} {siteConfig.name}. 保留所有权利。
          </p>
          <p className="text-xs" style={{ color: '#64748B' }}>
            🏋️ 科学健身，健康生活
          </p>
        </div>
      </div>
    </footer>
  );
}
