"use client";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import { AppDispatch, RootState } from "@/store";
import {
  fetchUserInfo,
  logout,
  selectaccountVarification,
  setToken,
} from "./authSlice";
import { useEffect } from "react";
import Custom404 from "@/pages/404";
import OTPValidate from "../OTPvalidation";
type Props = {};
export function Auth({ children }: Props & { children: React.ReactNode }) {
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser
  );
  const accountVarification = useSelector(selectaccountVarification);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(setToken(localStorage.getItem("TOKEN")));
      dispatch(fetchUserInfo("hello"));
    }
  }, [loggedInUser]);

  if (loggedInUser) {
    return (
      <>
        {!accountVarification ? (
          <>
          <OTPValidate/>
          </>
        ) : (
          <div>
            {children}
            <Footer />
          </div>
        )}
      </>
    );
  } else {
    dispatch(logout(""))
    return (
      <>
        <Custom404 />
      </>
    );
  }
}
