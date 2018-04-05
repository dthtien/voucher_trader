import 'bootstrap/dist/css/bootstrap.min.css';
import './resources/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import allReducer from './reducers';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import setAuthorizationToken from './config/setAuthorizationToken';
import { loggedIn } from './actions/user';
import App from './containers/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.accessToken) {
  setAuthorizationToken(localStorage.accessToken)
  store.dispatch(loggedIn(localStorage.accessToken));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
