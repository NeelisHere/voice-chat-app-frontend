import { createSlice } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const initialState = {
    isLoggedIn: false,
    isRegistered: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { },
});

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

// export const { addTodo, deleteTodo } = todoSlice.actions;
