import React from 'react';
import { Menu, Dropdown, Calendar } from 'antd';
import moment from 'moment';
import { updateTodo, deleteTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import { todayIsMyDay, getToday } from '../../utils/myDay';
import { getDueToday, getDueTomorrow } from '../../utils/dueDate';

const TodoItemContextMenu = ({
  onVisibleChange,
  todo,
  children,
  updateTodo,
  deleteTodo,
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

  function makeDueToday() {
    updateTodo({ ...todo, dueDate: getDueToday().toDate() });
  }

  function makeDueTomorrow() {
    updateTodo({ ...todo, dueDate: getDueTomorrow().toDate() });
  }

  function removeDueDate() {
    updateTodo({ ...todo, dueDate: null });
  }

  function handleDeleteTodo() {
    deleteTodo(todo);
  }

  function handleDueDateSelect(date) {
    updateTodo({ ...todo, dueDate: date.startOf('day').toDate() });
  }

  const contextMenu = todo ? (
    <Menu mode="vertical" selectable={false}>
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
      <Menu.Item onClick={makeDueToday}>Due Today</Menu.Item>
      <Menu.Item onClick={makeDueTomorrow}>Due Tomorrow</Menu.Item>
      <Menu.SubMenu title="Pick a Date">
        <Menu.Item style={{ width: 300 }} disabled>
          <Calendar
            fullscreen={false}
            onSelect={handleDueDateSelect}
            defaultValue={
              todo.dueDate ? moment.unix(todo.dueDate.seconds) : moment()
            }
          />
        </Menu.Item>
      </Menu.SubMenu>
      {todo.dueDate && (
        <Menu.Item onClick={removeDueDate}>Remove Due Date</Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item>Create a New list from This Task</Menu.Item>
      <Menu.SubMenu title="Move Task to...">
        {lists.map((list) => (
          <Menu.Item>{list.title}</Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Divider />
      <Menu.Item onClick={handleDeleteTodo}>Delete Task</Menu.Item>
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
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemContextMenu);
