import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import allReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import App from './containers/App';

const store = createStore(
  allReducer, 
  applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
