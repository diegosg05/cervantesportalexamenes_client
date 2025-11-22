import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/User/slice/authSlice'
import examReducer from '../features/Exam/slices/examSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exam: examReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch