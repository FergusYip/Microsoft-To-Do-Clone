import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

const ProtectedRoute = ({ component: Component, auth, requested, ...rest }) => {
  const isLoaded =
    Object.values(requested).length &&
    Object.values(requested).some((isRequested) => isRequested);

  return isLoaded && auth.isLoaded ? (
    auth.uid ? (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    ) : (
      <Redirect to="/login" />
    )
  ) : (
    <Loading />
  );
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
