import { useState, useCallback, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'lucide-react'
import { z } from 'zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { MultiStep } from '@/components/register/MultiStep'
import { Box } from '@/components/global/Box'
import { Loading } from '@/components/global/Loading'
import { Avatar } from '@/components/global/Avatar'
import { TextArea } from '@/components/global/TextArea'
import { Button } from '@/components/global/Button'
import { Select } from '@/components/global/Select'

import { api } from '@/lib/axios'

import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'

interface CalendarItem {
  id: string
  summary: string
}

const updateProfileSchema = z.object({
  // scheduleName: z.string(),
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const [schedules, setSchedules] = useState<CalendarItem[]>([])

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  const username = session.data?.user.username

  const fetchSchedules = useCallback(async () => {
    try {
      const response = await api.get(
        `http://localhost:3000/api/users/${username}/list-calendars`,
      )

      if (!response) {
        throw new Error('Failed to fetch calendars from Google.')
      }

      const { calendars } = await response.data

      const uniqueSchedules = calendars.reduce(
        (unique: CalendarItem[], current: CalendarItem) => {
          const existingIndex = unique.findIndex(
            (item) => item.summary === current.summary,
          )
          if (existingIndex === -1) {
            unique.push(current)
          }
          return unique
        },
        [],
      )

      setSchedules(uniqueSchedules)
    } catch (err) {
      console.error(err)
    }
  }, [username])

  useEffect(() => {
    fetchSchedules()
  }, [session, fetchSchedules])

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
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

      <MultiStep size={4} currentStep={4} />

      <Box as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="flex flex-col gap-2">
          <label className="text-sm leading-relaxed text-zinc-100">
            Foto de perfil
          </label>

          {!session.data?.user.avatar_url && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-700">
              <Loading />
            </div>
          )}

          {session.data?.user.avatar_url && (
            <Image
              src={session.data?.user.avatar_url}
              alt="Profile image"
              className="rounded-full"
              width={64}
              height={64}
            />
          )}

          {session.data?.user.avatar_url === '' && (
            <Avatar name={session.data.user.username} />
          )}
        </div>

        <TextArea
          label="Sobre você"
          {...register('bio')}
          complement="Fale um pouco sobre você. Isto será exibido em sua página pessoal."
          totalCharacters={watch('bio') ? watch('bio').length : 0}
        />

        <Button
          type="submit"
          title="Finalizar"
          icon={<ArrowRight size={20} />}
          disabled={isSubmitting}
        />
      </Box>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
