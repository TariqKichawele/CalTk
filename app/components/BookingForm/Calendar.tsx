import React from 'react'
import { useLocale, CalendarProps, DateValue, useCalendar } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import CalendarHeader from '@/app/components/BookingForm/CalendarHeader';
import CalendarGrid from '@/app/components/BookingForm/CalendarGrid';

const Calendar = ( props: CalendarProps<DateValue> & { isDateUnavailable: (date: DateValue) => boolean; }) => {
    const { locale } = useLocale();
    const state = useCalendarState({
      ...props,
      visibleDuration: { months : 1 },
      locale,
      createCalendar,
    });

    const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state);
  return (
    <div {...calendarProps} className="inline-block ">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid
          state={state}
          isDateUnavailable={props.isDateUnavailable}
        />
      </div>
    </div>
  )
}

export default Calendar