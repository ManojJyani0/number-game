import { fetchTransactions, last10Reconres } from '@/http'
import { AsyncThunkConfig, RootState } from '@/store';
import { IServerResponse } from '@/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios';
interface Contest {
  contestId: string;
  winningPrice: number;
  winningNumber: number;
}
interface Transaction {
  UTR: string;
  amount: number;
  status: "Success" | "Failed" | "Pending" | "";
  transactionType: "Deposit" | "Withdrawal" | "JoinGame" | "PriceMoney" | "";
}
interface ITable {
  contests: Contest[],
  transactions: Transaction[]
  status: "idel" | "Loading"
}

const initialState: ITable = {
  contests: [{
    contestId: "",
    winningPrice: 0,
    winningNumber: 0
  }],
  transactions: [{
    UTR: "",
    amount: 0,
    status: "",
    transactionType: ""
  }],
  status: "idel"
}

export const fetchContestAsync = createAsyncThunk<Array<Contest>, Array<Contest>, AsyncThunkConfig>("table/contest", async () => {
  const response: AxiosResponse<IServerResponse<Contest[]>> = await last10Reconres();
  return response.data 
  
})
export const fetchTransactionAsync = createAsyncThunk<Transaction[],Transaction[],AsyncThunkConfig>("table/transaction", async () => {
  const response: AxiosResponse<IServerResponse<Transaction[]>> = await fetchTransactions();
  return response.data;
})

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContestAsync.pending, (state) => {
        state.status = "Loading";
      }).addCase(fetchContestAsync.fulfilled, (state, action) => {
        state.contests = [...action.payload]
        state.status = 'idel'
      })
      .addCase(fetchTransactionAsync.pending, (state) => {
        state.status = "Loading";
      }).addCase(fetchTransactionAsync.fulfilled, (state, action) => {
        state.transactions = [...action.payload]
        state.status = 'idel'
      })
  },
})

export const selectContestList = (state: RootState) => state.table.contests;
export const { } = tableSlice.actions

export default tableSlice.reducer