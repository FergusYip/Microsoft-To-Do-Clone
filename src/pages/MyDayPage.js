import React from 'react';
import { connect } from 'react-redux';
// import TodoList from '../components/TodoList';

export const MyDayPage = () => {
  return <div>{/* <TodoList list={[]} title={'My Day'} /> */}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyDayPage);
