'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw, User, UserRound } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

interface MuscleControlsProps {
  onViewChange: (view: 'front' | 'back' | 'default') => void;
  onReset: () => void;
  currentView: 'front' | 'back' | 'default';
  dict: Dictionary;
}

export function MuscleControls({
  onViewChange,
  onReset,
  currentView,
  dict,
}: MuscleControlsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant={currentView === 'front' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('front')}
        className="rounded-full"
        style={currentView === 'front' ? {
          background: 'linear-gradient(90deg, #6FCF97 0%, #4CAF50 100%)',
        } : undefined}
      >
        <User className="h-4 w-4 mr-1" />
        {dict.muscleAnatomy.controls.frontView}
      </Button>
      
      <Button
        variant={currentView === 'back' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('back')}
        className="rounded-full"
        style={currentView === 'back' ? {
          background: 'linear-gradient(90deg, #6FCF97 0%, #4CAF50 100%)',
        } : undefined}
      >
        <UserRound className="h-4 w-4 mr-1" />
        {dict.muscleAnatomy.controls.backView}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="rounded-full"
      >
        <RotateCcw className="h-4 w-4 mr-1" />
        {dict.muscleAnatomy.controls.reset}
      </Button>
    </div>
  );
}
