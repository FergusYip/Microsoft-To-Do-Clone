export const showCompletedTasks = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const userDoc = firestore.collection('users').doc(uid);

    userDoc
      .update({ 'settings.important.showCompleted': true })
      .then(() => {
        dispatch({ type: 'SHOWED_COMPLETED_IMPORTANT', showCompleted: true });
      })
      .catch((err) => {
        dispatch({ type: 'SHOWED_COMPLETED_IMPORTANT_ERRROR', err });
      });
  };
};

export const hideCompletedTasks = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const userDoc = firestore.collection('users').doc(uid);

    userDoc
      .update({ 'settings.important.showCompleted': false })
      .then(() => {
        dispatch({ type: 'SHOWED_COMPLETED_IMPORTANT', showCompleted: false });
      })
      .catch((err) => {
        dispatch({ type: 'SHOWED_COMPLETED_IMPORTANT_ERRROR', err });
      });
  };
};
