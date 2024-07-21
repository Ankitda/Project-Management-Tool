import { configureStore  } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";
import trashReducer from "./slices/trashSlice";
import {apiSlice} from "./slices/apiSlice";
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'task', 'user', 'trash']
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  task: taskReducer,
  user: userReducer,
  trash: trashReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const persistor = persistStore(store);


export { store, persistor };

// export default store;