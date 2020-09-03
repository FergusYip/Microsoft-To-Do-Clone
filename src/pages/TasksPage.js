import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';

export const TasksPage = () => {
  return (
    <div>
      <Typography.Title>Tasks</Typography.Title>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
