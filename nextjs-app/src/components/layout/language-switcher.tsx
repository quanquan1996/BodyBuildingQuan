'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronUp, Check } from 'lucide-react';
import type { Locale } from '@/lib/i18n/types';
import { locales } from '@/lib/i18n/types';

interface LanguageSwitcherProps {
  locale: Locale;
}

interface LanguageOption {
  code: Locale;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'EN' },
  { code: 'zh', name: 'Chinese', nativeName: '简中' },
];

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // 替换路径中的语言前缀
    let newPath = pathname;
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        newPath = pathname.replace(`/${loc}/`, `/${newLocale}/`);
        break;
      } else if (pathname === `/${loc}`) {
        newPath = `/${newLocale}`;
        break;
      }
    }

    setIsOpen(false);
    router.push(newPath);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all hover:bg-muted group"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe 
          className="w-3.5 h-3.5 transition-colors" 
          style={{ color: isOpen ? '#5AC57A' : undefined }}
        />
        <span 
          className="transition-colors text-muted-foreground"
          style={{ color: isOpen ? '#5AC57A' : undefined }}
        >
          {currentLanguage.nativeName}
        </span>
        <ChevronUp 
          className={`w-3 h-3 transition-all duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
          style={{ color: isOpen ? '#5AC57A' : undefined }}
        />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 py-2 bg-card rounded-xl border border-border/50 min-w-[160px] z-50 overflow-hidden"
          style={{ 
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
          role="listbox"
          aria-label="Select language"
        >
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-muted ${
                  isSelected ? 'text-primary font-medium' : 'text-foreground'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <span>{lang.nativeName}</span>
                {isSelected && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
