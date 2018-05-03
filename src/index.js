import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss'
import 'mdbreact/dist/scss/mdb.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './resources/index.scss';
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

injectTapEventPlugin();

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toTitlelize= function(){
  return this.capitalize().split('_').join(' ');
}

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
