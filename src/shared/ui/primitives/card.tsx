import * as React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/shared/lib/utils';

export type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className, ...props }: CardProps) {
  return <View className={cn('rounded-lg border border-border bg-muted px-4 py-4', className)} {...props} />;
}
