import { combineReducers } from 'redux';
import {
  DELETE_LIST,
  DELETE_LIST_LOADING,
  DELETE_LIST_ERROR,
} from '../../actions/listActions/deleteListAction';

export function deleteListError(state = null, action) {
  switch (action.type) {
    case DELETE_LIST_ERROR:
      return action.err;
    default:
      return state;
  }
}

export function deleteListIsLoading(state = false, action) {
  switch (action.type) {
    case DELETE_LIST_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
export function deleteList(state = null, action) {
  switch (action.type) {
    case DELETE_LIST:
      return action.isDeleted;
    default:
      return state;
  }
}
export default combineReducers({
  deleteList,
  deleteListError,
  deleteListIsLoading,
});
