import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyBjcndwPdnAdMQU2oANZbm0CPv1TqNC-S4',
  authDomain: 'todo-react-app-34634.firebaseapp.com',
  databaseURL: 'https://todo-react-app-34634.firebaseio.com',
  projectId: 'todo-react-app-34634',
  storageBucket: 'todo-react-app-34634.appspot.com',
  messagingSenderId: '877263611593',
  appId: '1:877263611593:web:909d44aba1aeee800b4f18',
  measurementId: 'G-SK2EWDTZM9',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
