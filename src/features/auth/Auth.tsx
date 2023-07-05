"use client";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../footer/Footer";
import { AppDispatch, RootState } from "@/store";
import { fetchUserInfo, setToken } from "./authSlice";
import { useEffect } from "react";
import Custom404 from "@/pages/404";
type Props = {};
export function Auth({ children }: Props & { children: React.ReactNode }) {
  const loggedInUser = useSelector(
    (state: RootState) => state.auth.loggedInUser
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (loggedInUser) {
      dispatch(setToken(localStorage.getItem("TOKEN")))
      dispatch(fetchUserInfo("hello"))
    }
  }, [loggedInUser]);
  if (loggedInUser) {
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  } else {
    return <>
      <Custom404/>
    </>;
  }
}
