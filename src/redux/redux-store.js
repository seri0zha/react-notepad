import {applyMiddleware, combineReducers, createStore} from "redux";
import editorReducer from "./editorReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  editor: editorReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;
debugger;
export default store;