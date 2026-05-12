import * as LabelPrimitive from '@rn-primitives/label';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text> & {
  className?: string;
};

/** Form label (`Label.Text` from `@rn-primitives/label`) with shared typography. */
export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Text>, LabelProps>(
  function Label({ className, ...props }, ref) {
    return (
      <LabelPrimitive.Text
        ref={ref}
        className={cn('native:pb-0.5 font-sans text-hum-sm font-hum-medium text-foreground web:cursor-default', className)}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
