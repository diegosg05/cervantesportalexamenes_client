import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../domain/models/User'

export type authState = {
    value: User | null
}

const isUser = (obj: object): obj is User => {
    return (
        'id' in obj && typeof obj.id === 'number' &&
        'email' in obj && typeof obj.email === 'string' &&
        'username' in obj && typeof obj.username === 'string'
    );
}

const initialState: authState = {
    value: (() => {
        const authStorage = localStorage.getItem("UNGAUNGAUNGA");
        if (authStorage) {
            const auth = JSON.parse(authStorage);
            if (isUser(auth)) {
                return auth;
            }
            return null;
        }
        return null;
    })(),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<User>) => {
            state.value = action.payload;
            localStorage.setItem("UNGAUNGAUNGA", JSON.stringify(action.payload));
        },
        removeAuth: (state) => {
            state.value = null;
            localStorage.removeItem("UNGAUNGAUNGA");
        }
    }
})

export const { setAuth, removeAuth } = authSlice.actions

export default authSlice.reducer