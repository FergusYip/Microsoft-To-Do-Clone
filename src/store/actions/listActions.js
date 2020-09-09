export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const document = firestore.collection('lists').doc();

    document
      .set({ ...list, owner: uid, id: document.id })
      .then(() => {
        dispatch({ type: 'CREATE_LIST', list });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_ERROR', err });
      });
  };
};

export const updateList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: 'UPDATE_LIST_LOADING', isLoading: true });

    const firestore = getFirestore();
    firestore
      .collection('lists')
      .doc(list.id)
      .update(list)
      .then(() => {
        dispatch({ type: 'UPDATE_LIST_LOADING', isLoading: false });
        dispatch({ type: 'UPDATE_LIST', list });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_LIST_ERROR', err });
      });
  };
};

// export const deleteList = (list) => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     if (!list) {
//       dispatch({ type: 'DELETE_LIST_ERROR', err: { message: 'list is null' } });
//     }

//     dispatch({ type: 'DELETE_LIST_LOADING', isLoading: true });
//     const firestore = getFirestore();

//     const todos = await firestore
//       .collection('todos')
//       .where('listID', '==', list.id)
//       .get();

//     console.log(todos);

//     // Get a new write batch
//     const batch = firestore.batch();

//     const listRef = firestore.collection('lists').doc(list.id);
//     batch.delete(listRef);

//     todos.forEach((todo) => {
//       const todoRef = firestore.collection('todos').doc(todo.id);
//       batch.delete(todoRef);
//     });

//     // Commit the batch
//     batch
//       .commit()
//       .then(function () {
//         console.log('Document successfully deleted!');
//         dispatch({ type: 'DELETE_LIST', list, isLoading: false });
//       })
//       .catch(function (err) {
//         console.error('Error removing document: ', err);
//         dispatch({ type: 'DELETE_LIST_ERROR', err, isLoading: false });
//       });

//     console.log('done');
//   };
// };
