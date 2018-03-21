import React from 'react';
import ReactDOM from 'react-dom';
import './resources/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  browserHistory
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import VoucherReducer from './reducers/voucher';

const store = createStore(
  VoucherReducer, 
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
