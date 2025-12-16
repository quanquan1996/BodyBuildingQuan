'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/config/navigation';
import { cn } from '@/lib/utils';
import { MobileNav } from './mobile-nav';
import { Dumbbell } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-muted/50 backdrop-blur supports-[backdrop-filter]:bg-muted/30">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="absolute inset-x-4 md:inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
        <Link href="/" className="mr-4 md:mr-6 flex items-center gap-1.5 md:gap-2 group">
          <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary text-primary-foreground">
            <Dumbbell className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <span className="font-black text-base md:text-lg tracking-tight font-[family-name:var(--font-noto-sans-sc)] group-hover:text-primary transition-colors">
            健身<span className="text-primary">AI</span>工具站
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end">
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
