import { TextInput } from 'react-native';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { primary } from '@/config/colors';
import { cn } from '@/lib/utils';

const Input = forwardRef<ElementRef<typeof TextInput>, ComponentPropsWithoutRef<typeof TextInput>>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        selectionColor={primary[500]}
        ref={ref}
        className={cn(
          'native:h-12 native:text-lg native:leading-[1.25] h-10 rounded-md border border-input bg-background px-3 text-lg text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-300 web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring web:focus-visible:ring-offset-0 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 lg:text-sm',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-neutral-300', placeholderClassName)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
