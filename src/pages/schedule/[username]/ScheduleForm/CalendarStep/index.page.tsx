import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { Calendar } from '@/components/global/Calendar'
import { CalendarStepButton } from '@/components/schedule/CalendarStep/Button'

import { api } from '@/lib/axios'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export default function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availability, setAvailability] = useState<Availability | null>(null)

  const router = useRouter()
  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setAvailability(response.data)
      })
  }, [selectedDate, username])

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
        <div className="absolute bottom-0 right-0 top-0 flex w-80 flex-col gap-3 overflow-y-scroll p-6">
          <p className="font-medium">
            {weekDay}, <span className="text-zinc-400">{describedDate}</span>
          </p>

          <div className="w-full grid-cols-2 gap-2 lg:grid lg:grid-cols-1">
            {availability?.possibleTimes.map((hour) => {
              return (
                <CalendarStepButton
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </CalendarStepButton>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
