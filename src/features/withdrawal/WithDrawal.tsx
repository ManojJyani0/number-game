'use client'
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withdrawalAsync } from "../auth/authSlice";
import { AppDispatch } from "@/store";
import { fetchBankAccounts } from "@/http";
import { AxiosResponse } from "axios";
import { IServerResponse } from "@/types";

interface BankAccount{
  accountHolderName:string,
  accountNumber:number,
  bankName:string,
  IFSC_code:string,
}
const WithDrawal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [initialValue,setInitialValue ] = useState({})
  const [bankAccounts,setAccounts]  = useState<BankAccount[]>([])
  const [selecet ,setSelected ] = useState<number>()
  const handleBankSelect =(index:number) => {
    setInitialValue({ accountHolderName:bankAccounts[index].accountHolderName,
    accountNumber:bankAccounts[index].accountNumber,
    bankName:bankAccounts[index].bankName,
    IFSC_code:bankAccounts[index].IFSC_code}
    )
  }
  const handleFetchAccount =async () => {
    const response:AxiosResponse<IServerResponse<BankAccount[]>> = await fetchBankAccounts();
    if(response.data.success){
      if(response.data.data?.length!==0){
          setAccounts(response.data.data)
      }
    }
  }
  return (
    <div className="mx-3 sm:justify-center md:items-center">
      <div>
            <button
              onClick={handleFetchAccount}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Fetch Accounts
            </button>
          </div>

      {
         bankAccounts?.length>0 &&
         bankAccounts?.map((bankAccount:BankAccount,index:number)=>{
            return <>
              <ul key={index}
              onClick={()=>{
                handleBankSelect(index)
                setSelected(index)
              }}
              className={`flex justify-around hover:cursor-pointer items-center ${selecet===index?"bg-gray-500":"bg-gray-50"}  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2`}>
                {`${index+1}. ${bankAccount.accountHolderName}  ${bankAccount.accountNumber}  ${bankAccount.bankName}`}
              </ul>
            </>
         })
         
      }

      <Formik
        initialValues={initialValue}
        onSubmit={(value)=>{
          dispatch(withdrawalAsync({...value}))
        }/*handleSubmit*/}
        // validationSchema={BankDetailSchema}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (

        <Form>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Add Your Banck Account
          </h5>
          <div className="mb-6">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Withdrawal amount
            </label>
            <Field
              type="number"
              name="amount"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1000/-"
              required={true}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="accountHolderName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Account Holder Name
              </label>
              <Field
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="bankName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bank Name
              </label>
              <Field
                type="text"
                name="bankName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="STATE BANK OF INIDA"
                required={true}
              />
            </div>

            <div>
              <label
                htmlFor="IFSC_CODE"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                IFSC CODE
              </label>
              <Field
                type="text"
                name="IFSC_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="SBIN0000000"
                required={true}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="accountNumber"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Account Number
            </label>
            <Field
              type="text"
              name="accountNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234567890"
              required={true}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmAccountNubmer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Account Number
            </label>
            <Field
              type="password"
              name="confirmAccountNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required={true}
              autucomplit={false}
            />
            {/* {errors?.confirmAccountNumber && <div className="text-red-500">{errors?.confirmAccountNumber}</div>} */}
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <Field
                name="agreement"
                type="checkbox"
                defaultValue=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required={true}
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <Field
                name="addToList"
                type="checkbox"
                defaultValue=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="addToList"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Add to Bank Account List
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              WITHDRAWAL
            </button>
          </div>
        </Form>)}
      </Formik>
    </div>
  );
};

export default WithDrawal;
