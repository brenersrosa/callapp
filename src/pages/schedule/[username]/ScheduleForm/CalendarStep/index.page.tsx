import { useState } from 'react'
import clsx from 'clsx'

import { Calendar } from '@/components/global/Calendar'
import { CalendarStepButton } from '@/components/schedule/CalendarStep/Button'

export default function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  return (
    <div
      className={clsx(
        'relative mx-auto mb-0 grid max-w-full divide-x divide-zinc-700 rounded-lg border border-zinc-700 bg-zinc-800',
        {
          'w-[540px] grid-cols-1': isDateSelected === false,
          'grid-cols-1 lg:grid-cols-custom': isDateSelected === true,
        },
      )}
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <div className="absolute bottom-0 right-0 top-0 flex w-72 flex-col gap-3 overflow-y-scroll p-6">
          <p className="font-medium">
            terça-feira, <span className="text-zinc-400">20 de setembro</span>
          </p>

          <div className="w-full grid-cols-2 gap-2 lg:grid lg:grid-cols-1">
            <CalendarStepButton disabled>9:00h</CalendarStepButton>
            <CalendarStepButton>10:00h</CalendarStepButton>
            <CalendarStepButton>11:00h</CalendarStepButton>
            <CalendarStepButton>12:00h</CalendarStepButton>
            <CalendarStepButton>13:00h</CalendarStepButton>
            <CalendarStepButton>14:00h</CalendarStepButton>
            <CalendarStepButton>15:00h</CalendarStepButton>
            <CalendarStepButton>16:00h</CalendarStepButton>
            <CalendarStepButton>17:00h</CalendarStepButton>
            <CalendarStepButton>18:00h</CalendarStepButton>
          </div>
        </div>
      )}
    </div>
  )
}
