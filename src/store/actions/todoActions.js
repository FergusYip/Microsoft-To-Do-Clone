import { v4 as uuidv4 } from 'uuid';
import { UNTITLED_LIST } from '../../utils/constants';

export const createTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const document = firestore.collection('todos').doc();

    document
      .set({
        ...todo,
        id: document.id,
        owner: uid,
      })
      .then(() => {
        dispatch({ type: 'CREATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_TODO_ERROR', err });
      });
  };
};

export const updateTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .update(todo)
      .then(() => {
        dispatch({ type: 'UPDATE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_TODO_ERROR', err });
      });
  };
};

export const addStep = (todo, stepTitle) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .update({
        steps: [
          ...todo.steps,
          { title: stepTitle, isComplete: false, id: uuidv4() },
        ],
      })
      .then(() => {
        dispatch({ type: 'ADD_STEP', todo });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_STEP_ERR', err });
      });
  };
};

export const removeStep = (todo, step) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .update({
        steps: todo.steps.filter((s) => s.id !== step.id),
      })
      .then(() => {
        dispatch({ type: 'REMOVE_STEP', todo });
      })
      .catch((err) => {
        dispatch({ type: 'REMOVE_STEP_ERR', err });
      });
  };
};

export const updateStep = (todo, step) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .update({
        steps: todo.steps.map((s) => {
          if (s.id === step.id) {
            return step;
          }
          return s;
        }),
      })
      .then(() => {
        dispatch({ type: 'UPDATE_STEP', todo });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_STEP_ERR', err });
      });
  };
};

export const deleteTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('todos')
      .doc(todo.id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_TODO_ERR', err });
      });
  };
};

export const createListFromTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const lists = getState().firestore.data.lists;

    const batch = firestore.batch();

    let listTitle = UNTITLED_LIST;
    let postfix = 1;
    while (Object.values(lists).some((list) => list.title === listTitle)) {
      listTitle = `${UNTITLED_LIST} ${postfix}`;
      postfix++;
    }

    const listRef = firestore.collection('lists').doc();
    batch.set(listRef, { title: listTitle, owner: uid, id: listRef.id });

    const todoRef = firestore.collection('todos').doc(todo.id);
    batch.update(todoRef, { listID: listRef.id });

    batch
      .commit()
      .then(() => {
        dispatch({ type: 'CREATE_LIST_TODO', todo });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_LIST_TODO_ERR', err });
      });
  };
};
