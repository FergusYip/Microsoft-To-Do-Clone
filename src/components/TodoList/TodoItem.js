import React from 'react';
import { Space, Typography, Tooltip, Checkbox, Button, List, Card } from 'antd';
import { StarOutlined, StarFilled, CheckOutlined } from '@ant-design/icons';
import { updateTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import TodoItemContextMenu from './TodoItemContextMenu';
import { selectTodo, deselectTodo } from '../../store/actions/selectionAction';

function TodoItem({
  todo,
  modifyTodo,
  onClick,
  updateTodo,
  selectTodo,
  deselectTodo,
}) {
  function onChange(e) {
    const newIsComplete = e.target.checked;
    updateTodo({ ...todo, isComplete: newIsComplete });
  }

  function toggleImportant() {
    updateTodo({ ...todo, isImportant: !todo.isImportant });
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

  function handleOnClick() {
    onClick(todo);
  }

  function checkboxOnClick(e) {
    e.stopPropagation();
  }

  function handleContextVisibleChange(visible) {
    if (visible) {
      selectTodo(todo);
    } else {
      deselectTodo(todo);
    }
  }

  return (
    <TodoItemContextMenu onVisibleChange={handleContextVisibleChange}>
      <Card
        style={{ width: '100%', marginTop: 8, marginBottom: 8 }}
        size="small"
      >
        <List.Item
          style={{ padding: 0 }}
          actions={[
            <Tooltip title="Important" mouseEnterDelay={0.5}>
              <Button
                icon={todo.isImportant ? <StarFilled /> : <StarOutlined />}
                onClick={toggleImportant}
                shape="circle"
                type="link"
              ></Button>
            </Tooltip>,
          ]}
        >
          <List.Item.Meta
            onClick={handleOnClick}
            avatar={
              <Tooltip
                title={todo.isComplete ? 'Mark as todo' : 'Mark as done'}
                mouseEnterDelay={0.5}
              >
                <Checkbox
                  onChange={onChange}
                  checked={todo.isComplete}
                  onClick={checkboxOnClick}
                />
              </Tooltip>
            }
            title={todo.title}
            description={getStepsOutline(todo.steps)}
          />
        </List.Item>
      </Card>
    </TodoItemContextMenu>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (todo) => dispatch(updateTodo(todo)),
    selectTodo: (todo) => dispatch(selectTodo(todo)),
    deselectTodo: () => dispatch(deselectTodo()),
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
