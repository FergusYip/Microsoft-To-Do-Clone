export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('lists')
      .add({
        ...list,
      })
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_ERROR', err });
      });
  };
};
