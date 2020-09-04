import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import { useFirestoreConnect } from 'react-redux-firebase';

const TasksPage = ({ tasksID }) => {
  useFirestoreConnect(
    tasksID
      ? [
          {
            collection: 'lists',
            doc: tasksID,
            storeAs: 'list',
          },
          {
            collection: 'lists',
            doc: tasksID,
            subcollections: [{ collection: 'todos' }],
            storeAs: 'todos',
          },
        ]
      : []
  );

  const { list: listDetails, todos } = useSelector(
    (state) => state.firestore.data
  );

  const [list, setList] = useState({});

  useEffect(() => {
    setList({
      ...listDetails,
      todos: todos ? Object.keys(todos).map((key) => todos[key]) : [],
    });
  }, [listDetails, todos]);

  return (
    <div>
      <TodoList list={list} title={'Tasks'} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tasksID: state.firebase.profile.tasks,
  };
};

export default connect(mapStateToProps)(TasksPage);
