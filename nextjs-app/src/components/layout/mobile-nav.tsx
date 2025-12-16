'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Home, Calculator, Ruler, Flame, Heart, Camera, Ratio, RefreshCw, Salad, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { mainNav } from '@/lib/config/navigation';
import { siteConfig } from '@/lib/config/site';
import { cn } from '@/lib/utils';

// 图标映射
const iconMap: Record<string, React.ElementType> = {
  '/': Home,
  '/tools/ffmi-calculator': Calculator,
  '/tools/skinfold-calculator': Ruler,
  '/tools/bmr-calculator': Flame,
  '/tools/heart-rate-calculator': Heart,
  '/tools/pose-comparator': Camera,
  '/tools/grecian-calculator': Ratio,
  '/tools/carb-cycling-calculator': RefreshCw,
  '/tools/fat-loss-diet-calculator': Salad,
  '/tools/high-carb-diet-calculator': Wheat,
};

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="md:hidden gap-2"
          aria-label="打开菜单"
        >
          <Menu className="h-4 w-4" />
          <span>菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b text-left">
          <SheetTitle className="text-lg">{siteConfig.name}</SheetTitle>
          <p className="text-xs text-muted-foreground">免费在线健身工具</p>
        </SheetHeader>

        <nav className="p-3">
          {mainNav.map((item) => {
            const Icon = iconMap[item.href] || Calculator;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.title}</div>
                  {item.description && (
                    <div
                      className={cn(
                        'text-xs truncate',
                        isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      )}
                    >
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
