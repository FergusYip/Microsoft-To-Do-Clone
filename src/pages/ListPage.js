import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import TodoList from '../components/TodoList';
import ContentHeader from '../components/ContentHeader';
import { message, Button, Dropdown, Menu, Modal } from 'antd';
import {
  ShareAltOutlined,
  EllipsisOutlined,
  EditOutlined,
  SortAscendingOutlined,
  BgColorsOutlined,
  PrinterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { updateList, deleteList } from '../store/actions/listActions';

const { confirm } = Modal;

export const ListPage = ({ list, deleteList, updateList, isLoading }) => {
  const [showCompleted, setShowCompleted] = useState(list.showCompleted);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const hideDrawer = () => {
    setVisible(false);
  };

  function updateShowCompleted() {
    setShowCompleted((showCompleted) => !showCompleted);
  }

  const optionsDropdown = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={handleRename}>
        Rename List
      </Menu.Item>
      <Menu.Item icon={<SortAscendingOutlined />}>Sort</Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>Change Theme</Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>Print List</Menu.Item>
      <Menu.Item
        icon={showCompleted ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        onClick={updateShowCompleted}
      >
        {`${showCompleted ? 'Hide' : 'Show'} Completed Tasks`}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<DeleteOutlined />} onClick={showDeleteConfirm}>
        Delete List
      </Menu.Item>
    </Menu>
  );

  function showDeleteConfirm() {
    confirm({
      title: `“${list.title}” will be permanently deleted.`,
      icon: <ExclamationCircleOutlined />,
      content: "You won't be able to undo this action",
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteList(list);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    if (!isLoading && isRenaming) {
      setIsRenaming(false);
      message.success(`List has been renamed to "${list.title}"`);
    }
  }, [isLoading]);

  function handleRename() {
    setIsRenaming(true);
  }

  function onRenamed(newTitle) {
    updateList({ ...list, title: newTitle });
  }

  function onRenameCancel() {
    setIsRenaming(false);
  }

  return (
    <div>
      <ContentHeader
        title={list.title}
        isRenaming={isRenaming}
        onRenamed={onRenamed}
        onCancel={onRenameCancel}
      >
        <Button key="share" shape="circle">
          <ShareAltOutlined />
        </Button>
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
      <TodoList list={list} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { isLoading } = state.list;
  const { list, todos } = state.firestore.data;
  return {
    isLoading,
    list: {
      ...list,
      todos: todos && Object.keys(todos).map((key) => todos[key]),
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateList: (list) => dispatch(updateList(list)),
    deleteList: (list) => dispatch(deleteList(list)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: 'lists',
      doc: props.match.params.id,
      storeAs: 'list',
    },
    {
      collection: 'todos',
      where: ['listID', '==', props.match.params.id],
      storeAs: 'todos',
    },
  ])
)(ListPage);
