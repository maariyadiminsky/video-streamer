import  { combineReducers } from "redux";

import authReducer from "./auth";
import streamReducer from "./stream";

export default combineReducers({
    auth: authReducer,
    streams: streamReducer
});