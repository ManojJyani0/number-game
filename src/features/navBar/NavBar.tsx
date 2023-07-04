import Link from "next/link";
import React from "react";
import { APP_ICON_LINK, APP_NAME } from "../../../config";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 border-b-2 rounded-lg my-2  `}>
        {/*${userInfo?.roleType!=="Admin"?"max-w-sm":""}`}>*/}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="#" className="flex items-center">
            <img
              src={"#"||APP_ICON_LINK}
              className="h-8 mr-3"
              alt={`${APP_NAME} Logo`}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {APP_NAME}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
