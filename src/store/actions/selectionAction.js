export const SELECT_TODO = 'SELECT_TODO';
export const DESELECT_TODO = 'DESELECT_TODO';

export const selectTodo = (todo) => {
  return {
    type: SELECT_TODO,
    selection: { listID: todo.listID, todoID: todo.id },
  };
};

export const deselectTodo = () => {
  return {
    type: DESELECT_TODO,
    selection: null,
  };
};
