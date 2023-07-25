import Image from 'next/image'

import { ClaimUsernameForm } from '@/components/home/ClaimUsernameForm'

import previewImage from '../assets/app-preview.png'
import grid from '../assets/grid.svg'

export default function Home() {
  return (
    <div className="ml-auto flex min-h-screen max-w-[calc(100vw-(100vw-1160px)/2)] items-center gap-20">
      <div className="relative flex flex-1 flex-col gap-6 px-10 py-0">
        <h1 className="max-w-lg text-6xl font-extrabold leading-tight text-white">
          Agendamento descomplicado
        </h1>

        <span className="max-w-lg text-xl font-light leading-relaxed text-zinc-200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </span>

        <ClaimUsernameForm />

        <Image
          src={grid}
          alt="grid"
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="">
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="App call preview."
        />
      </div>
    </div>
  )
}
