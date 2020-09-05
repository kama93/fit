import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './reducer';
import cpmReducer from './reducer-cpm';


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  cpm: cpmReducer
});

export default persistReducer(persistConfig, rootReducer);