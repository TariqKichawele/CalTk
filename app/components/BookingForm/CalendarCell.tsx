import React, { useRef } from 'react'
import { CalendarDate, getLocalTimeZone, isSameMonth, isToday } from '@internationalized/date';
import { useCalendarCell, useFocusRing, mergeProps } from 'react-aria';
import { CalendarState } from 'react-stately';
import { cn } from '@/lib/utils';

const CalendarCell = ({
    state,
    date,
    isUnavailable,
    currentMonth,
}: {
    state: CalendarState;
    date: CalendarDate;
    currentMonth: CalendarDate;
    isUnavailable: boolean;
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const {cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell({date}, state, ref);

    const finalIsDisabled = isUnavailable || isDisabled;

    const { focusProps, isFocusVisible } = useFocusRing();

    const isOutsideMonth = !isSameMonth(date, currentMonth);

    const isDateToday = isToday(date, getLocalTimeZone());
  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center text-sm font-semibold",
            finalIsDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            isFocusVisible ? "group-focus:z-2 ring-gray-12 ring-offset-1" : "",
            isSelected ? "bg-primary text-white" : "",
            !isSelected && !finalIsDisabled
              ? "hover:bg-blue-500/10 bg-secondary"
              : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  )
}

export default CalendarCell