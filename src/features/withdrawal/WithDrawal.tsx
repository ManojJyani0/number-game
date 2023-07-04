// import { withdrawalRequest } from "@/http";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withdrawalAsync } from "../auth/authSlice";
// import * as Yup from 'yup'
type Props = {}
// const BankDetailSchema = Yup.object().shape({
//   accountHolderName: Yup.string().min(4).max(20),
//   bankName: Yup.string().min(8).max(20),
//   accountNumber: Yup.string(),
//   IFSCE_code: Yup.string(),
//   confirmAccountNumber: Yup.string()
//   .oneOf([Yup.ref('accountNumber'),""], 'Account Number must be match'),
//   agreement:Yup.boolean(),
//   amount:Yup.number()
//   });
//   const handleSubmit =async (value:any) => {
//     const response = await withdrawalRequest(value);
//     console.log(value)
//     console.log(response)
//   }
const WithDrawal = (props: Props) => {
  const dispatch = useDispatch()
  return (
    <div className="mx-3 sm:justify-center md:items-center">
      <Formik
        initialValues={{}}
        onSubmit={(value)=>{
          dispatch(withdrawalAsync(value))
        }/*handleSubmit*/}
        // validationSchema={BankDetailSchema}
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
