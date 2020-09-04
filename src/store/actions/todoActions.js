export const createTodo = (listId, todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const document = firestore
      .collection('lists')
      .doc(listId)
      .collection('todos')
      .doc();

    document
      .set({
        ...todo,
        listId,
        ownerId: uid,
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
      .collection('lists')
      .doc(todo.listId)
      .collection('todos')
      .doc(todo.id)
      .update(todo)
      .then(() => {
        dispatch({ type: 'UPDATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_TODO_ERROR', err });
      });
    console.log('update', todo);
  };
};
