import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../assets/data";

const initialState = {
    tasks: tasks,
    completedTasks : [],
    inProgressTasks : [],
    todoTasks : []
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask : (state, action) => {
            state.tasks = action.payload;
        },
        addCompletedTask : (state, action) => {
            state.completedTasks = action.payload;
        },
        addInProgressTask : (state, action) => {
            state.inProgressTasks = action.payload;
        },
        addTodoTask : (state, action) => {
            state.todoTasks = action.payload;
        }
    }
});

export const {addTask, addCompletedTask, addInProgressTask, addTodoTask} = taskSlice.actions;

export default taskSlice.reducer;