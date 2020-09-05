import React from 'react';
import { connect, useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import { useFirestoreConnect } from 'react-redux-firebase';
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

const TasksPage = ({ tasksID, updateList }) => {
  useFirestoreConnect(
    tasksID
      ? [
          {
            collection: 'lists',
            doc: tasksID,
            storeAs: 'list',
          },
        ]
      : []
  );

  const { list } = useSelector((state) => state.firestore.data);

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
      <TodoList />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tasksID: state.firebase.profile.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
