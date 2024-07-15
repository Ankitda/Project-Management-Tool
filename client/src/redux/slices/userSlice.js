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
            state.users.push(action.payload);
        },
    },
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer