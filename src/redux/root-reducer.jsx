import { combineReducers } from 'redux';
import userReducer from './reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
  key:'root',
  storage,
}

const rootReducer= combineReducers({
  user: userReducer
});

export default persistReducer(persistConfig, rootReducer);