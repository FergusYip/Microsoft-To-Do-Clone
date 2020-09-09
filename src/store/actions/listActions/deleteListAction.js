export const DELETE_LIST = 'DELETE_LIST';
export const DELETE_LIST_LOADING = 'DELETE_LIST_LOADING';
export const DELETE_LIST_ERROR = 'DELETE_LIST_ERROR';

export const deleteListError = (err) => {
  return {
    type: DELETE_LIST_ERROR,
    err: err,
  };
};

export const deleteListIsLoading = (bool) => {
  return {
    type: DELETE_LIST_LOADING,
    isLoading: bool,
  };
};

export const deleteListSuccess = (list) => {
  return {
    type: DELETE_LIST,
    isDeleted: true,
  };
};

export const deleteList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (!list) {
      dispatch(deleteListError({ message: 'list is null' }));
    }

    dispatch(deleteListIsLoading(true));
    const firestore = getFirestore();

    firestore
      .collection('todos')
      .where('listID', '==', list.id)
      .get()
      .then((todos) => {
        // Get a new write batch
        const batch = firestore.batch();

        const listRef = firestore.collection('lists').doc(list.id);
        batch.delete(listRef);

        todos.forEach((todo) => {
          const todoRef = firestore.collection('todos').doc(todo.id);
          batch.delete(todoRef);
        });

        // Commit the batch
        return batch.commit();
      })
      .then(function () {
        dispatch(deleteListIsLoading(false));
        dispatch(deleteListSuccess(list));
      })
      .catch(function (err) {
        dispatch(deleteListError(err));
      });
  };
};
