'use client'
import Link from "next/link";
import React, { useEffect } from "react";
import { APP_ICON_LINK, APP_NAME } from "../../../config";
import Loader from "../loader";
import { useSelector } from "react-redux";
import { selectLoading } from "../auth/authSlice";

type Props = {};

const Navbar = (props: Props) => {
  const isLoading = useSelector(selectLoading)
  useEffect(()=>{
  },[isLoading])
  return (
    <>
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 border-b-2 rounded-lg my-2  `}>
        {/*${userInfo?.roleType!=="Admin"?"max-w-sm":""}`}>*/}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/auth" className="flex items-center rounded-sm">
            <span className="self-center text-2xl font-semibold bg-gradient-to-r from-blue-700 to-gray-700 bg-clip-text text-transparent">
              {APP_NAME}
            </span>
          </Link>
        </div>
      </nav>
      {isLoading=="loading" && <Loader/>}
    </>
  );
};

export default Navbar;
