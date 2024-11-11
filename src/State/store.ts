import { applyMiddleware, createStore } from "redux";
import { taskReducer } from "./taskReducers";
import { userReducer } from "./userReducers";
import createSagaMiddleware from "redux-saga";
import { combineReducers } from "redux";
import rootSaga from "saga/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
