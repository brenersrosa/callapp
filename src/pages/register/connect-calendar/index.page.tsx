import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { ArrowRight, Check, X } from 'lucide-react'

import { Box } from '@/components/global/Box'
import { Button } from '@/components/global/Button'
import { MultiStep } from '@/components/register/MultiStep'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <div className="mx-auto mb-4 mt-20 flex max-w-xl flex-col gap-6 px-4">
      <div className="flex flex-col gap-2 px-6">
        <strong className="text-2xl font-bold leading-normal">
          Conecte sua agenda!
        </strong>

        <span className="text-zinc-400">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </span>
      </div>

      <MultiStep size={4} currentStep={2} />

      <Box>
        <div className="flex items-center rounded-lg border border-zinc-600 px-6 py-4">
          <strong className="flex w-full">Google Calendar</strong>

          {isSignedId ? (
            <Button
              title="Conectado"
              icon={<Check size={20} />}
              variant="primary"
              disabled
            />
          ) : (
            <Button
              title="Conectar"
              icon={<ArrowRight size={20} />}
              variant="secondary"
              onClick={handleConnectCalendar}
            />
          )}
        </div>

        {hasAuthError && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <X className="h-8 w-8" />
            <span className="leading-relaxed">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </span>
          </div>
        )}

        <Button
          title="Proximo passo"
          icon={<ArrowRight size={20} />}
          onClick={() => router.push('/register/time-intervals')}
          disabled={!session}
        />
      </Box>
    </div>
  )
}
