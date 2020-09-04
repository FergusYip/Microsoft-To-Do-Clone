export const SELECT_TODO = 'SELECT_TODO';
export const DESELECT_TODO = 'DESELECT_TODO';

export const selectTodo = (listID, todoID) => {
  return {
    type: SELECT_TODO,
    selection: { listID, todoID },
  };
};

export const deselectTodo = () => {
  return {
    type: DESELECT_TODO,
    selection: null,
  };
};
