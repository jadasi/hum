import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { cn } from '@/shared/lib/utils';

export const textVariants = cva('font-sans text-foreground', {
  variants: {
    variant: {
      title: 'text-center text-hum-3xl font-hum-bold',
      subtitle: 'text-center text-hum-sm text-muted-foreground',
      body: 'text-hum-base',
      muted: 'text-hum-sm text-muted-foreground',
      destructive: 'text-center text-hum-sm text-destructive',
      label: 'text-hum-sm font-hum-medium',
      link: 'text-hum-sm font-hum-semibold text-primary',
    },
  },
  defaultVariants: { variant: 'body' },
});

export type TextProps = RNTextProps &
  VariantProps<typeof textVariants> & {
    className?: string;
  };

export const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(function Text(
  { className, variant, ...props },
  ref
) {
  return <RNText ref={ref} className={cn(textVariants({ variant }), className)} {...props} />;
});

Text.displayName = 'Text';
