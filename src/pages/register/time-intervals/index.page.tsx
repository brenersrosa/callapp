import { ArrowRight } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { MultiStep } from '@/components/register/MultiStep'
import { Box } from '@/components/global/Box'
import { Checkbox } from '@/components/global/Checkbox'
import { Input } from '@/components/global/Input'
import { Button } from '@/components/global/Button'

import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { api } from '@/lib/axios'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do início!',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>

type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  function isInvalidEndTime(startTime: string, endTime: string) {
    if (!startTime || !endTime) {
      return false
    }

    const startTimeInMinutes = convertTimeStringToMinutes(startTime)
    const endTimeInMinutes = convertTimeStringToMinutes(endTime)

    return endTimeInMinutes < startTimeInMinutes + 60
  }

  async function handleSetTimeIntervals(data: unknown) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', { intervals })

    await router.push('/register/update-profile')
  }

  return (
    <div className="mx-auto mb-4 mt-20 flex max-w-xl flex-col gap-6 px-4">
      <div className="flex flex-col gap-2 px-6">
        <strong className="text-2xl font-bold leading-normal">Quase lá!</strong>

        <span className="text-zinc-400">
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </span>
      </div>

      <MultiStep size={4} currentStep={3} />

      <Box as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <div className="divide-y divide-zinc-700 rounded-lg border border-zinc-700">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <span className="text-sm text-zinc-100">
                    {weekDays[field.weekDay]}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="time"
                    step={60}
                    min="00:00"
                    max="23:59"
                    {...register(`intervals.${index}.startTime`)}
                    disabled={intervals[index].enabled === false}
                  />

                  <Input
                    type="time"
                    step={60}
                    min={intervals[index].startTime}
                    max="23:59"
                    {...register(`intervals.${index}.endTime`)}
                    disabled={intervals[index].enabled === false}
                    isInvalid={isInvalidEndTime(
                      intervals[index].startTime,
                      intervals[index].endTime,
                    )}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <Button
          title="Proximo passo"
          icon={<ArrowRight size={20} />}
          disabled={
            isSubmitting || intervals.every((interval) => !interval.enabled)
          }
        />
      </Box>
    </div>
  )
}
