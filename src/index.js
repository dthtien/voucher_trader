import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import allReducer from './reducers';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import App from './containers/App';

const store = createStore(
  allReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
