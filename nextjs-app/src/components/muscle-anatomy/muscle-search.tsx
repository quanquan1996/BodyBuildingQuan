'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Dictionary } from '@/lib/i18n';

interface MuscleSearchProps {
  dict: Dictionary;
  onSelect: (muscleId: string) => void;
}

export function MuscleSearch({ dict, onSelect }: MuscleSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取所有肌肉列表
  const muscleList = useMemo(() => {
    const muscles = dict.muscleAnatomy.muscles;
    return Object.entries(muscles).map(([id, name]) => ({
      id,
      name: name as string,
    }));
  }, [dict]);

  // 搜索过滤
  const filteredMuscles = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return muscleList
      .filter(muscle => 
        muscle.name.toLowerCase().includes(lowerQuery) ||
        muscle.id.toLowerCase().includes(lowerQuery.replace(/ /g, '_'))
      )
      .slice(0, 10); // 最多显示10个结果
  }, [query, muscleList]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (muscleId: string) => {
    onSelect(muscleId);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={dict.muscleAnatomy.search.placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-9 rounded-full"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {isOpen && filteredMuscles.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg border overflow-hidden z-50"
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          {filteredMuscles.map((muscle) => (
            <button
              key={muscle.id}
              onClick={() => handleSelect(muscle.id)}
              className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0 flex items-center gap-2"
            >
              <span className="text-primary">💪</span>
              <span className="text-sm">{muscle.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {isOpen && query.trim() && filteredMuscles.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-lg border p-4 z-50">
          <p className="text-sm text-muted-foreground text-center">
            {dict.muscleAnatomy.search.noResults}
          </p>
        </div>
      )}
    </div>
  );
}
