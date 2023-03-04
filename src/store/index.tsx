import user from './user'
import store from './store'
import review from './review'
import { persistReducer } from 'redux-persist';	
import storage from 'redux-persist/lib/storage';	
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage,
}	

const rootReducer = combineReducers({
  user,
  store,
  review,
});
const persistedReducer =persistReducer(persistConfig, rootReducer)
const reduxStore = createStore( persistedReducer, composeWithDevTools());
export default reduxStore;
export type RootState = ReturnType<typeof persistedReducer>;
