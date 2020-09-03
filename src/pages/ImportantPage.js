import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import TodoList from '../components/TodoList';

export const ImportantPage = ({ list }) => {
  return (
    <div>
      <TodoList list={list} title={'Important'} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { todos } = state.firestore.data;
  return {
    list: {
      todos: todos ? Object.keys(todos).map((key) => todos[key]) : [],
    },
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collectionGroup: 'todos',
      where: ['isImportant', '==', true],
    },
  ])
)(ImportantPage);
