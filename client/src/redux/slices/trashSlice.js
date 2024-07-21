import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trashedTasks: [],
};

const trashSlice = createSlice({
    name: "trash",
    initialState,
    reducers: {
        addTrashTasks: (state, action) => {
            // console.log("trashed tasks : ", action.payload);
            state.trashedTasks = [...state.trashedTasks, action.payload];
        },
        deleteTrashTasks : (state, action) => {
            // console.log("trashed tasks : ", action.payload);
            state.trashedTasks = [...action.payload];
        },
        deleteAllTasks : (state) => {
            state.trashedTasks = [];
        }
    },
})

export const { addTrashTasks, deleteTrashTasks, deleteAllTasks } = trashSlice.actions;
export default trashSlice.reducer