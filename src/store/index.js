import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers";
import { myStoreEnhancer } from "./store/enhancers/myStoreEnhancer"; // Using as enhancer

// Create the Redux store with the rootReducer, Redux Thunk middleware, and store enhancer
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk), // Apply middleware first
    myStoreEnhancer // Apply custom store enhancer next
  )
);

export default store;
