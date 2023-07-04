import WalletCard from '@/features/Wallet/WalletCard'
import { Auth } from '@/features/auth/Auth'
import { Table } from '@/features/transactionTable/Table'
import React from 'react'

type Props = {}

const wallet = (props: Props) => {
  return (
    <Auth>
        <WalletCard/>
        <Table/>
    </Auth>
  )
}

export default wallet