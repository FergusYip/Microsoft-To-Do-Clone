import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';

export const ImportantPage = () => {
  return (
    <div>
      <TodoList list={[]} title={'Important'} />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImportantPage);
