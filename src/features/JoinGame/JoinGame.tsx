import { useSelector, useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { JoinGameAsync, selectContestId } from './Slice'
type props ={
  setOpen :React.Dispatch<boolean>;
  number:number|undefined
}
export function JoinGame({setOpen,number}:props) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>()
  const contestId = useSelector(selectContestId);
  return (
    <div>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className='w-full flex flex-row flex-wrap box-border border-b-4'>
                          <div onClick={()=>setAmount(20)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl  hover:cursor-pointer'>20</div>
                          <div onClick={()=>setAmount(50)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl  hover:cursor-pointer'>50</div>
                          <div onClick={()=>setAmount(100)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>100</div>
                          <div onClick={()=>setAmount(200)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>200</div>
                          <div onClick={()=>setAmount(500)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>500</div>
                          <div onClick={()=>setAmount(1000)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>1000</div>
                        </div>
                        <div className="mt-2">
                          <Formik
                            initialValues={{ betAmount: amount }}
                            onSubmit={(value)=>{
                              dispatch(JoinGameAsync({...value,number,contestId}))
                            }}
                            enableReinitialize={true}
                          >
                            {({ errors, touched }) => (
                              <Form>
                                <label
                                  htmlFor="betAmount"
                                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                                >
                                  Amount
                                </label>
                                <Field
                                  name="betAmount"
                                  type="number"
                                  className={
                                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  }
                                />
                                <div className="text-sm text-red-500">
                                  Alert! Every Refill Transaction need UTR
                                  number.
                                </div>
                                <div className="mt-3 flex">
                                  <button
                                    type="button"
                                    className="text-white bg-red-700 mx-2 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    onClick={() => setOpen(false)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                    Join Game
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  )
}