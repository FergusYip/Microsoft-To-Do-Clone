import { deleteAtPath } from '../../config/firebaseConfig';

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

export const deleteList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const document = firestore.collection('lists').doc(list.id);

    document
      .delete()
      .then(function () {
        deleteAtPath(`/list${list.id}/todos`);
        console.log('Document successfully deleted!');
        dispatch({ type: 'DELETE_LIST', list });
      })
      .catch(function (err) {
        console.error('Error removing document: ', err);
        dispatch({ type: 'DELETE_LIST_ERROR', err });
      });
  };
};
