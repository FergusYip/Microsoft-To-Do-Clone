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
import AddTodo from '../components/TodoList/AddTodo';
import Loading from '../components/Loading';

const TasksPage = ({ updateList, list, todos, tasksID }) => {
  const updateShowCompleted = () => {
    updateList({ ...list, showCompleted: !list.showCompleted });
  };

  const optionsDropdown = list && (
    <Menu>
      <Menu.Item icon={<SortAscendingOutlined />}>Sort</Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>Change Theme</Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>Print List</Menu.Item>
      <Menu.Item
        icon={list.showCompleted ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={updateShowCompleted}
      >
        {`${list.showCompleted ? 'Hide' : 'Show'} Completed Tasks`}
      </Menu.Item>
    </Menu>
  );

  return list ? (
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
      <TodoList todos={todos} showCompleted={list.showCompleted} />
      <AddTodo listID={tasksID} />
    </div>
  ) : (
    <Loading />
  );
};

const mapStateToProps = (state, ownProps) => {
  const { list, todos } = state.firestore.data;
  return {
    tasksID: state.firebase.profile.tasks,
    list,
    todos: todos ? Object.keys(todos).map((key) => todos[key]) : [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) =>
    props.tasksID
      ? [
          {
            collection: 'lists',
            doc: props.tasksID,
            storeAs: 'list',
          },
          {
            collection: 'todos',
            where: ['listID', '==', props.tasksID],
            storeAs: 'todos',
          },
        ]
      : []
  )
)(TasksPage);
