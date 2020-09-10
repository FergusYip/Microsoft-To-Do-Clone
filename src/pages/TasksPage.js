import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import ContentHeader from '../components/ContentHeader';
import { Button, Dropdown, Menu } from 'antd';
import {
  EllipsisOutlined,
  SortAscendingOutlined,
  BgColorsOutlined,
  PrinterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { updateList } from '../store/actions/listActions';
import AddTodo from '../components/TodoList/AddTodo';

const TasksPage = ({ updateList, list, todos, tasksID }) => {
  const updateShowCompleted = () => {
    list && updateList({ ...list, showCompleted: !list.showCompleted });
  };

  const optionsDropdown = (
    <Menu selectable={false}>
      <Menu.Item icon={<SortAscendingOutlined />}>Sort</Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>Change Theme</Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>Print List</Menu.Item>
      <Menu.Item
        icon={
          list && list.showCompleted ? (
            <EyeInvisibleOutlined />
          ) : (
            <EyeOutlined />
          )
        }
        onClick={updateShowCompleted}
      >
        {`${list && list.showCompleted ? 'Hide' : 'Show'} Completed Tasks`}
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <ContentHeader title={'Tasks'}>
        <Dropdown
          overlay={optionsDropdown}
          placement="bottomRight"
          trigger={['click']}
          key="more"
        >
          <Button shape="circle">
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </ContentHeader>
      <TodoList todos={todos} showCompleted={list && list.showCompleted} />
      <AddTodo listID={tasksID} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const tasksID = state.firebase.profile.tasks;
  const { lists, todos } = state.firestore.data;
  return {
    tasksID,
    list: lists && lists[[tasksID]],
    todos: todos
      ? Object.values(todos).filter((todo) => todo && todo.listID === tasksID)
      : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
