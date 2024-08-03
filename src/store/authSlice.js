import { createSlice } from "@reduxjs/toolkit";
import { storageService } from "../appwrite/storage.Service";

const initialState = {
    userData: null,
    isLogin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            state.userData.avatarUrl = storageService.getFile(action.payload.$id, true).href;
            console.log(state.userData.avatarUrl);
            state.isLogin = true;
        },
        logout: (state) => {
            state.userData = null;
            state.isLogin = false;
        }
    }
})

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer