import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebaseConfig from '../config/firebaseConfig';
import logger from 'redux-logger';

const middleware = [
  thunk.withExtraArgument({ getFirestore, getFirebase }),
  logger,
];

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), reduxFirestore(firebaseConfig))
);

export const persistor = persistStore(store);

export default { store, persistor };
