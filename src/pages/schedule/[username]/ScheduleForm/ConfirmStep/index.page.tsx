import { useRouter } from 'next/router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, CheckCircle, Clock } from 'lucide-react'
import dayjs from 'dayjs'
import colors from 'tailwindcss/colors'
import { toast } from 'react-hot-toast'

import { Input } from '@/components/global/Input'
import { Box } from '@/components/global/Box'
import { TextArea } from '@/components/global/TextArea'
import { Button } from '@/components/global/Button'

import { api } from '@/lib/axios'

const confirmStepSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  observations: z.string(),
})

type ConfirmStepData = z.infer<typeof confirmStepSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onReturnToCalendar: () => void
}

export default function ConfirmStep({
  schedulingDate,
  onReturnToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepData>({
    resolver: zodResolver(confirmStepSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmStepData) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    toast.error('Agendamento realizado com sucesso!', {
      position: 'top-right',
      style: {
        backgroundColor: colors.green[500],
        color: colors.white,
        fontSize: 16,
        fontWeight: 500,
        padding: 16,
      },
      icon: <CheckCircle size={24} className="text-zinc-50" />,
    })

    onReturnToCalendar()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <Box
      as="form"
      className="mx-auto w-[540px] gap-6 divide-y divide-zinc-600"
      onSubmit={handleSubmit(handleConfirmScheduling)}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-zinc-400" />
          <span>{describedDate}</span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <Clock className="h-5 w-5 text-zinc-400" />
          <span>{describedTime}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-6">
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          message="Informe seu nome completo."
          {...register('name')}
          info
          error={errors.name}
        />

        <Input
          label="Endereço de e-mail"
          placeholder="johndoe@gmail.com"
          message="Informe seu melhor e-mail."
          {...register('email')}
          info
          error={errors.email}
        />

        <TextArea
          label="Observações"
          {...register('observations')}
          error={errors.observations}
        />

        <div className="grid grid-cols-4 gap-2">
          <Button
            title="Cancelar"
            type="button"
            onClick={onReturnToCalendar}
            variant="cancel"
            className="col-start-3"
          />

          <Button
            title="Confirmar"
            type="submit"
            disabled={isSubmitting}
            className="col-start-4"
          />
        </div>
      </div>
    </Box>
  )
}
