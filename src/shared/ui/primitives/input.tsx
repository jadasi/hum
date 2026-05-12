import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { cn } from '@/shared/lib/utils';

export type InputProps = TextInputProps & {
  className?: string;
};

export const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'min-h-[48px] w-full rounded-md border border-input bg-muted px-4 py-3 font-sans text-base text-foreground placeholder:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
