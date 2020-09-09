import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: 'react-todo-app-5409e.firebaseapp.com',
  databaseURL: 'https://react-todo-app-5409e.firebaseio.com',
  projectId: 'react-todo-app-5409e',
  storageBucket: 'react-todo-app-5409e.appspot.com',
  messagingSenderId: '307287085404',
  appId: '1:307287085404:web:30710acfe88df098b07199',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase
  .firestore()
  .enablePersistence()
  .catch(function (err) {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log('multiple tabs');
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log('offline persistence not supported by browser');
    }
  });

export default firebase;
