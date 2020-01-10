import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === "function") {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(
  applyMiddleware(thunk, logger),
  ...enhancerList
);

const store = createStore(rootReducer, {}, composedEnhancer);

export default store;
