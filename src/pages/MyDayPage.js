import React from 'react';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import ContentHeader from '../components/ContentHeader';
import { Button, Dropdown, Menu, Typography } from 'antd';
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
import { todayIsMyDay, getToday } from '../utils/myDay';
import { showCompletedTasks } from '../store/actions/myDayActions/showCompleteAction';
import { hideCompletedTasks } from '../store/actions/myDayActions/hideCompleteAction';
import moment from 'moment';

export const MyDayPage = ({
  todos,
  tasksID,
  myDay,
  hideCompletedTasks,
  showCompletedTasks,
}) => {
  function updateShowCompleted() {
    if (myDay.showCompleted) {
      hideCompletedTasks();
    } else {
      showCompletedTasks();
    }
  }

  const optionsDropdown = (
    <Menu>
      <Menu.Item icon={<SortAscendingOutlined />}>Sort</Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>Change Theme</Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>Print List</Menu.Item>
      <Menu.Item
        icon={
          myDay && myDay.showCompleted ? (
            <EyeInvisibleOutlined />
          ) : (
            <EyeOutlined />
          )
        }
        onClick={updateShowCompleted}
      >
        {`${myDay && myDay.showCompleted ? 'Hide' : 'Show'} Completed Tasks`}
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <ContentHeader
        title={'My Day'}
        content={
          <Typography.Title
            level={5}
            style={{ margin: 0, position: 'relative', top: -16 }}
          >
            {moment().format('dddd, D MMMM')}
          </Typography.Title>
        }
      >
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
      <TodoList todos={todos} showCompleted={myDay && myDay.showCompleted} />
      <AddTodo listID={tasksID} todoFields={{ myDay: getToday() }} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { todos } = state.firestore.data;
  return {
    myDay: state.firebase.profile.settings.myDay,
    tasksID: state.firebase.profile.tasks,
    todos: todos
      ? Object.values(todos).filter((todo) => todo && todayIsMyDay(todo))
      : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
    showCompletedTasks: () => dispatch(showCompletedTasks()),
    hideCompletedTasks: () => dispatch(hideCompletedTasks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDayPage);
