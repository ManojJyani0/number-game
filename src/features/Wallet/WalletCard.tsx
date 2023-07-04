import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../auth/authSlice";

type Props = {};
const WalletCard = (props: Props) => {
  const router = useRouter();
  const userInfo = useSelector(selectUserData);
  return (
    <div className="flex flex-col items-center justify-center bg-[#ffffff] ">
      {/* main card */}

      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <svg
          className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
            clipRule="evenodd"
          />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Total Amount : {userInfo?.amount}
        </h5>

        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          Total Winning Amount : {userInfo?.winningCoins}
        </p>
        <div className="flex flex-col w-72">
          <button className="mt-2 bg-orange-700 text-white px-4 rounded-xl py-3"
          onClick={()=>router.push("/Auth/deposit")}>
            Deposit Funds
          </button>
          <button className="mt-2 bg-green-900 text-white px-4 rounded-xl py-3"
          onClick={()=>router.push("/Auth/withdrawal")}>
            Withdrawal funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
