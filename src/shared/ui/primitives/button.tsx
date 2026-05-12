import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicator, Pressable, Text, type PressableProps } from 'react-native';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'flex-row items-center justify-center gap-2 rounded-lg active:opacity-80 web:cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary disabled:opacity-60',
        destructive: 'bg-destructive disabled:opacity-60',
        outline: 'border border-input bg-background disabled:opacity-60',
        ghost: 'bg-transparent disabled:opacity-50',
        link: 'bg-transparent disabled:opacity-50',
      },
      size: {
        default: 'min-h-[48px] px-4',
        sm: 'min-h-[40px] px-3',
        lg: 'min-h-[52px] px-6',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

const buttonLabelVariants = cva('font-sans text-hum-sm font-hum-semibold', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline',
    },
  },
  defaultVariants: { variant: 'default' },
});

function spinnerColor(variant: VariantProps<typeof buttonVariants>['variant']): string {
  switch (variant) {
    case 'outline':
    case 'ghost':
    case 'link':
      return 'hsl(172 39% 50%)';
    default:
      return '#ffffff';
  }
}

export type ButtonProps = Omit<PressableProps, 'children'> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    labelClassName?: string;
    loading?: boolean;
    children: React.ReactNode;
  };

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(function Button(
  { className, variant, size, loading, disabled, children, labelClassName, ...props },
  ref
) {
  const busy = Boolean(loading);
  const isDisabled = disabled || busy;

  const content = (() => {
    if (busy) {
      return <ActivityIndicator color={spinnerColor(variant ?? 'default')} />;
    }
    if (typeof children === 'string' || typeof children === 'number') {
      return <Text className={cn(buttonLabelVariants({ variant }), labelClassName)}>{children}</Text>;
    }
    return children;
  })();

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isDisabled}
      hitSlop={8}
      {...props}>
      {content}
    </Pressable>
  );
});

Button.displayName = 'Button';
