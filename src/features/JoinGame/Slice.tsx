import { currentGame, joinGame } from '@/http'
import { AsyncThunkConfig, RootState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
interface InitialState{
  contestId: string;
  gameEndTime?: Date|string|number;
  status: "Open"|"Closed"|"Loading";
  loading:boolean;
}
const initialState:InitialState ={
  contestId: "",
  gameEndTime: "",
  status: "Loading",
  loading:true
}
export const fetchCurrentGame = createAsyncThunk<InitialState,InitialState,AsyncThunkConfig>("game/currentGame",async () => {
    const response = await currentGame();
    return response.data;
})

export const JoinGameAsync = createAsyncThunk("game/join",async value => {
  const response = await joinGame(value)
  return response.data;
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
    
 })
  }
})
export const selectCurrentGame = (state:RootState)=>state.game;
export const selectContestId  = (state:RootState)=>state.game.contestId
export const { } = gameSlice.actions

export default gameSlice.reducer