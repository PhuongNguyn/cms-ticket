import { combineReducers } from "redux";
import ticket from "./ticket";
import { loadingBarReducer } from "react-redux-loading-bar";
import service from "./service";

export default combineReducers({
    ticket: ticket,
    loadingBar: loadingBarReducer,
    service: service,
})