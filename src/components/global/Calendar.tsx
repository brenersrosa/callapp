import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import dayjs from 'dayjs'

import { getWeekDays } from '@/utils/get-week-days'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMonthDate)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )

    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <p className="font-medium capitalize">
          {currentMonth} <span className="text-zinc-400">{currentYear}</span>
        </p>

        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            title="Previous month"
            className="flex cursor-pointer items-center justify-center rounded-sm p-1 leading-[0] transition-colors hover:bg-zinc-700"
          >
            <ChevronLeft className="h-5 w-5 text-zinc-200" />
          </button>

          <button
            onClick={handleNextMonth}
            title="Next month"
            className="flex cursor-pointer items-center justify-center rounded-sm p-1 leading-[0] transition-colors hover:bg-zinc-700"
          >
            <ChevronRight className="h-5 w-5 text-zinc-200" />
          </button>
        </div>
      </div>

      <table className="mt-6 w-full table-fixed border-spacing-1">
        <thead>
          <tr className="text-sm font-medium text-zinc-400">
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody className="before:block before:leading-3 before:text-zinc-800 before:content-['.']">
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()} className="box-border p-[2px]">
                      <button
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                        className="aspect-square w-full cursor-pointer rounded-lg bg-zinc-700 text-center transition-colors hover:bg-zinc-600 focus:shadow-md disabled:cursor-default disabled:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-zinc-800"
                      >
                        {date.get('date')}
                      </button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
