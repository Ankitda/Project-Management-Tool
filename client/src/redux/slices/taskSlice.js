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
            const { data } = action.payload;

            if (data) {
                if (state.taskActivities.length > 0) {
                    state.taskActivities = [...state.taskActivities, data];
                } else {
                    state.taskActivities.push(data);
                }
            }
        },
        addExistingActivities: (state, action) => {
            const { existingData } = action.payload;

            if (state.taskActivities.length > 0 && existingData.length > 0) {
                if (state.taskActivities[state.taskActivities.length - 1]._id === existingData[existingData.length - 1]._id) {
                    return;
                } else{            
                    state.taskActivities = [...existingData]
                }
            } else {
                if (existingData.length > 0) {
                    state.taskActivities = existingData
                } else {
                    state.taskActivities = []
                }
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

export const { addTask, addSubTasks, addActivities, deleteTask, setRefresh, addExistingActivities } = taskSlice.actions;

export default taskSlice.reducer;