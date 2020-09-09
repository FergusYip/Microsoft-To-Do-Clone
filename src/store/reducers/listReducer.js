import { combineReducers } from 'redux';
import createListReducer from './listReducers/createListReducer';
import deleteListReducer from './listReducers/deleteListReducer';

const listReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_LIST_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'UPDATE_LIST':
      console.log('Update list', action.list);
      return state;
    case 'UPDATE_LIST_ERROR':
      console.log('Update list error', action.err);
      return state;
    default:
      return state;
  }
};

// export default listReducer;

export default combineReducers({
  createListReducer,
  deleteListReducer,
  listReducer,
});
