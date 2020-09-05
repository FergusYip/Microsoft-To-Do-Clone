import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

const UnprotectedRoute = ({ component: Component, auth, ...rest }) => {
  return auth.isLoaded ? (
    !auth.uid ? (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    ) : (
      <Redirect to="/myday" />
    )
  ) : (
    <Loading />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(UnprotectedRoute);
