const initState = {
  todos: [],
};

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      console.log('Created todo', action.todo);
      return state;
    case 'CREATE_TODO_ERROR':
      console.log('Create todo error', action.err);
      return state;
    case 'UPDATE_TODO':
      console.log('Updated todo', action.todo);
      return state;
    case 'UPDATE_TODO_ERROR':
      console.log('Update todo error', action.err);
      return state;

    default:
      return state;
  }
};

export default todoReducer;
