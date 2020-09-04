export const CREATE_LIST = 'CREATE_LIST';
export const CREATE_LIST_LOADING = 'CREATE_LIST_LOADING';
export const CREATE_LIST_ERROR = 'CREATE_LIST_ERROR';

export const createListError = (err) => {
  return {
    type: CREATE_LIST_ERROR,
    err: err,
  };
};

export const createListIsLoading = (bool) => {
  return {
    type: CREATE_LIST_LOADING,
    isLoading: bool,
  };
};

export const createListSuccess = (list) => {
  return {
    type: CREATE_LIST,
    list,
  };
};

export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(createListIsLoading(true));

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
        dispatch(createListIsLoading(false));
        dispatch(createListSuccess(list));
      })
      .catch((err) => {
        dispatch(createListError(err));
      });
  };
};
