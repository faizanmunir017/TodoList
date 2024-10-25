//initial set up of store

import { applyMiddleware, createStore } from "redux";
import { taskReducer } from "./taskReducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(taskReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
