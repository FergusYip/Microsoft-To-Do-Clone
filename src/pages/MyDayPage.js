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

export const MyDayPage = ({ list, todos }) => {
  // const updateShowCompleted = () => {
  //   updateList({ ...list, showCompleted: !list.showCompleted });
  // };

  const optionsDropdown = list && (
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
      <TodoList list={list} todos={todos} />
    </div>
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
            where: ['myDay', '==', moment().startOf('day').toDate()],
            storeAs: 'todos',
          },
        ]
      : []
  )
)(MyDayPage);
