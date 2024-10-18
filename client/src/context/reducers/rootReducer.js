import { combineReducers } from "redux"
import alertReducer from "./alertReducer"
import projectReducer from "./projectReducer"
import userReducer from "./userReducer"

const rootReducer = combineReducers({
    // alertReducer,
    projectReducer,
    userReducer
})

export default rootReducer
