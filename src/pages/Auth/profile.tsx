import ProfileCard from '@/features/Profile/ProfileC'
import { Auth } from '@/features/auth/Auth'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
  return (
    <Auth>
      <ProfileCard></ProfileCard>
    </Auth>
  )
}

export default Profile