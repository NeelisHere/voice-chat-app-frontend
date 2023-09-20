import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRoom: {
        topic: '',
        speakers: [],
        listeners: [],
    }
};

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setCurrentRoom: (state, action) => {
            // console.log(action.payload);
            const { topic } = action.payload
            state.currentRoom.topic = topic
        },
    },
});

export const { setCurrentRoom } = roomSlice.actions;


