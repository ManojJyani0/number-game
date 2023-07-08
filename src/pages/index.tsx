"use client"
import LogIn from '@/features/LogIn/Login'
import Head from 'next/head'
import { APP_NAME } from '../../config'
export default function Home() {
  return (
    <main >
      <Head>
        <title>Welcome to {APP_NAME}Login</title>
      </Head>
      <LogIn/>
    </main>
  )
}
