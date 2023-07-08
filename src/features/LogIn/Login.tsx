"use client"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { selectLoggedInUser, loginAsync, selectAuthToken, setToken } from '../auth/authSlice'
import {
  Formik,
  Form,
  Field,
} from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ILoginCredential } from '@/types'
import { useEffect } from 'react'
export default function LogIn() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  const loggedInUser = useSelector(selectLoggedInUser)
  const token = useSelector(selectAuthToken)
  useEffect(()=>{
    if(loggedInUser){
      window.localStorage.setItem("TOKEN",token)
      router.push("/auth",undefined,{shallow:true})
    }
  },[loggedInUser])

  useEffect(()=>{
    let token:string|null|undefined = window.localStorage.getItem("TOKEN");
    if(token){
      dispatch(setToken(token))
    }
  },[])
  const handleSubmit =(value:ILoginCredential) => {
    dispatch(loginAsync(value));
    
  }
  return (
    <div>
      <div>
        <div className="mx-3 sm:justify-center md:items-center">

          <Formik
            initialValues={{ password: "", mobile: "" }}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User ID
                </label>
                <Field
                  name="mobile"
                  type="text"
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                />
                {errors.mobile && (
                  <div className="text-sm text-red-500">{errors.mobile}</div>
                )}
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                />
                {errors.password && (
                  <div className="text-sm text-red-500">{errors.password}</div>
                )}

                <div className="mt-3">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    LogIn
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-3">
                    Not Regestred?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}