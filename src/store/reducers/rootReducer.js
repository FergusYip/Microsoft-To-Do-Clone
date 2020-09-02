import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
