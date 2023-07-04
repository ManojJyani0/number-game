import { useSelector, useDispatch } from 'react-redux'

import Footer from '../footer/Footer'
import { RootState } from '@/store'
import { useRouter } from 'next/router'
import { fetchUserInfo } from './authSlice'
import { useEffect } from 'react'
type Props ={}
export function Auth({children}: Props & { children: React.ReactNode }) {
 const loggedInUser =  useSelector((state:RootState)=>state.auth.loggedInUser)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(()=>{
    if(loggedInUser){
    dispatch(fetchUserInfo())
    }
  },[loggedInUser])

  if(loggedInUser){
    return (
      <div>
        {children}
        <Footer/>
      </div>
    )
  }else{
    //todo there is a bug that was handle wy error handler page
    router.push('/',undefined,{shallow:true})
    return <>{children}</>
  }
}