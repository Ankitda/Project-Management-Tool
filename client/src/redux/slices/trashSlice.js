import { createSlice } from "@reduxjs/toolkit";
import { summary } from "../../assets/data";

const initialState = {
    trashedTasks: summary.tasks,
};

const trashSlice = createSlice({
    name: "trash",
    initialState,
    reducers: {
        addTrashTasks: (state, action) => {
            state.trashedTasks.push(action.payload);
        },
    },
})

export const { addTrashTasks } = trashSlice.actions;
export default trashSlice.reducer