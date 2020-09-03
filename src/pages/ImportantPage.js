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
  const id = ownProps.match.params.id;
  const lists = state.firestore.data.lists;
  const list = lists ? state.firestore.data.lists[id] : null;
  const todos = state.firestore.data.todos;
  return {
    listId: id,
    list: {
      ...list,
      id: id,
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
)(ImportantPage);
