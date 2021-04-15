import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer'
import claimReducer from './store/claimReducer'
import projectReducer from './store/projectReducer'
import expenseReducer from './store/expenseReducer'
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger'

const combReducer = combineReducers({
  reducer,
  claimReducer,
  projectReducer,
  expenseReducer
})

const loggerMiddleware = createLogger();

const store = createStore(combReducer,applyMiddleware(thunk,loggerMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
