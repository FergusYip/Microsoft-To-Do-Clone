import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import authReducer from './authReducer';
import listReducer from './listReducer';
import { selectionReducer } from './selectionReducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['firestore'],
  whitelist: [],
};

// const firestorePersistConfig = {
//   key: 'firestore',
//   storage,
//   whitelist: ['data', 'status'],
//   stateReconciler: hardSet,
// };

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  firestore: firestoreReducer,
  // firestore: persistReducer(firestorePersistConfig, firestoreReducer),
  firebase: firebaseReducer,
  selectedTodoID: selectionReducer,
});

export default persistReducer(persistConfig, rootReducer);
