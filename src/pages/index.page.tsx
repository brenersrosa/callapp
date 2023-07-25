import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main
      className={`flex h-screen w-screen items-center justify-center ${roboto.className} bg-zinc-900 text-zinc-100`}
    >
      <span>D3V</span>
    </main>
  )
}
