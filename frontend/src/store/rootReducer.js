import { combineReducers } from "redux";
import authReducer from "./reducers/auth";
import errorsReducer from "./reducers/errors";
import messagesReducer from "./reducers/messages";
import postReducer from "./reducers/post";
import userReducer from "./reducers/user";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  post: postReducer,
  user: userReducer,
});
