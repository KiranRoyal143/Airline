import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'; // Import createStore from Redux
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Import your rootReducer that combines all reducers
import App from './App';
import './index.css';
import './App.css'

const store = createStore(rootReducer); // Create the Redux store with the rootReducer

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);