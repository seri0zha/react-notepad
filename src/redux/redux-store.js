import {combineReducers, createStore} from "redux";
import editorReducer from "./editorReducer";

let reducers = combineReducers({
  editor: editorReducer,
});

let store = createStore(reducers);

export default store;
