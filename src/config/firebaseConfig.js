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

export default firebase;
