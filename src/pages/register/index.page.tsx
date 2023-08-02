import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'

import { MultiStep } from '@/components/register/MultiStep'
import { Box } from '@/components/global/Box'
import { Input } from '@/components/global/Input'
import { Button } from '@/components/global/Button'

import { api } from '@/lib/axios'
import { useToast } from '@/contexts/ToastContext'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 caracteres.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  const searchParams = useSearchParams()

  const { showToast } = useToast()

  useEffect(() => {
    if (searchParams.get('username')) {
      setValue('username', String(searchParams.get('username')))
    }
  }, [searchParams, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        username: data.username,
        name: data.name,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data) {
        console.log(err.response.data)

        showToast('Falha!', 'Este usuário já existe.', 'error')

        return
      }
      console.log(err)
    }
  }

  return (
    <div className="mx-auto mb-4 mt-20 flex max-w-xl flex-col gap-6 px-4">
      <div className="flex flex-col gap-2 px-6">
        <strong className="text-2xl font-bold leading-normal">
          Bem-vindo ao Ignite Call!
        </strong>

        <span className="text-zinc-400">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </span>
      </div>

      <MultiStep size={4} currentStep={1} />

      <Box as="form" onSubmit={handleSubmit(handleRegister)}>
        <Input
          label="Nome de usuário"
          prefix="callapp.com/"
          placeholder="seu-usuario"
          {...register('username')}
          message="Informe o seu nome de usuário."
          error={errors.username}
          info
          autoFocus
        />

        <Input
          label="Nome completo"
          placeholder="Seu nome"
          {...register('name')}
          message="Informe seu nome completo."
          info
          error={errors.name}
        />

        <Button
          type="submit"
          title="Próximo passo"
          icon={<ArrowRight size={20} />}
        />
      </Box>
    </div>
  )
}
