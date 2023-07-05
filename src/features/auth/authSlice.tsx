// import { login } from '@/http'
import { AsyncThunkConfig, RootState } from "@/store";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { depositRequest, fetchTransactions, joinGame, login, me, signup, withdrawalRequest } from "@/http";
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
  }
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
  }
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";

      })
      .addCase(signupAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        console.log(action.payload.data);
        state.token = action.payload.data;
        state.loggedInUser = true;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "idle";
        state.token = "";
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.token = action.payload;
        state.loggedInUser = true;
        state.notification.message = "Login Successfuly Done";
        state.notification.type = "success";
      })
      .addCase(loginAsync.rejected, (state, action: PayloadAction<any>) => {
        state.status = "idle";
        console.log("failed ------", action.payload.data);
        state.notification.message = action.payload.data.message
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
      })
      .addCase(JoinGameAsync.pending, (state) => {
        state.status = "idle";
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
        state.notification.message = action.payload.data.message
        state.notification.type ="error"
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(depostAsync.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(depostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        state.notification.message="action.payload.data"
        state.notification.type = "success"
      })
      .addCase(depostAsync.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        state.notification.message="action.payload.data"
        state.notification.type = "error"
        //todo there is doing for some notification 0r totstyfy code here
      })
      .addCase(withdrawalAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(withdrawalAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(withdrawalAsync.rejected, (state) => {
        state.status = "idle";
        //todo there is doing for some notification 0r totstyfy code here
      })
      .addCase(fetchTransactionAsync.pending, (state) => {
        state.status = "Loading";
      }).addCase(fetchTransactionAsync.fulfilled, (state, action) => {
        state.transactions = [...action.payload]
        state.status = 'idel'
      })
  },
});

export const selectNotification = (state:RootState) => state.auth.notification;
export const selectUserData = (state: RootState) => state.auth;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
