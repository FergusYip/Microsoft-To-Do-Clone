import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { firestoreConnect } from 'react-redux-firebase';
import ContentHeader from '../components/ContentHeader';
import { Button, Dropdown, Menu } from 'antd';
import { compose } from 'redux';
import {
  EllipsisOutlined,
  SortAscendingOutlined,
  BgColorsOutlined,
  PrinterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { updateList } from '../store/actions/listActions';
import moment from 'moment';
import AddTodo from '../components/TodoList/AddTodo';

export const MyDayPage = ({ todos, tasksID, requesting }) => {
  // const updateShowCompleted = () => {
  //   updateList({ ...list, showCompleted: !list.showCompleted });
  // };

  const optionsDropdown = (
    <Menu>
      <Menu.Item icon={<SortAscendingOutlined />}>Sort</Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>Change Theme</Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>Print List</Menu.Item>
      {/* <Menu.Item
        icon={list.showCompleted ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={updateShowCompleted}
      >
        {`${list.showCompleted ? 'Hide' : 'Show'} Completed Tasks`}
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div>
      <ContentHeader title={'My Day'}>
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
      <TodoList todos={todos} isLoading={requesting.todos} />
      <AddTodo listID={tasksID} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { todos } = state.firestore.data;
  return {
    tasksID: state.firebase.profile.tasks,
    todos: todos ? Object.keys(todos).map((key) => todos[key]) : [],
    requesting: state.firestore.status.requesting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {
      collection: 'todos',
      where: ['myDay', '==', moment().startOf('day').toDate()],
      storeAs: 'todos',
    },
  ])
)(MyDayPage);
