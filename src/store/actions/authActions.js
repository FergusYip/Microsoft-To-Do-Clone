export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: 'LOGIN_LOADING' });
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNOUT_ERROR', err });
      });
  };
};

export const signUp = (newUser) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      const list = firestore.collection('lists').doc();

      await Promise.all([
        list.set({ title: 'Tasks', owner: resp.user.uid, id: list.id }),
        firestore.collection('users').doc(resp.user.uid).set({
          name: newUser.name,
          tasks: list.id,
        }),
      ]);

      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SIGNUP_ERROR', err });
    }
  };
};
