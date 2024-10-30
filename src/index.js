import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk"; // Import Redux Thunk
import rootReducer from "./store/reducers";
import App from "./App";
import "./index.css";
import "./App.css";

// Create the Redux store with the rootReducer and Redux Thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div className="app-scr">
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
);
