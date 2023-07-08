"use client";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import { AppDispatch} from "@/store";
import {
  fetchUserInfo,
  logout,
  selectAuthToken,
  selectLoggedInUser,
  selectaccountVarification,
  setToken,
} from "./authSlice";
import { useEffect } from "react";
import Custom404 from "@/pages/404";
import OTPValidate from "../OTPvalidation";
import LogIn from "../LogIn/Login";
type Props = {};
export function Auth({ children }: Props & { children: React.ReactNode }) {
  const loggedInUser = useSelector(selectLoggedInUser);
  const accountVarification = useSelector(selectaccountVarification);
  const token = useSelector(selectAuthToken)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(setToken(localStorage.getItem("TOKEN")));
      dispatch(fetchUserInfo("hello"));
    }
  }, [loggedInUser]);

  if (loggedInUser && token) {
    return (
      <>
        {loggedInUser && !accountVarification ? (
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
        <LogIn/>
      </>
    );
  }
}
