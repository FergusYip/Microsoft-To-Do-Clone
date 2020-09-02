import { combineReducers } from 'redux';

import authReducer from './authReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
});

export default rootReducer;
