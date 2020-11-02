import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'antd/dist/antd.css';
import './index.css';
import App from './components/App';
import reducer from './reducers';

import { updateUser } from './actions';

const store = createStore(reducer, applyMiddleware(thunk));

if (localStorage.getItem('token')) {
  console.log('update store');
  store.dispatch(updateUser(localStorage.getItem('token')));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
