"use client";
import PinInput from "react-pin-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { SubmitOTPAsync } from "../auth/authSlice";
import { genrateOTP } from "@/http";
import { AxiosResponse } from "axios";
import { IServerResponse } from "@/types";

type Props = {};


const OTPValidate = (props: Props) => {
  const [OTP, setOTP] = useState<string>("");
  const [send, setSend] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()
  const [sid, setSID] = useState<string>("")
  
  
  const handleSendOTP =async () => {
    const response :AxiosResponse<IServerResponse<any>> = await genrateOTP();
    if(response.status==200){
      alert("OTP send SuccessFully");
      setSend(true)
      setSID(response.data.data?.sid)
    }else{
      alert(response.data.data.message)
    }
  }
  return (
    <>
      {/* component */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-2">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Mobile Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your Mobile +91</p>
            </div>
          </div>
            <div>
          {
             !send? <button
                onClick={handleSendOTP}
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
              >
                Send OTP
              </button>
              :
              <div className="flex flex-col space-y-16">
                <div className="flex justify-center">
                  <PinInput
                    length={6}
                    initialValue=""
                    secretDelay={200}
                    onChange={(value, index) => {}}
                    type="numeric"
                    inputMode="number"
                    //   style={{ padding: "5px" }}
                    inputStyle={{
                      borderRadius: "10px",
                      borderColor: "dark-blue",
                    }}
                    inputFocusStyle={{ borderColor: "blue" }}
                    onComplete={(value: any, index) => {
                      setOTP(value);
                    }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  />
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="px-4">
                    <button
                      onClick={() => dispatch(SubmitOTPAsync({OTP,sid}))}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <button
                      className="flex flex-row items-center text-blue-600"
                      onClick={handleSendOTP }
                      rel="noopener noreferrer"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              </div>
          }
            </div>
        </div>
      </div>
    </>
  );
};

export default OTPValidate;
