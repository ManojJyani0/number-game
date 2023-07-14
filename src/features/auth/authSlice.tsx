// import { login } from '@/http'
import { AsyncThunkConfig, RootState } from "@/store";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { depositRequest, fetchTransactions, joinGame, login, me, signup, verifyOTP, withdrawalRequest } from "@/http";
import { IServerResponse, IUserInfo } from "@/types";
import { AxiosResponse } from "axios";
interface Transaction {
  UTR: string;
  amount: number;
  status: "Success" | "Failed" | "Pending" | "";
  transactionType: "Deposit" | "Withdrawal" | "JoinGame" | "PriceMoney" | "";
}
interface InitialState {
  loggedInUser: boolean;
  token: string;
  _id: string;
  name: string;
  mobile: number;
  roleType: string;
  accountVarification: boolean;
  amount: number;
  winningCoins?: number | undefined | string;
  status?: string;
  transactions: Transaction[],
  joined:boolean,
  notification :{
    type:string,
    message: string,
  },
  upi:string;
  
}
const initialState: InitialState = {
  loggedInUser: false,
  _id: "",
  token: "",
  status: "idle",
  name: "",
  mobile: 0,
  roleType: "",
  accountVarification: false,
  amount: 0,
  winningCoins: 0,
  transactions: [{
    UTR: "",
    amount: 0,
    status: "",
    transactionType: ""
  }],
  joined:false,
  notification:{
    type:"",
    message:""
  },
  upi:""
};
export const fetchTransactionAsync = createAsyncThunk<Transaction[],void,AsyncThunkConfig>("auth/transaction", async () => {
  const response: AxiosResponse<IServerResponse<Transaction[]>> = await fetchTransactions();
  return response.data.data;
})
export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (value: any,{rejectWithValue}) => {
    try {
      const response: AxiosResponse<IServerResponse<string>> = await signup(
        value
      );
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const JoinGameAsync = createAsyncThunk<any, any, AsyncThunkConfig>(
  "auth/join",
  async (value, { rejectWithValue }) => {
    try {
      const response = await joinGame(value);
      return response.data.data;
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (value: any, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IServerResponse<string>> = await login(
        value
      );
      console.log(response);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchUserInfo = createAsyncThunk<IUserInfo,string, AsyncThunkConfig>("auth/user", async ( value,{rejectWithValue}) => {
  try {
    const response: AxiosResponse<IServerResponse<IUserInfo>> = await me();
    return response.data.data;

  } catch (error:any) {
    return rejectWithValue(error.response.data)
  }
});
//OTP handiling async thunk
export const SubmitOTPAsync = createAsyncThunk<any ,any, AsyncThunkConfig>(
  "auth/SubmitOTP",
  async (value, {rejectWithValue}) => {
    try {
      const response = await verifyOTP(value);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data);
    }
  }
)
//dipost async thunk
export const depostAsync = createAsyncThunk<any, any, AsyncThunkConfig>(
  "auth/deposit",
  async (value, {rejectWithValue}) => {
    try {
      const response: AxiosResponse = await depositRequest(value);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data)
    }
  }
);
//withdrawal async thunck
export const withdrawalAsync = createAsyncThunk<any, any, AsyncThunkConfig>(
  "auth/withdrawal",
  async (value, {rejectWithValue}) => {
    try{
    const response: AxiosResponse = await withdrawalRequest(value);
    return response.data;
    }catch(error:any){
      return rejectWithValue(error.response.data)
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.token = action.payload;
      state.loggedInUser = false;
    },
    setToken(state, action) {
      state.token = action.payload;
      state.loggedInUser = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";

      })
      .addCase(signupAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.notification.message = "Your Account Created Successfully"
        state.notification.type = "success"
      })
      .addCase(signupAsync.rejected, (state, action:PayloadAction<any>) => {
        state.status = "idle";
        state.token = "";
        state.notification.message = action?.payload?.data?.message;
        state.notification.type="error";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.token = action.payload;
        state.loggedInUser = true;
        state.notification.message = action.payload?.data?.message
        state.notification.type = "success";
      })
      .addCase(loginAsync.rejected, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        console.log(action)
        state.notification.message = action.payload?.data?.message 
        state.notification.type ="error"
        state.token = "";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        console.log(action)
        state.status = "idle";
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.amount = action.payload.amount;
        state.roleType = action.payload.roleType;
        state.mobile = action.payload.mobile;
        state.accountVarification = action.payload.accountVarification;
        state.winningCoins = action.payload.winningCoins;
        state.notification.message = "Let's Enjoy you Game.";
        state.notification.type = "success"
        state.upi= action.payload.upi
      })
      .addCase(fetchUserInfo.rejected, (state, action:PayloadAction<any>) => {
        state.status = "idle";
        state._id = ""
        state.name = ""
        state.amount = 0
        state.roleType = ""
        state.mobile = 0
        state.accountVarification = false
        state.winningCoins = 0
        state.notification.message = action.payload?.data?.message 
        state.notification.type ="error"
        state.loggedInUser= false;
        state.token=""
      })
      .addCase(JoinGameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(JoinGameAsync.fulfilled, (state, action) => {
        console.log(action);
        state.status = "idle";
        state.notification.message = "You Joined this Game successfully wait for the results"
        state.notification.type = "success"
        state.joined = true;
      }).addCase(JoinGameAsync.rejected, (state, action:PayloadAction<any>) => {
        console.log(action);
        state.status = "idle";
        console.log(action.payload)
        state.notification.message = action.payload?.data?.message
        state.notification.type ="error"
      })
      .addCase(depostAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(depostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        state.notification.message = "Your Transaction submited Successfuly"
        state.notification.type = "success"
      })
      .addCase(depostAsync.rejected, (state, action:PayloadAction<any>) => {
        state.status = "idle";
        state.notification.message = action.payload?.data?.message
        state.notification.type ="error"
        
      })
      .addCase(withdrawalAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(withdrawalAsync.fulfilled, (state) => {
        state.status = "idle";
        state.notification.message = "Your Transaction submited Successfuly"
        state.notification.type = "success"
      })
      .addCase(withdrawalAsync.rejected, (state, action:PayloadAction<any>) => {
        state.status = "idle";
        state.notification.message = action.payload?.data?.message
        state.notification.type ="error"
      })
      .addCase(fetchTransactionAsync.pending, (state) => {
        state.status = "loading";
      }).addCase(fetchTransactionAsync.fulfilled, (state, action) => {
        state.transactions = [...action.payload]
        state.status = 'idel'
      }).addCase(SubmitOTPAsync.fulfilled,(state,action:PayloadAction<any>)=>{
        state.accountVarification = true;
        state.notification.message = "Your Account Varifiaction Successfuly done."
        state.notification.type = "success"
      }).addCase(SubmitOTPAsync.rejected,(state,action:PayloadAction<any>)=>{
        state.notification.message = action.payload?.data?.message
        state.notification.type = "error"
      })
  },
});

export const selectUPI = (state:RootState) => state.auth.upi;
export const selectLoading = (state:RootState) => state.auth.status;
export const selectaccountVarification = (state:RootState) =>state.auth.accountVarification;
export const selectNotification = (state:RootState) => state.auth.notification;
export const selectUserData = (state: RootState) => state.auth;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
