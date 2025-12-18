'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Home, Calculator, Ruler, Flame, Heart, Camera, Ratio, RefreshCw, Salad, Wheat, Activity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { toolGradients, type ToolId } from '@/lib/config/theme';
import type { Dictionary, Locale } from '@/lib/i18n/types';

interface MobileNavProps {
  locale: Locale;
  dict: Dictionary;
}

// 图标映射（使用相对路径）
const iconMap: Record<string, React.ElementType> = {
  'ffmi-calculator': Calculator,
  'skinfold-calculator': Ruler,
  'bmr-calculator': Flame,
  'heart-rate-calculator': Heart,
  'pose-comparator': Camera,
  'grecian-calculator': Ratio,
  'carb-cycling-calculator': RefreshCw,
  'fat-loss-diet-calculator': Salad,
  'high-carb-diet-calculator': Wheat,
  'metabolic-damage-test': Activity,
};

export function MobileNav({ locale, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isZh = locale === 'zh';

  // 分类导航配置（多语言）
  const navCategories = [
    {
      title: dict.nav.home,
      href: `/${locale}`,
    },
    {
      title: dict.nav.aiTools,
      icon: Sparkles,
      items: [
        { title: dict.poseComparator.title, href: `/${locale}/tools/pose-comparator`, toolId: 'pose-comparator' as ToolId },
        { title: dict.metabolicDamageTest.title, href: `/${locale}/tools/metabolic-damage-test`, toolId: 'metabolic-damage-test' as ToolId },
      ],
    },
    {
      title: dict.nav.bodyAssessment,
      items: [
        { title: dict.ffmiCalculator.title, href: `/${locale}/tools/ffmi-calculator`, toolId: 'ffmi-calculator' as ToolId },
        { title: dict.skinfoldCalculator.title, href: `/${locale}/tools/skinfold-calculator`, toolId: 'skinfold-calculator' as ToolId },
        { title: dict.grecianCalculator.title, href: `/${locale}/tools/grecian-calculator`, toolId: 'grecian-calculator' as ToolId },
      ],
    },

    {
      title: dict.nav.dietCalculation,
      items: [
        { title: dict.bmrCalculator.title, href: `/${locale}/tools/bmr-calculator`, toolId: 'bmr-calculator' as ToolId },
        { title: dict.carbCyclingCalculator.title, href: `/${locale}/tools/carb-cycling-calculator`, toolId: 'carb-cycling-calculator' as ToolId },
        { title: dict.fatLossDietCalculator.title, href: `/${locale}/tools/fat-loss-diet-calculator`, toolId: 'fat-loss-diet-calculator' as ToolId },
        { title: dict.highCarbDietCalculator.title, href: `/${locale}/tools/high-carb-diet-calculator`, toolId: 'high-carb-diet-calculator' as ToolId },
      ],
    },
    {
      title: dict.nav.trainingAssist,
      items: [
        { title: dict.heartRateCalculator.title, href: `/${locale}/tools/heart-rate-calculator`, toolId: 'heart-rate-calculator' as ToolId },
      ],
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden gap-2 hover:bg-primary/10"
          aria-label={isZh ? '打开菜单' : 'Open menu'}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] p-0 flex flex-col rounded-l-2xl border-l-0"
      >
        <SheetHeader className="p-5 pb-4 bg-gradient-to-br from-primary/10 to-primary/5 text-left flex-shrink-0">
          <SheetTitle className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-[10px]"
              style={{
                background: 'linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%)',
                boxShadow: '0 2px 8px rgba(90, 197, 122, 0.25)',
              }}
            >
              <span className="text-white font-bold text-[10px] leading-none">
                {dict.common.siteNameShort}
              </span>
            </div>
            <span className="font-semibold text-lg text-foreground">
              {isZh ? (
                <>健身<span className="text-primary">AI</span>工具站</>
              ) : (
                dict.common.siteName
              )}
            </span>
          </SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {isZh ? '免费在线健身工具' : 'Free online fitness tools'}
          </p>
        </SheetHeader>

        <nav className="p-3 flex-1 overflow-y-auto scrollbar-thin">
          {navCategories.map((category) => (
            <div key={category.title} className="mb-4">
              {category.href ? (
                <Link
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                    pathname === category.href
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted'
                  )}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{
                      background: 'linear-gradient(135deg, #4CAF50, #81C784)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Home className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-medium text-sm">{category.title}</span>
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 mb-1">
                    {category.icon && <category.icon className="w-4 h-4 text-primary" />}
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category.title}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {category.items?.map((item) => {
                      const Icon = iconMap[item.toolId] || Calculator;
                      const isActive = pathname === item.href;
                      const gradient = toolGradients[item.toolId];

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                            isActive ? 'bg-primary/10' : 'hover:bg-muted'
                          )}
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                            style={{
                              background: gradient
                                ? `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`
                                : 'linear-gradient(135deg, #4CAF50, #81C784)',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <span className={cn('font-medium text-sm', isActive && 'text-primary')}>
                            {item.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            {dict.footer.copyright}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
