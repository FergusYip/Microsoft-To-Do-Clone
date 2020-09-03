import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';

export const PlannedPage = () => {
  return (
    <div>
      <Typography.Title>Planned</Typography.Title>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlannedPage);
