import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import itemsReducer from "./itemsReducer";
import analysisReducer from "./analysisReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  items: itemsReducer,
  analysis: analysisReducer,
});
