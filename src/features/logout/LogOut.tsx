"use client"
import { useDispatch } from 'react-redux'
import { logout } from '../auth/authSlice'
import { AppDispatch } from '@/store'
export default function LogOut() {
  const dispatch = useDispatch<AppDispatch>()
  dispatch(logout(""))
  return<>
    </>
}