import React, { useState } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { createTodo } from '../../store/actions/todoActions';

function AddTodo({ listId, createTodo, addTodo }) {
  const [newTodo, setNewTodo] = useState('');

  function onChange(e) {
    setNewTodo(e.target.value);
  }

  function onSubmit(e) {
    const title = e.target.value;
    if (!title) return;
    const todo = {
      title: title,
      isComplete: false,
    };
    setNewTodo('');
    createTodo(listId, todo);
  }

  return (
    <div>
      <Input
        placeholder="New Todo"
        onChange={onChange}
        value={newTodo}
        onPressEnter={onSubmit}
      />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (listId, todo) => dispatch(createTodo(listId, todo)),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
