import { Button } from '@/components/ui/button';
import React, { useRef } from 'react'
import { type AriaButtonProps, useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import type { CalendarState } from '@react-stately/calendar';

const CalendarButton = (
    props: AriaButtonProps<"button"> & {
        state?: CalendarState;
        side?: "left" | "right";
    }
) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();

  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      disabled={props.isDisabled}
      variant="outline"
      size="icon"
    >
      {props.children}
    </Button>
  )
}

export default CalendarButton