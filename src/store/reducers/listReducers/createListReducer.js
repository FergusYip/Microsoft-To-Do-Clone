import { combineReducers } from 'redux';
import {
  CREATE_LIST,
  CREATE_LIST_LOADING,
  CREATE_LIST_ERROR,
} from '../../actions/listActions/createListAction';

export function createListError(state = null, action) {
  switch (action.type) {
    case CREATE_LIST_ERROR:
      return action.err;
    default:
      return state;
  }
}
export function createListIsLoading(state = false, action) {
  switch (action.type) {
    case CREATE_LIST_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
export function createList(state = null, action) {
  switch (action.type) {
    case CREATE_LIST:
      return action.list;
    default:
      return state;
  }
}
export default combineReducers({
  createList,
  createListError,
  createListIsLoading,
});
