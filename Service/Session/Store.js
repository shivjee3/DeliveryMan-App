import { combineReducers, createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer} from 'redux-persist';
import {reducer} from './Reducer'

const AppReducers = combineReducers({
    session : reducer,
   
    
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: null,
    version: 0
}
  
  const persistedReducer = persistReducer(persistConfig, AppReducers);
  
  const store = createStore(
      persistedReducer,
  );

  const persistor = persistStore(store);
  export {store, persistor};
