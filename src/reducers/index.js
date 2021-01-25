import { loginReducer } from "./login-reducer";
import { combineReducers } from "redux";

export const Reducers = combineReducers({
  clickState: loginReducer,
});
