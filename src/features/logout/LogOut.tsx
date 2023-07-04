import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { logout } from '../auth/authSlice'
export default function LogOut() {
  const router = useRouter()
  const dispatch = useDispatch()
  dispatch(logout())
  window.localStorage.clear()
  router.push("../../",undefined,{shallow:true})
  return<></>
}