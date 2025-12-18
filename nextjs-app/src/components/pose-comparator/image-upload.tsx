'use client';

import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n';

interface ImageUploadProps {
  label: string;
  onImageSelect: (file: File, dataUrl: string) => void;
  dict: Dictionary;
  accept?: string;
  className?: string;
}

export function ImageUpload({
  label,
  onImageSelect,
  dict,
  accept = 'image/*',
  className,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadHint = dict.poseComparator?.uploadHint || 'Click or drag image here';

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert(uploadHint);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size cannot exceed 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onImageSelect(file, dataUrl);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect, uploadHint]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
          'min-h-[200px] flex items-center justify-center',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50',
          preview && 'border-solid'
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-[300px] max-w-full object-contain rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {uploadHint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
