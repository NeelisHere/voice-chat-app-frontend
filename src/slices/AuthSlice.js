import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    OTP: {
        hash: '',
        expires: '',
        email: ''
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            // console.log(action.payload);
            const { user } = action.payload
            state.user = user
            state.isAuth = (user === null)? false : true
        },
        setOTP: (state, action) => {
            // console.log(2, action.payload)
            const { hash, expires, email } = action.payload
            state.OTP.email = email
            state.OTP.hash = hash
            state.OTP.expires = expires
        },
    },
});

export const { setAuth, setOTP } = authSlice.actions;


