import React, { useState } from 'react';
import { Input } from 'antd';

export default function AddTodo({ addTodo }) {
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
    addTodo(todo);
    setNewTodo('');
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
