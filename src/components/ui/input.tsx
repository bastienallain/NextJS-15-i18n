import * as React from 'react';

import {cn} from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, ...props}, ref) => {
    // Remove any style prop to prevent hydration mismatches
    const {style, ...restProps} = props;

    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-xl border border-brand bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...restProps}
      />
    );
  }
);

Input.displayName = 'Input';

export {Input};
