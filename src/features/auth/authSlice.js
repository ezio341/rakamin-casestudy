import { createSlice } from '@reduxjs/toolkit'
import { login, register } from './authActions'

const userToken = localStorage.getItem('user_token')
  ? localStorage.getItem('user_token') : null

const initialState = {
  loading: false,
  userToken: userToken, // for storing the JWT
  error: null,
  message: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state)=>{
      localStorage.removeItem('user_token')
      state.loading = false
      state.userToken = null
      state.error = null
    }
  },
  extraReducers: {
    // login user
    [login.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userToken = payload.auth_token
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // register user
    [register.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.message = payload.message
      state.userToken = payload.auth_token
    },
    [register.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const {logout} = authSlice.actions
export default authSlice.reducer