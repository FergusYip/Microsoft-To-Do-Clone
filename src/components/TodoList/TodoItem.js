import React, { useState, useEffect } from 'react';
import { Space, Typography, Tooltip, Checkbox, Button, List } from 'antd';
import { StarOutlined, StarFilled, CheckOutlined } from '@ant-design/icons';

export default function TodoItem({ todo, modifyTodo, selectTodo }) {
  // const [isComplete, setIsComplete] = useState();
  // const [isFavorite, setIsFavorite] = useState();

  function onChange(e) {
    const newIsComplete = e.target.checked;
    const modifiedTodo = { ...todo };
    modifiedTodo.isComplete = newIsComplete;
    modifyTodo(modifiedTodo);
  }

  function toggleFavorite() {
    const modifiedTodo = { ...todo };
    modifiedTodo.isFavorite = !modifiedTodo.isFavorite;
    modifyTodo(modifiedTodo);
  }

  // useEffect(() => {
  //   setIsComplete(todo.isComplete);
  //   setIsFavorite(todo.isFavorite);
  // }, [todo]);

  function getStepsOutline(steps) {
    if (steps.length === 0) return null;
    const completedSteps = steps.filter((step) => step.isComplete);
    return (
      <Space>
        {completedSteps.length === steps.length && <CheckOutlined />}
        <Typography.Text>
          {`${completedSteps.length} of ${steps.length}`}
        </Typography.Text>
      </Space>
    );
  }

  function selectThis() {
    selectTodo(todo);
  }

  return (
    <List.Item
      actions={[
        <Tooltip title="Favorite" mouseEnterDelay={0.5}>
          <Button
            icon={todo.isFavorite ? <StarFilled /> : <StarOutlined />}
            onClick={toggleFavorite}
            shape="circle"
          ></Button>
        </Tooltip>,
      ]}
    >
      <List.Item.Meta
        onClick={selectThis}
        avatar={
          <Tooltip
            title={todo.isComplete ? 'Mark as todo' : 'Mark as done'}
            mouseEnterDelay={0.5}
          >
            <Checkbox onChange={onChange} checked={todo.isComplete} />
          </Tooltip>
        }
        title={todo.title}
        description={getStepsOutline(todo.steps)}
      />
    </List.Item>
  );
}
