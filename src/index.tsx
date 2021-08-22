import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './component/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import persistedReducer from './modules';
import { persistStore } from 'redux-persist';	// 추가
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store)
ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


