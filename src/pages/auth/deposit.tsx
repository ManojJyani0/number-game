
"use client"
import { Auth } from "@/features/auth/Auth";
import { depostAsync } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_NAME } from "../../../config";
import Head from "next/head";

type Props = {};


const Deposit = (props: Props) => {
  const [state, setState] = useState<number>(0);
  const [amount ,setAmount] = useState<number>(100)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  
  return (

    <Auth>
      <Head>
        <title>Deposit Your Dreams </title>
      </Head>
      {!router.isFallback && <p>loading....</p>}
      {state === 0 && (
        <Formik
          initialValues={{ amount: amount }}
          onSubmit={(value) => {
            if (value?.amount >= 100) {
              setState((currentState) => currentState + 1);
              setAmount(value.amount)
            }
          }}
          // validationSchema={SignupSchema}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='w-full flex flex-row flex-wrap box-border border-b-4'>
                          <div onClick={()=>setAmount(100)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl  hover:cursor-pointer'>100</div>
                          <div onClick={()=>setAmount(200)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl  hover:cursor-pointer'>200</div>
                          <div onClick={()=>setAmount(500)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>500</div>
                          <div onClick={()=>setAmount(1000)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>1000</div>
                          <div onClick={()=>setAmount(2000)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>2000</div>
                          <div onClick={()=>setAmount(5000)} className='m-2 px-6 py-2 text-white bg-green-400 rounded-xl hover:cursor-pointer '>5000</div>
                        </div>
              <label
                htmlFor="Amount"
                className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
              >
                Amount
              </label>
              <Field
                name="amount"
                type="number"
                className={
                  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                }
              />
              <div className="text-sm text-red-500">
                Alert! Minimum Procceding amount is 100.
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}

      {state === 1 && (
        <>
          <a
            href={`upi://pay?pa=9660119161@ybl&pn=Sunil Kumar Dudi=${amount}&cu=INR`}
            className="mt-4 text-white"
          >
            <button
              onClick={() => setState((currentState) => currentState + 1)}
              className={
                "bg-blue-700 mt-20 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
            >
              Prossed to Payment
            </button>{" "}
          </a>
        </>
      )}

      {state === 2 && (
        <>
          <Formik
            initialValues={{ UTR: "" }}
            onSubmit={async (value) => {
              if (value.UTR.length <= 10) {
                alert("Enter a Valied UTR Number Plzz...")
              } 
              else{
                dispatch(depostAsync({UTR:value.UTR,amount}))
                router.push("/auth/wallet",undefined,{shallow:true});
              }
            }}
            // validationSchema={SignupSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <label
                  htmlFor="Amount"
                  className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
                >
                  Submit Your Transaction UTR
                </label>
                <Field
                  name="UTR"
                  type="text"
                  className={
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                />
                <div className="text-sm text-red-500">
                  Alert! Every Refill Transaction need UTR number.
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Final Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {state !== 0 && (
        <button
          onClick={() => setState((currentState) => currentState - 1)}
          className={
            "bg-blue-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 mt-4 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
        >
          Back
        </button>
      )}
    </Auth>
  );
};

export default Deposit;
