import React from 'react';
import { List } from 'antd';

import TodoItem from './TodoItem';

export default function CompletedList({ todos, modifyTodo, selectTodo }) {
  return (
    <div>
      {todos.filter((todo) => todo.isComplete).length !== 0 && (
        <List
          header={<div>Completed</div>}
          bordered
          dataSource={todos.filter((todo) => todo.isComplete)}
          renderItem={(todo) => (
            <TodoItem
              todo={todo}
              modifyTodo={modifyTodo}
              selectTodo={selectTodo}
            />
          )}
        />
      )}
    </div>
  );
}