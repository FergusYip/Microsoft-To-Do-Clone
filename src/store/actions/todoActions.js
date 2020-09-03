export const createTodo = (listId, todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    firestore
      .collection('lists')
      .doc(listId)
      .collection('todos')
      .add({
        ...todo,
        ownerId: uid,
      })
      .then(() => {
        dispatch({ type: 'CREATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_TODO_ERROR', err });
      });
  };
};

export const updateTodo = (listId, todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('lists')
      .doc(listId)
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
