'use client'
import { currentGame, joinGame, last10Reconres } from '@/http'
import { AsyncThunkConfig, RootState } from '@/store'
import { ICurrentGame, IServerResponse } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios';
interface Contest {
  contestId: string;
  winningPrice: number;
  winningNumber: number;
}
interface InitialState{
  contestId: string;
  gameEndTime?: Date|string|number;
  status: "Open"|"Closed"|"Loading"|"idle";
  loading:boolean;
  contests:Contest[]
}
const initialState:InitialState ={
  contestId: "",
  gameEndTime: "",
  status: "Loading",
  loading:true,
  contests:[{
  contestId: "",
  winningPrice: 0,
  winningNumber: 0
  }]
}

export const fetchContestAsync = createAsyncThunk<Array<Contest>, void, AsyncThunkConfig>("table/contest", async () => {
  const response: AxiosResponse<IServerResponse<Contest[]>> = await last10Reconres();
  return response.data.data
  
})

export const fetchCurrentGame = createAsyncThunk<InitialState,void,AsyncThunkConfig>("game/currentGame",async () => {
    const response = await currentGame();
    return response.data.data;
})

export const JoinGameAsync = createAsyncThunk<any, any , AsyncThunkConfig>("game/join",async value => {
  const response = await joinGame(value)
  return response.data.data;
})

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
      builder
   .addCase(fetchCurrentGame.fulfilled,(state, action)=>{
        state.contestId= action.payload.contestId;
        state.gameEndTime = action.payload.gameEndTime;
        state.status = action.payload.status
        state.loading=false;
   }).addCase(JoinGameAsync.pending,state=>{
      state.loading=true;
   }).addCase(JoinGameAsync.fulfilled,(state,action)=>{
    console.log(action)
    state.loading=false;
    
 }).addCase(fetchContestAsync.pending, (state) => {
        state.status = "Loading";
      }).addCase(fetchContestAsync.fulfilled, (state, action) => {
        state.contests = [...action.payload]
        state.status = 'idle'
      })
  }
})
export const selectContestList = (state:RootState) =>state.game.contests
export const selectCurrentGame = (state:RootState)=>state.game;
export const selectContestId  = (state:RootState)=>state.game.contestId
export const { } = gameSlice.actions

export default gameSlice.reducer