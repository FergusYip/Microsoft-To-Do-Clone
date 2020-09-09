import React from 'react';
import { List, Typography } from 'antd';

import TodoItem from './TodoItem';

export default function CompletedList({ todos, modifyTodo, onClick }) {
  return (
    <div>
      {todos.filter((todo) => todo.isComplete).length !== 0 && (
        <List
          header={
            <Typography.Title level={5} style={{ margin: '0px 0px 0px 5px' }}>
              Completed
            </Typography.Title>
          }
          dataSource={todos.filter((todo) => todo.isComplete)}
          renderItem={(todo) => (
            <TodoItem todo={todo} modifyTodo={modifyTodo} onClick={onClick} />
          )}
        />
      )}
    </div>
  );
}
