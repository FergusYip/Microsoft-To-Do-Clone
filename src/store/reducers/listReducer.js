const initState = {
  lists: [
    { id: 1, title: 'Groceries', numTodo: 5 },
    { id: 2, title: 'Homework', numTodo: 2 },
    { id: 3, title: 'Movie Watchlist', numTodo: 0 },
  ],
};

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      console.log('Created list', action.list);
      return state;
    case 'CREATE_LIST_ERROR':
      console.log('Create list error', action.err);
      return state;
    default:
      return state;
  }
};

export default listReducer;
