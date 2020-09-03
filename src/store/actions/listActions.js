export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const document = firestore.collection('lists').doc();

    document
      .set({ ...list, ownerId: uid, id: document.id })
      // .then(() =>
      //   firestore
      //     .collection('users')
      //     .doc(uid)
      //     .collection('list')
      //     .doc(document.id)
      //     .set({ title: list.title })
      // )
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_ERROR', err });
      });
  };
};
