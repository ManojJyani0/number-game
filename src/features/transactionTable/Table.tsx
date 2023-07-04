'use client'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { fetchTransactionAsync } from "../auth/authSlice";
export function Table() {
  const transcations = useSelector((state: RootState) => state.auth.transactions);
  const dispatch = useDispatch<AppDispatch>();
  const [number,setNumber] = useState<number>(10)
  useEffect(()=>{
    dispatch(fetchTransactionAsync())
  },[])

  return (
    <div>
      <div className="flex justify-center items-center">
        <button className="mt-4 w-72 bg-blue-700 text-white px-4 rounded-xl py-3"
        onClick={()=>setNumber(transcations.length)}
        >
          See all Trasactions
        </button>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-1 py-4 mx-2">
          <div className=" w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap border-2">
              <thead>
                <tr className="border-x-2">
                  <th className="px-1 w-6/12 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Tran - Id
                  </th>
                  <th className="px-4 w-3/12 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Type
                  </th>
                  <th className="px-4 w-2/12 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Status
                  </th>
                  <th className="px-4 w-1/12 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transcations.slice(0,number)?.map((transcation:any, index:number) => (
                  <tr
                    key={index}
                    className={`${
                      transcation.status === "Success"
                        ? "bg-green-200"
                        : transcation.status === "Pending"
                        ? "bg-yellow-200"
                        : "bg-red-200"
                    } rounded-sm my-2 border-b-2 w-6/12`}
                  >
                    <td className="px-1 py-3">
                      {transcation.UTR?.substring(0, 11) + "..."}
                    </td>
                    <td className="px-1 py-2 w-3/12">{transcation.transactionType}</td>
                    <td className="px-1 py-2 w-2/12 ">{transcation.status}</td>
                    <td className="px-1 py-2 w-1/12 text-lg text-gray-900 text-right">
                      {transcation.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
