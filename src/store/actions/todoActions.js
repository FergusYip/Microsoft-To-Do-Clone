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
