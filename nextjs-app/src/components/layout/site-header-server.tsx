// 服务端 Header 组件 - 减少客户端 JS
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n/types';
import { HeaderClientParts } from './header-client-parts';

interface SiteHeaderServerProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeaderServer({ locale, dict }: SiteHeaderServerProps) {
  const isZh = locale === 'zh';

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <Link href={`/${locale}`} className="mr-6 flex items-center gap-2.5 group">
          {/* Logo - 纯 CSS，无 JS */}
          <div
            className="flex items-center justify-center w-9 h-9 rounded-[12px]"
            style={{
              background: 'linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%)',
              boxShadow: '0 2px 8px rgba(90, 197, 122, 0.25)',
            }}
          >
            <span className="text-white font-bold text-xs leading-none">
              {dict.common.siteNameShort}
            </span>
          </div>
          <span className="font-semibold text-base md:text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            {isZh ? (
              <>
                健身<span className="text-primary">AI</span>工具站
              </>
            ) : (
              <>{dict.common.siteName}</>
            )}
          </span>
        </Link>

        {/* 客户端交互部分 - 懒加载 */}
        <HeaderClientParts locale={locale} dict={dict} />
      </div>
    </header>
  );
}
