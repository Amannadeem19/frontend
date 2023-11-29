import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { tweetReducer } from "./Tweet/Reducer";

const { combineReducers, legacy_createStore, applyMiddleware } = require("redux");


const rootReducers = combineReducers({
    auth:authReducer,
    tweet: tweetReducer
    
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
