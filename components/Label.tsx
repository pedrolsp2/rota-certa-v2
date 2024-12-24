import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as LabelPrimitive from '@rn-primitives/label';
import { cn } from '@/lib/utils';

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Text>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(({ className, onPress, onLongPress, onPressIn, onPressOut, ...props }, ref) => (
  <LabelPrimitive.Root
    className="web:cursor-default"
    onPress={onPress}
    onLongPress={onLongPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}>
    <LabelPrimitive.Text
      ref={ref}
      className={cn(
        'native:text-base text-base font-medium leading-none text-neutral-500 web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };