import '../lib/dayjs'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

import '@/styles/globals.css'
import { ToastProvider } from '@/contexts/ToastContext'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
