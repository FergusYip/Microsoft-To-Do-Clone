import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: 'todo-react-app-34634.firebaseapp.com',
  databaseURL: 'https://todo-react-app-34634.firebaseio.com',
  projectId: 'todo-react-app-34634',
  storageBucket: 'todo-react-app-34634.appspot.com',
  messagingSenderId: '877263611593',
  appId: '1:877263611593:web:909d44aba1aeee800b4f18',
  measurementId: 'G-SK2EWDTZM9',
};

/**
 * Call the 'recursiveDelete' callable function with a path to initiate
 * a server-side delete.
 */
export function deleteAtPath(path) {
  var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
  deleteFn({ path: path })
    .then(function (result) {
      console.log('Delete success: ' + JSON.stringify(result));
    })
    .catch(function (err) {
      console.log('Delete failed, see console,');
      console.warn(err);
    });
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
