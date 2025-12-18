'use client';

import dynamic from 'next/dynamic';
import type { Dictionary, Locale } from '@/lib/i18n/types';

interface NavProps {
  locale: Locale;
  dict: Dictionary;
}

// 懒加载移动端导航 - 只在点击时加载
const MobileNavLazy = dynamic(
  () => import('./mobile-nav').then((m) => ({ default: m.MobileNav })),
  {
    ssr: false,
    loading: () => (
      <button className="lg:hidden p-2 rounded-lg hover:bg-muted">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    ),
  }
);

// 懒加载语言切换器
const LanguageSwitcherLazy = dynamic(
  () => import('./language-switcher').then((m) => ({ default: m.LanguageSwitcher })),
  {
    ssr: false,
    loading: () => <div className="w-8 h-8" />,
  }
);

// 懒加载桌面端导航
const DesktopNavLazy = dynamic(
  () => import('./desktop-nav').then((m) => ({ default: m.DesktopNav })),
  {
    ssr: false,
    loading: () => <nav className="flex items-center space-x-1 text-sm font-medium opacity-0" />,
  }
);

export function HeaderClientParts({ locale, dict }: NavProps) {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block flex-1">
        <DesktopNavLazy locale={locale} dict={dict} />
      </div>

      {/* Right side controls */}
      <div className="flex flex-1 lg:flex-none items-center justify-end gap-2">
        <LanguageSwitcherLazy locale={locale} />
        <MobileNavLazy locale={locale} dict={dict} />
      </div>
    </>
  );
}
