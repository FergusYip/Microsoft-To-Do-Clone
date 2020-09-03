import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';

export const ImportantPage = () => {
  return (
    <div>
      <Typography.Title>Important</Typography.Title>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImportantPage);
