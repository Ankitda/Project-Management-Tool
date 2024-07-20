import { createSlice, current } from "@reduxjs/toolkit";
import { tasks } from "../../assets/data";

const initialState = {
    tasks: tasks,
    taskActivities: [],
    refresh: false
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {

            if (Array.isArray(action.payload)) {
                state.tasks = [...state.tasks, ...action.payload];
            } else {
                state.tasks = [...state.tasks, action.payload];
            }

        },
        addSubTasks: (state, action) => {

            const { data, index } = action.payload;

            const subTask = state.tasks[index].subTasks;

            if (index !== -1) {
                subTask.push(data);
            }
        },
        addActivities: (state, action) => {
            const { data, id } = action.payload;

            if (id !== -1) {
                state.taskActivities.push([...state.tasks[id].activities, data]);
            }
        },
        deleteTask: (state, action) => {
            // console.log("task deleted", action.payload);
            state.tasks = [...action.payload];
        },
        setRefresh: (state, action) => {
            // console.log("set refresh", action.payload);
            state.refresh = action.payload;
        }
    }
});

export const { addTask, addSubTasks, addActivities, deleteTask, setRefresh } = taskSlice.actions;

export default taskSlice.reducer;