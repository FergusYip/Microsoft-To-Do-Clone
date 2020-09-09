import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const ProtectedRoute = ({ component: Component, auth, requested, ...rest }) => {
  const isLoaded =
    Object.values(requested).length &&
    Object.values(requested).some((isRequested) => isRequested);

  if (!auth.isLoaded) {
    return <Loading />;
  }

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (isLoaded) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  }

  return <Loading />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    requested: state.firestore.status.requested,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(({ auth: { uid } }) =>
    uid
      ? [
          {
            collection: 'lists',
            where: ['owner', '==', uid],
            storeAs: 'lists',
          },
          {
            collection: 'todos',
            where: ['owner', '==', uid],
            storeAs: 'todos',
          },
        ]
      : []
  )
)(ProtectedRoute);
