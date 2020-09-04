import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import TodoList from '../components/TodoList';

const ImportantPage = () => {
  useFirestoreConnect([
    {
      collectionGroup: 'todos',
      where: ['isImportant', '==', true],
    },
  ]);

  const { todos } = useSelector((state) => state.firestore.data);

  const [list, setList] = useState({});

  useEffect(() => {
    setList({
      title: 'Important',
      todos: todos ? Object.keys(todos).map((key) => todos[key]) : [],
    });
  }, [todos]);

  return (
    <div>
      <TodoList list={list} title={'Important'} />
    </div>
  );
};

export default ImportantPage;
