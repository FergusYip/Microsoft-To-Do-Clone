import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Result, Spin } from 'antd';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return auth.isLoaded ? (
    auth.uid ? (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    ) : (
      <Redirect to="/login" />
    )
  ) : (
    <Result icon={<Spin size="large" />} title="Loading" />
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
