import { combineReducers } from 'redux';
import createListReducer from './listReducers/createListReducer';

const initState = {
  lists: [
    {
      id: 1,
      title: 'Groceries',
      numTodo: 5,
      sort: null,
      theme: null,
      showCompleted: true,
      todos: [
        {
          id: 1,
          title: 'Eat fruit',
          isComplete: false,
          isImportant: true,
          steps: [
            { id: 1, title: 'Peel fruit', isComplete: true },
            { id: 2, title: 'Cut fruit', isComplete: false },
          ],
          remindMe: null,
          dueDate: null,
          repeat: null,
          files: [],
          Note: '',
        },
        {
          id: 2,
          title: 'Buy groceries',
          isComplete: true,
          isImportant: true,
          steps: [
            { id: 3, title: 'Buy apples', isComplete: true },
            { id: 4, title: 'Buy Fish', isComplete: true },
          ],
          remindMe: null,
          dueDate: null,
          repeat: null,
          files: [],
          Note: '',
        },
        {
          id: 3,
          title: 'Finish todolist',
          isComplete: false,
          isImportant: true,
          steps: [],
          remindMe: null,
          dueDate: null,
          repeat: null,
          files: [],
          Note: '',
        },
      ],
    },
    { id: 2, title: 'Homework', numTodo: 2, todos: [] },
    { id: 3, title: 'Movie Watchlist', numTodo: 0, todos: [] },
  ],
  isLoading: false,
};

const listReducer = (state = initState, action) => {
  switch (action.type) {
    // case 'CREATE_LIST':
    //   console.log('Created list', action.list);
    //   return state;
    // case 'CREATE_LIST_ERROR':
    //   console.log('Create list error', action.err);
    //   return state;
    case 'UPDATE_LIST_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'UPDATE_LIST':
      console.log('Update list', action.list);
      return state;
    case 'UPDATE_LIST_ERROR':
      console.log('Update list error', action.err);
      return state;
    case 'DELETE_LIST':
      console.log('deleted list');
      return state;
    case 'DELETE_LIST_ERROR':
      console.log('delete list error', action.err);
      return state;
    default:
      return state;
  }
};

// export default listReducer;

export default combineReducers({
  createListReducer,
  listReducer,
});
