import React from 'react';
import { Space, Typography, Tooltip, Checkbox, Button, List } from 'antd';
import { StarOutlined, StarFilled, CheckOutlined } from '@ant-design/icons';
import { updateTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import TodoItemContextMenu from './TodoItemContextMenu';

function TodoItem({ listId, todo, modifyTodo, selectTodo, updateTodo }) {
  function onChange(e) {
    const newIsComplete = e.target.checked;
    updateTodo(listId, { ...todo, isComplete: newIsComplete });
  }

  function toggleFavorite() {
    updateTodo(listId, { ...todo, isImportant: !todo.isImportant });
  }

  function getStepsOutline(steps) {
    if (!steps || steps.length === 0) return null;
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
    <TodoItemContextMenu>
      <List.Item
        actions={[
          <Tooltip title="Favorite" mouseEnterDelay={0.5}>
            <Button
              icon={todo.isImportant ? <StarFilled /> : <StarOutlined />}
              onClick={toggleFavorite}
              shape="circle"
              type="link"
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
    </TodoItemContextMenu>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (listId, todo) => dispatch(updateTodo(listId, todo)),
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
