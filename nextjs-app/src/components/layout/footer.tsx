import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n/types';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isZh = locale === 'zh';

  return (
    <footer style={{ background: '#1A202C' }}>
      <div className="container px-4 md:px-6 py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-[10px]"
                style={{
                  background: 'linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%)',
                }}
              >
                <span className="text-white font-bold text-[10px] leading-none">
                  {dict.common.siteNameShort}
                </span>
              </div>
              <span className="font-semibold text-lg text-white">
                {isZh ? (
                  <>健身<span style={{ color: '#5AC57A' }}>AI</span>工具站</>
                ) : (
                  dict.common.siteName
                )}
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-sm">{dict.footer.bodyAssessment}</h3>
              <nav className="flex flex-col space-y-2">
                <Link href={`/${locale}/tools/ffmi-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.ffmiCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/skinfold-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.skinfoldCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/grecian-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.grecianCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/pose-comparator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.poseComparator.title}
                </Link>
              </nav>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-white text-sm">{dict.footer.dietCalculation}</h3>
              <nav className="flex flex-col space-y-2">
                <Link href={`/${locale}/tools/bmr-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.bmrCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/carb-cycling-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.carbCyclingCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/fat-loss-diet-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.fatLossDietCalculator.title}
                </Link>
                <Link href={`/${locale}/tools/heart-rate-calculator`} className="text-sm transition-colors hover:text-white" style={{ color: '#94A3B8' }}>
                  {dict.heartRateCalculator.title}
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{dict.footer.contact}</h3>
            <div className="space-y-2 text-sm" style={{ color: '#94A3B8' }}>
              <p>{dict.footer.contactLabel}</p>
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
          <p className="text-xs mb-3" style={{ color: '#64748B' }}>{dict.footer.hotTools}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {dict.footer.hotKeywords.map((keyword) => (
              <span key={keyword} className="text-xs" style={{ color: '#64748B' }}>
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #2D3748' }}>
          <p className="text-xs text-center md:text-left" style={{ color: '#64748B' }}>
            © {currentYear} {dict.common.siteName}. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <p className="text-xs" style={{ color: '#64748B' }}>
            {dict.footer.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
