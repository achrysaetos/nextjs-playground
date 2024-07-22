import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { supabase } from '@/lib/client'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}