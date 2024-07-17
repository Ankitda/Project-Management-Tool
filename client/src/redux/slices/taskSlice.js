import { createSlice, current } from "@reduxjs/toolkit";
import { tasks } from "../../assets/data";

const initialState = {
    tasks: tasks,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask : (state, action) => {
            console.log("task added", action.payload);
            state.tasks.push(action.payload);
        },
        addSubTasks : (state, action) => {

            const { data, index } = action.payload;

            const subTask = state.tasks[index].subTasks;
            
            if (index !== -1) {
                subTask.push(data);
            }
        }
    }
});

export const {addTask, addSubTasks} = taskSlice.actions;

export default taskSlice.reducer;