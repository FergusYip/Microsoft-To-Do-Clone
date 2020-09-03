import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

export const TasksPage = () => {
  return (
    <div>
      <TodoList list={[]} title={'Tasks'} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
