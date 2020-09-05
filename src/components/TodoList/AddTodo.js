import React, { useState } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { createTodo } from '../../store/actions/todoActions';

function AddTodo({ listID, createTodo }) {
  const [newTodo, setNewTodo] = useState('');

  function onChange(e) {
    setNewTodo(e.target.value);
  }

  function onSubmit(e) {
    const title = e.target.value;
    if (!title) return;
    const todo = {
      title: title,
      listID: listID,
      isComplete: false,
      isImportant: false,
      steps: [],
    };
    setNewTodo('');
    createTodo(todo);
  }

  return (
    <div style={{ padding: 16, display: 'flex' }}>
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
    createTodo: (todo) => dispatch(createTodo(todo)),
  };
};

export default connect(null, mapDispatchToProps)(AddTodo);
