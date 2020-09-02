import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    auth.isLoaded &&
    (auth.uid ? (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    ) : (
      <Redirect to="/login" />
    ))
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
