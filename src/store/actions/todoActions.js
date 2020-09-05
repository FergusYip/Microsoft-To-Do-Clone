import { v4 as uuidv4 } from 'uuid';

export const createTodo = (todo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    const document = firestore.collection('todos').doc();

    document
      .set({
        ...todo,
        id: document.id,
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
