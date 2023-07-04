// import { login } from '@/http'
import { RootState } from "@/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { depositRequest, login, me, signup, withdrawalRequest } from "@/http";
import { IServerResponse, ISignUpCredential } from "@/types";

const initialState = {
  loggedInUser: false,
  _id:"",
  token: "",
  status: "idle",
  name: "",
  mobile: 0,
  roleType: "",
  accountVarification: false,
  amount: 0,
  winningCoins:0
};

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (value:ISignUpCredential) => {
    const response:AxiosResponse<IServerResponse<string>> = await signup(value);
    return response.data;
  }
)
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (value: any) => {
    const response: AxiosResponse = await login(value);
    return response.data;
  }
);
export const fetchUserInfo = createAsyncThunk(
  "auth/user",
  async () => {
    const response: AxiosResponse/*<IServerResponse<IUserInfo>>*/ = await me();
    return response.data;
  }
);
//dipost async thunk

export const depostAsync = createAsyncThunk("auth/deposit",async(value)=>{
  const response :AxiosResponse = await depositRequest(value);
  return response.data;
})
//withdrawal async thunck
export const withdrawalAsync = createAsyncThunk("auth/withdrawal",async(value)=>{
  const response :AxiosResponse = await withdrawalRequest(value);
  return response.data;
})
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state=initialState;
      window.location.href="/";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signupAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(signupAsync.fulfilled, (state, action) => {
      state.status = "idle";
      console.log(action.payload.data)
      state.token = action.payload.data;
      state.loggedInUser = true;
    })
    .addCase(signupAsync.rejected, (state) => {
      state.status = "idle";
      state.token = "";
    })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload;
        state.loggedInUser = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "idle";
        state.token = "";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.amount = action.payload.amount;
        state.roleType = action.payload.roleType;
        state.mobile = action.payload.mobile;
        state.accountVarification = action.payload.accountVarification;
        state.winningCoins = action.payload.winningCoins
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(depostAsync.pending,(state)=>{
        state.status="Loading"
      })
      .addCase(depostAsync.fulfilled,(state)=>{
        state.status="idle"
      })
      .addCase(depostAsync.rejected,(state)=>{
        state.status = "idle"
        //todo there is doing for some notification 0r totstyfy code here
      }).addCase(withdrawalAsync.pending,(state)=>{
        state.status="Loading"
      })
      .addCase(withdrawalAsync.fulfilled,(state)=>{
        state.status="idle"
      })
      .addCase(withdrawalAsync.rejected,(state)=>{
        state.status = "idle"
        //todo there is doing for some notification 0r totstyfy code here
      })


  },
});
export const selectUserData = (state:RootState) =>state.auth
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectAuthToken = (state:RootState) => state.auth.token;

export const {logout} = authSlice.actions;

export default authSlice.reducer;
