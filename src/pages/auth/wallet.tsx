import WalletCard from '@/features/Wallet/WalletCard'
import { Auth } from '@/features/auth/Auth'
import { Table } from '@/features/transactionTable/Table'
import Head from 'next/head'
import React from 'react'

type Props = {}

const wallet = (props: Props) => {
  return (
    <Auth>
      <Head>
        <title>Wallet Reffil and Withdrawal Your Money</title>
      </Head>
        <WalletCard/>
        <Table/>
    </Auth>
  )
}

export default wallet