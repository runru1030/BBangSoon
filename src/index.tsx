import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import persistedReducer from './modules';
import { persistStore } from 'redux-persist';	// 추가
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';
import Notice from './component/Notice';
import { ThemeProvider } from 'styled-components';
import { theme } from './assets/styles/theme';
import GlobalStyle from './assets/styles/global-style';

const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store)
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <GlobalStyle/>
          <App />
        </PersistGate>
      </Provider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}
else {  
  ReactDOM.render(
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <Notice/>
      </ThemeProvider>
    ,
    document.getElementById('root')
  )
};


