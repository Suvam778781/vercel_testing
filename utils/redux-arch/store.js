import { applyMiddleware, legacy_createStore } from "redux";
import {authReducer as authreducer } from "./authreducer/reducer"
import {todoReducer as todoreducer} from "./todoreducer/reducer"
import {userReducer as userreducer} from "./userreducer/reducer"
import { combineReducers } from "redux";
import thunk from "redux-thunk";

const rootreducer = combineReducers({authreducer, userreducer, todoreducer});

const store = legacy_createStore(rootreducer, applyMiddleware(thunk));



export { store };
