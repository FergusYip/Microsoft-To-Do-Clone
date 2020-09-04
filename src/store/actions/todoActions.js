export const createTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const document = firestore.collection('todos').doc();

    document
      .set({
        ...todo,
        id: document.id,
      })
      .then(() => {
        dispatch({ type: 'CREATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_TODO_ERROR', err });
      });
  };
};

export const updateTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .update(todo)
      .then(() => {
        dispatch({ type: 'UPDATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_TODO_ERROR', err });
      });
  };
};
