import { type } from 'os'
import authReducer from '../features/auth/authSlice'
import gameReducer from '@/features/JoinGame/Slice'
import { configureStore } from '@reduxjs/toolkit'
// ...

export const  store = configureStore({
  reducer: {
    auth: authReducer,
    game : gameReducer

  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type  AsyncThunkConfig = {
  state: RootState
  
}