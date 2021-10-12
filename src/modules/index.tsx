import { combineReducers } from 'redux';
import user from './user'
import store from './store'
import review from './review'
import { persistReducer } from 'redux-persist';	// 추가
import storage from 'redux-persist/lib/storage';	// 추가

const persistConfig = {
  key: 'root',
  storage,
}	// 추가


	
const rootReducer = combineReducers({
  user,
  store,
  review,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);	// 추가

export default persistedReducer;
export type RootState = ReturnType<typeof persistedReducer>;