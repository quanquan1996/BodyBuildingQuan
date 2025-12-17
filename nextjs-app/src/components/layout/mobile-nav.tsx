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
  '/tools/metabolic-damage-test': Activity,
};

// 路由到工具ID映射
const routeToToolId: Record<string, ToolId> = {
  '/tools/ffmi-calculator': 'ffmi-calculator',
  '/tools/skinfold-calculator': 'skinfold-calculator',
  '/tools/bmr-calculator': 'bmr-calculator',
  '/tools/heart-rate-calculator': 'heart-rate-calculator',
  '/tools/pose-comparator': 'pose-comparator',
  '/tools/grecian-calculator': 'grecian-calculator',
  '/tools/carb-cycling-calculator': 'carb-cycling-calculator',
  '/tools/fat-loss-diet-calculator': 'fat-loss-diet-calculator',
  '/tools/high-carb-diet-calculator': 'high-carb-diet-calculator',
  '/tools/metabolic-damage-test': 'metabolic-damage-test',
};

// 分类导航配置 - 与PC端一致的树状结构
const navCategories = [
  {
    title: '首页',
    href: '/',
  },
  {
    title: 'AI 智能工具',
    icon: Sparkles,
    items: [
      { title: '健美造型评分器', href: '/tools/pose-comparator', description: 'AI驱动的健美造型评分' },
      { title: '代谢受损检测', href: '/tools/metabolic-damage-test', description: '评估代谢适应程度' },
    ],
  },
  {
    title: '身体评估',
    items: [
      { title: 'FFMI计算器', href: '/tools/ffmi-calculator', description: '无脂肪体重指数计算' },
      { title: '体脂夹计算器', href: '/tools/skinfold-calculator', description: '皮褶厚度法测体脂' },
      { title: '古典比例计算器', href: '/tools/grecian-calculator', description: '黄金分割身材比例' },
    ],
  },
  {
    title: '饮食计算',
    items: [
      { title: '代谢计算器', href: '/tools/bmr-calculator', description: '基础代谢率计算' },
      { title: '碳循环计算器', href: '/tools/carb-cycling-calculator', description: '碳水循环减脂规划' },
      { title: '减脂饮食计算器', href: '/tools/fat-loss-diet-calculator', description: '碳水递减减脂计划' },
      { title: '高碳减脂计算器', href: '/tools/high-carb-diet-calculator', description: '高碳低脂减脂策略' },
    ],
  },
  {
    title: '训练辅助',
    items: [
      { title: '心率区间计算器', href: '/tools/heart-rate-calculator', description: '有氧心率训练区间' },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden gap-2 hover:bg-primary/10"
          aria-label="打开菜单"
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
              <span className="text-white font-bold text-[10px] leading-none">轻核</span>
            </div>
            <span className="font-semibold text-lg text-foreground">
              健身<span className="text-primary">AI</span>工具站
            </span>
          </SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">免费在线健身工具</p>
        </SheetHeader>

        <nav className="p-3 flex-1 overflow-y-auto scrollbar-thin">
          {navCategories.map((category) => (
            <div key={category.title} className="mb-4">
              {/* 首页单独处理 */}
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
                  {/* 分类标题 */}
                  <div className="flex items-center gap-2 px-3 py-2 mb-1">
                    {category.icon && (
                      <category.icon className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {category.title}
                    </span>
                  </div>
                  {/* 分类下的工具列表 */}
                  <div className="space-y-1">
                    {category.items?.map((item) => {
                      const Icon = iconMap[item.href] || Calculator;
                      const isActive = pathname === item.href;
                      const toolId = routeToToolId[item.href];
                      const gradient = toolId ? toolGradients[toolId] : null;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                            isActive
                              ? 'bg-primary/10'
                              : 'hover:bg-muted'
                          )}
                        >
                          {/* 渐变图标 */}
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
                          <div className="flex-1 min-w-0">
                            <div className={cn(
                              'font-medium text-sm',
                              isActive && 'text-primary'
                            )}>
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-[11px] text-muted-foreground truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>

        {/* 底部信息 */}
        <div className="p-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 轻核健身AI工具站
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
