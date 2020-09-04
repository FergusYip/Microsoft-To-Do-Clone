import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import authReducer from './authReducer';
import listReducer from './listReducer';
import { selectionReducer } from './selectionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  selectedTodoDetails: selectionReducer,
});

export default rootReducer;
