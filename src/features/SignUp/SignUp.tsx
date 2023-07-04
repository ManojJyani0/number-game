import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,} from 'formik'
import { ToastContainer } from 'react-toastify'
// import  Yup from 'yup'
import Link from 'next/link'
export default function SignUp() {
  const dispatch = useDispatch()

  return (
    <div className="mx-3 sm:justify-center md:items-center">
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <Formik
      initialValues={{ name: "", mobile: "",password:"",confirmPassword:""}}
      onSubmit={()=>{}/*handleSigUp*/}
      // validationSchema={SignupSchema}
    >{({ errors, touched }) => (

      <Form>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <Field
              name="name"
              type="text"
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }
            />
            {errors.name && touched && <div className="text-sm text-red-500">{errors.name}</div>}
          
        </div>
        <label
          htmlFor="mobile"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mobile Number
        </label>
        <Field
          name="mobile"
          type="number"
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }
        />
        {errors.mobile && <div className="text-sm text-red-500">{errors.mobile}</div>}
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
        {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <Field
          name="confirmPassword"
          type="password"
          className={
            `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
          }
        />
        <label
          htmlFor="promo_code"
          className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
        >
          PROMO CODE <span className='text-sm'>if Avalable</span>
        </label>
        <Field
          name="promo_code"
          type="text"
          className={
            `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`
          }
        />
        {errors.confirmPassword && <div className="text-sm text-red-500">{errors.confirmPassword}</div>}
        <Field
          name="agreement"
          type="checkbox"
          className="w-4 h-4 mt-3 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          required={true}
        />
        <label
          htmlFor="remember"
          className="ml-2 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <Link
            href="https://www.privacypolicygenerator.info/live.php?token=3euOqge9Y6o5D86JZa8KjEpAvbhcjUmW"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </Link>
          .
        </label>
        <div className="mt-3">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SignUp
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-3">
          Do You have a Account?{" "}
          <Link
            href="/"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Login to your Account
          </Link>
        </div>

        </div>
      </Form>)}
    </Formik>
  </div>
  )
}