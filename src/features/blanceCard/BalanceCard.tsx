"use client"
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useRouter } from 'next/router'
import { fetchCurrentGame } from '../JoinGame/Slice'
export default function BalanceCard() {
  const amount = useSelector((state:RootState) => state.auth.amount)
  const dispatch = useDispatch<AppDispatch>()
const router = useRouter()
  return (
    <div className={`flex flex-col `}>
    <div className='bg-red border-b-2 mx-4 py-4'>
      <h6>Available balance: { amount} coins</h6>
      <div className='flex justify-between items-center'>
        <button
          onClick={() => {
            router.push('/auth/wallet');
          }}
          className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Recharge
        </button>
        <button
          type='button'
          onClick={()=>dispatch(fetchCurrentGame())}
          className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
          // data-modal-hide='staticModal'
          >
          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-refresh-cw'>
            <polyline points='23 4 23 10 17 10' />
            <polyline points='1 20 1 14 7 14' />
            <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' />
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}