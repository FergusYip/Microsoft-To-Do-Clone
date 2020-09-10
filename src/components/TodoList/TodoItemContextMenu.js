import React from 'react';
import { Menu, Dropdown, Calendar } from 'antd';
import moment from 'moment';
import { updateTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import { todayIsMyDay, getToday } from '../../utils/myDay';

const TodoItemContextMenu = ({
  onVisibleChange,
  todo,
  children,
  updateTodo,
  lists,
}) => {
  function updateMyDay() {
    updateTodo({ ...todo, myDay: todayIsMyDay(todo) ? null : getToday() });
  }

  function updateImportant() {
    updateTodo({ ...todo, isImportant: !todo.isImportant });
  }

  function updateCompletion() {
    updateTodo({ ...todo, isComplete: !todo.isComplete });
  }

  const contextMenu = todo ? (
    <Menu mode="vertical">
      <Menu.Item onClick={updateMyDay}>
        {todayIsMyDay(todo) ? 'Remove from My Day' : 'Add to My Day'}
      </Menu.Item>
      <Menu.Item onClick={updateImportant}>
        {todo.isImportant ? 'Remove Importance' : 'Mark as Important'}
      </Menu.Item>
      <Menu.Item onClick={updateCompletion}>
        {todo.isComplete ? 'Mark as Not Completed' : 'Mark as Completed'}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>Due Today</Menu.Item>
      <Menu.Item>Due Tomorrow</Menu.Item>
      {/* <Menu.Item>Pick a Date</Menu.Item> */}
      <Menu.SubMenu title="Pick a Date">
        <Menu.Item style={{ width: 300 }} disabled>
          <Calendar fullscreen={false} />
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Divider />
      <Menu.Item>Create a New list from This Task</Menu.Item>
      <Menu.SubMenu title="Move Task to...">
        {lists.map((list) => (
          <Menu.Item>{list.title}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Divider />
      <Menu.Item>Delete Task</Menu.Item>
    </Menu>
  ) : (
    <Menu />
  );

  return (
    <Dropdown
      overlay={contextMenu}
      trigger={['contextMenu']}
      onVisibleChange={onVisibleChange}
    >
      {children}
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  const todo =
    state.firestore.data.todos &&
    state.firestore.data.todos[state.selectedTodoID];
  const lists = Object.values(state.firestore.data.lists);
  return { todo, lists };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (todo) => dispatch(updateTodo(todo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemContextMenu);
