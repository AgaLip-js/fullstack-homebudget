import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import analysisReducer from "./analysisReducer";
import aggregateReducer from "./aggregateReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  analysis: analysisReducer,
  aggregate: aggregateReducer,
});
