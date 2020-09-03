import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

export const PlannedPage = () => {
  return (
    <div>
      <TodoList list={[]} title="Planned" />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlannedPage);
