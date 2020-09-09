import React from 'react';
import { Menu, Dropdown, Calendar } from 'antd';
import moment from 'moment';
import { updateTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';

const TodoItemContextMenu = ({
  onVisibleChange,
  todo,
  children,
  updateTodo,
}) => {
  const todayIsMyDay =
    todo &&
    todo.myDay &&
    moment().isSame(moment.unix(todo.myDay.seconds), 'day');

  function updateMyDay() {
    if (todayIsMyDay) {
      updateTodo({ ...todo, myDay: null });
    } else {
      const today = moment().startOf('day').toDate();
      updateTodo({ ...todo, myDay: today });
    }
  }

  const contextMenu = (
    <Menu mode="vertical">
      <Menu.Item onClick={updateMyDay}>
        {todayIsMyDay ? 'Remove from My Day' : 'Add to My Day'}
      </Menu.Item>
      <Menu.Item>Mark as Important</Menu.Item>
      <Menu.Item>Mark as Completed</Menu.Item>
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
      <Menu.Item>Move Task to...</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Delete Task</Menu.Item>
    </Menu>
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
  return { todo };
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
