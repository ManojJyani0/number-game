import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'

import { useRouter } from 'next/router'
import { Auth } from '../auth/Auth'

type Props = {}

const ProfileCard = (props: Props) => {
  const userInfo = useSelector((state:RootState) => state.auth)
    const router = useRouter()
    return (
      <Auth>
        <div className='flex mx-2 flex-col  justify-between items-center' style={{height:"75vh"}}>
            <div className=" flex flex-col justify-center items-center max-w-sm p-6 w-full mx-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                </div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {userInfo.name}
                </h5>
                <h6 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Mobile : {userInfo.mobile}
                </h6>
                <h6 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Balance : {userInfo.amount}
                </h6>

            </div>
            <div className='flex flex-col justify-center items-center w-full'>
            <button
                    onClick={()=>router.push("/Auth/logout")}
                    className={`text-white my-2 sm:w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                    Log Out
                </button>
            </div>


        </div>
      </Auth>
    )
}

export default ProfileCard