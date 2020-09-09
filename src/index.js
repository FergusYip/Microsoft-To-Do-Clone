import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider, useSelector } from 'react-redux';
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from 'redux-firestore';
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from 'react-redux-firebase';
import firebaseConfig from './config/firebaseConfig';
import firebase from 'firebase/app';
import Loading from './components/Loading';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: { ...firebaseConfig, ...rrfConfig },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) {
    return <Loading />;
  }
  return children;
}

ReactDOM.render(
  <React.StrictMode>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </PersistGate>
      </Provider>
    </ReactReduxFirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
