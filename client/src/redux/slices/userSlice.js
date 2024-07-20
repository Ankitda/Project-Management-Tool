import { createSlice } from "@reduxjs/toolkit";
import { summary } from "../../assets/data";

const initialState = {
    users: summary.users,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            if(Array.isArray(action.payload)){
                state.users = [...state.users, ...action.payload];
            }else{
                state.users = [...state.users, action.payload];
            }
        },
        deleteUser: (state, action) => {
            // console.log("delete user", action.payload);
            state.users = [...action.payload];
        },
        deleteAllUsers : (state) => {
            state.users = [];
        }
    },
})

export const { addUser, deleteUser, deleteAllUsers } = userSlice.actions;
export default userSlice.reducer