import { SELECT_TODO, DESELECT_TODO } from '../actions/selectionAction';

export const selectionReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_TODO:
      return action.selection;
    case DESELECT_TODO:
      return action.selection;
    default:
      return state;
  }
};
