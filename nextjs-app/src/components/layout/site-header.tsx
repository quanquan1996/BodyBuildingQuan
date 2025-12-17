'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import { ChevronDown } from 'lucide-react';

// 分类导航配置
const navCategories = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: '身体评估',
    items: [
      { title: 'FFMI计算器', href: '/tools/ffmi-calculator' },
      { title: '体脂夹计算器', href: '/tools/skinfold-calculator' },
      { title: '古典比例计算器', href: '/tools/grecian-calculator' },
    ],
  },
  {
    title: '饮食计算',
    items: [
      { title: '代谢计算器', href: '/tools/bmr-calculator' },
      { title: '碳循环计算器', href: '/tools/carb-cycling-calculator' },
      { title: '减脂饮食计算器', href: '/tools/fat-loss-diet-calculator' },
      { title: '高碳减脂计算器', href: '/tools/high-carb-diet-calculator' },
    ],
  },
  {
    title: 'AI工具',
    items: [
      { title: '健美造型评分器', href: '/tools/pose-comparator', isAI: true },
      { title: '代谢受损检测', href: '/tools/metabolic-damage-test', isAI: true },
    ],
  },
  {
    title: '训练辅助',
    items: [
      { title: '心率区间计算器', href: '/tools/heart-rate-calculator' },
    ],
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (categoryTitle: string) => {
    // 清除关闭定时器
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenMenu(categoryTitle);
  };

  const handleMouseLeave = () => {
    // 延迟 150ms 关闭，给用户时间移动到下拉菜单
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <Link href="/" className="mr-6 flex items-center gap-2.5 group">
          {/* Logo - 轻核文字 */}
          <div 
            className="flex items-center justify-center w-9 h-9 rounded-[12px]"
            style={{
              background: 'linear-gradient(135deg, #7DD3A0 0%, #5AC57A 100%)',
              boxShadow: '0 2px 8px rgba(90, 197, 122, 0.25)',
            }}
          >
            <span className="text-white font-bold text-xs leading-none">轻核</span>
          </div>
          <span className="font-semibold text-base md:text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            健身<span className="text-primary">AI</span>工具站
          </span>
        </Link>
        
        {/* Desktop Navigation - 分类下拉菜单 */}
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
                    category.items?.some(item => pathname === item.href) ? 'text-primary font-semibold' : 'text-foreground'
                  )}
                >
                  {category.title}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
              
              {/* 下拉菜单 */}
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

        <div className="flex flex-1 items-center justify-end">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
