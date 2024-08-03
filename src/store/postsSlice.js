import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers : {
        setPosts: (state, action) => {
            return action.payload;
        }
    }
})

export const {setPosts} = postSlice.actions

export const postsReducer = postSlice.reducer;