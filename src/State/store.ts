//initial set up of store

import { createStore } from "redux";
import { taskReducer } from "./taskReducers";

export const store = createStore(taskReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
