import { Auth } from '@/features/auth/Auth'
import Footer from '@/features/footer/Footer'
import WithDrawal from '@/features/withdrawal/WithDrawal'
import React from 'react'

type Props = {}

const Withdrawal = (props: Props) => {
  return (
    <Auth>
        <WithDrawal/>
    </Auth>
  )
}

export default Withdrawal