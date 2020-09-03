export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    firestore
      .collection('lists')
      .add({
        ...list,
        ownerId: uid,
      })
      .then(({ id }) =>
        firestore
          .collection('users')
          .doc(uid)
          .collection('list')
          .doc(id)
          .set({ title: list.title })
      )
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_ERROR', err });
      });
  };
};
