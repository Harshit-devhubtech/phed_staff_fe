import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const composeEnhancer:any = typeof composeWithDevTools !== "undefined" ? composeWithDevTools : compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;