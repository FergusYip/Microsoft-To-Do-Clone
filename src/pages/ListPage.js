import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import TodoList from '../components/TodoList';

export const ListPage = ({ list }) => {
  return (
    <div>
      <TodoList list={list} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { list, todos } = state.firestore.data;
  return {
    list: {
      ...list,
      todos: todos && Object.keys(todos).map((key) => todos[key]),
    },
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: 'lists',
      doc: props.match.params.id,
      storeAs: 'list',
    },
    {
      collection: `lists/${props.match.params.id}/todos`,
      storeAs: 'todos',
    },
  ])
)(ListPage);
