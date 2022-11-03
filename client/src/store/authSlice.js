import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        connected: false,
        user: null
    },
    reducers: {
        disconnect : (state, action ) => {
            state.connected = false
            state.user = null
            localStorage.removeItem('token')
        },
        setCurrentUser : (state, action) => {
            if(action.payload){
                state.connected = true
                state.user = action.payload
            } else {
                state.connected = false
                state.user = null
                localStorage.removeItem('token')
            }
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { disconnect, setCurrentUser } = authSlice.actions

export const selectConnected = (state) => state.auth.connected
export const selectUser = (state) => state.auth.user

export default authSlice.reducer