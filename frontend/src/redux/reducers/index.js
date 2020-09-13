import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import analysisReducer from "./analysisReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  analysis: analysisReducer,
});
