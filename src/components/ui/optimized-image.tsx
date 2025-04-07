'use client';

import Image from 'next/image';
import {ComponentProps} from 'react';

import {cn} from '@/lib/utils';

interface OptimizedImageProps extends ComponentProps<typeof Image> {
  priority?: boolean;
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  className,
  priority = false,
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw',
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      className={cn(
        'transition-opacity duration-300',
        !priority && 'opacity-0',
        className
      )}
      priority={priority}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      sizes={sizes}
      onLoad={(event) => {
        const target = event.target as HTMLImageElement;
        target.classList.remove('opacity-0');
      }}
      {...props}
    />
  );
}
