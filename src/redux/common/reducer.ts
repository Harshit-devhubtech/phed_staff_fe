import { combineReducers } from "redux";
import userReducer from "./../user/reducer";

import universityReducer from "./../university/reducer";
import adminReducer from "./../Admin/reducer";










export default combineReducers({
    user: userReducer,
 
    unversity:universityReducer,
    admin:adminReducer,
  
  
 
  
    
});