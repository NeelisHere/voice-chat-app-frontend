import { createSlice } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const initialState = {
    isAuth: false,
    isRegistered: false,
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
            const { user } = action.payload
            state.user = user
            state.isAuth = true
            state.isRegistered = user.activated? true: false
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

// export const authApi = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
//     endpoints: (builder) => ({
//       getAlbums: builder.query({
//         query: (page = 1) => `albums?_page=${page}&_limit=10`,
//       }),
//     }),
//   });
  
//   export const { useGetAlbumsQuery } = jsonServerApi;

