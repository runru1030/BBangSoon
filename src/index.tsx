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
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)}
else{
  ReactDOM.render(
    <div>
      <span>모바일 기기에서만 지원합니다.</span>
      <span>모바일 기기에서 접속하여 빵순을 이용해보세요!</span>
      <img src="logo.png"/>
    </div>,
  document.getElementById('root')
  )
};


