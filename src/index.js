import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root/Root';
import { createBrowserHistory } from 'history';

import LocalStorage from './utils/Storage';
import WallacloneAPI from './services/WallacloneAPI';
import { configureStore } from './store';
import * as types from './store/types';

import * as serviceWorker from './serviceWorker';
import './index.css';

const renderApp = props =>
  ReactDOM.render(<Root {...props} />, document.getElementById('root'));


/********************
 * Browser history
 *******************/
const history = createBrowserHistory();


/********************
 * LocalStorage session
 *******************/
const session = LocalStorage.readLocalStorage() || undefined;


/********************
 * Store Config
 *******************/
const store = configureStore({
  history,
  services: { WallacloneAPI },
})({
  session,
});


/*****************************************
 * Update LocalStorage after store changes
 *****************************************/
store.subscribe(() => {
  const { lastAction, session } = store.getState();
  console.log("STORE");
  
  if (lastAction.type === types.SESSION_SAVE && lastAction.remember) {
    LocalStorage.saveLocalStorage(session);
  }
  
  if (lastAction.type === types.SESSION_CLEAR) {
    LocalStorage.clearLocalStorage();
  }
});

renderApp({ store, history });




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
