import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers";
import { myStoreEnhancer } from "./store/enhancers/myStoreEnhancer";

// Create the Redux store with the rootReducer, Redux Thunk middleware, and myStoreEnhancer
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk), myStoreEnhancer)
);

export default store;
