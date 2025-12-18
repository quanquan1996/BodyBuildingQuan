'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import { LanguageSwitcher } from './language-switcher';
import { ChevronDown } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n/types';

interface SiteHeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isZh = locale === 'zh';

  // 分类导航配置（多语言）
  const navCategories = [
    {
      title: dict.nav.home,
      href: `/${locale}`,
    },
    {
      title: dict.nav.bodyAssessment,
      items: [
        { title: dict.ffmiCalculator.title, href: `/${locale}/tools/ffmi-calculator` },
        { title: dict.skinfoldCalculator.title, href: `/${locale}/tools/skinfold-calculator` },
        { title: dict.grecianCalculator.title, href: `/${locale}/tools/grecian-calculator` },
      ],
    },
    {
      title: dict.nav.dietCalculation,
      items: [
        { title: dict.bmrCalculator.title, href: `/${locale}/tools/bmr-calculator` },
        { title: dict.carbCyclingCalculator.title, href: `/${locale}/tools/carb-cycling-calculator` },
        { title: dict.fatLossDietCalculator.title, href: `/${locale}/tools/fat-loss-diet-calculator` },
        { title: dict.highCarbDietCalculator.title, href: `/${locale}/tools/high-carb-diet-calculator` },
      ],
    },
    {
      title: dict.nav.aiTools,
      items: [
        { title: dict.poseComparator.title, href: `/${locale}/tools/pose-comparator`, isAI: true },
        { title: dict.metabolicDamageTest.title, href: `/${locale}/tools/metabolic-damage-test`, isAI: true },
      ],
    },
    {
      title: dict.nav.trainingAssist,
      items: [
        { title: dict.heartRateCalculator.title, href: `/${locale}/tools/heart-rate-calculator` },
      ],
    },
  ];


  const handleMouseEnter = (categoryTitle: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(categoryTitle);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <Link href={`/${locale}`} className="mr-6 flex items-center gap-2.5 group">
          {/* Logo */}
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
              <>健身<span className="text-primary">AI</span>工具站</>
            ) : (
              <>{dict.common.siteName}</>
            )}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
          {navCategories.map((category) => (
            <div
              key={category.title}
              className="relative"
              onMouseEnter={() => category.items && handleMouseEnter(category.title)}
              onMouseLeave={handleMouseLeave}
            >
              {category.href ? (
                <Link
                  href={category.href}
                  className={cn(
                    'px-3 py-2 rounded-lg transition-colors hover:bg-muted',
                    pathname === category.href ? 'text-primary font-semibold' : 'text-foreground'
                  )}
                >
                  {category.title}
                </Link>
              ) : (
                <button
                  className={cn(
                    'px-3 py-2 rounded-lg transition-colors hover:bg-muted flex items-center gap-1',
                    category.items?.some((item) => pathname === item.href)
                      ? 'text-primary font-semibold'
                      : 'text-foreground'
                  )}
                >
                  {category.title}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Dropdown */}
              {category.items && openMenu === category.title && (
                <div
                  className="absolute top-full left-0 mt-1 py-2 bg-card rounded-xl shadow-lg border border-border/50 min-w-[180px] z-50"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                >
                  {category.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-4 py-2 text-sm transition-colors hover:bg-muted',
                        pathname === item.href ? 'text-primary font-medium' : 'text-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher locale={locale} />
          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}
