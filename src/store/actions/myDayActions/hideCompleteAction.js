export const hideCompletedTasks = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const userDoc = firestore.collection('users').doc(uid);

    userDoc
      .update({ 'settings.myDay.showCompleted': false })
      .then(() => {
        dispatch({ type: 'SHOWED_COMPLETED_MY_DAY', showCompleted: false });
      })
      .catch((err) => {
        dispatch({ type: 'SHOWED_COMPLETED_ERRROR', err });
      });
  };
};
