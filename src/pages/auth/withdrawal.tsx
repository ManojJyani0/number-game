import { Auth } from '@/features/auth/Auth'
import WithDrawal from '@/features/withdrawal/WithDrawal'
import React from 'react'

type Props = {}

const withdrawal = (props: Props) => {
  return (
    <Auth>
    <WithDrawal/>
  </Auth>
)}

export default withdrawal