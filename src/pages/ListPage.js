import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// import { useRouteMatch } from 'react-router-dom';

import TodoList from '../components/TodoList';

export const ListPage = ({ list }) => {
  return (
    <div>
      <TodoList list={list} title={list.title} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const lists = state.firestore.data.lists;
  const list = lists ? state.firestore.data.lists[id] : null;
  const todos = state.firestore.data.todos;
  return {
    list: {
      ...list,
      todos:
        todos && Object.keys(todos).map((key) => ({ ...todos[key], id: key })),
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
)(TodoList);
