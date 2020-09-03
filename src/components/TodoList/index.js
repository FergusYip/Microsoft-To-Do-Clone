import React, { useState, useEffect } from 'react';
import {
  List,
  Button,
  ConfigProvider,
  Typography,
  Space,
  Layout,
  Menu,
  Dropdown,
  PageHeader,
  Collapse,
  Modal,
  Input,
  Result,
} from 'antd';
import {
  SmileOutlined,
  EllipsisOutlined,
  EditOutlined,
  SortAscendingOutlined,
  BgColorsOutlined,
  PrinterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  ExclamationCircleOutlined,
  IdcardOutlined,
} from '@ant-design/icons';

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import CompletedList from './CompletedList';
import TodoMenu from '../TodoMenu/index';

const { Header, Content, Sider, Footer } = Layout;
const { confirm } = Modal;

/*
Todo:
id
title
isComplete
isFavorite
steps: [...]
Remind me
Due date
Repeat
Files: [...]
Note
*/

/*
Step:
id
title
isComplete
*/

const dummyList = {
  title: 'Todo list',
  sort: null,
  theme: null,
  showCompleted: true,
  todos: [
    {
      id: 1,
      title: 'Eat fruit',
      isComplete: false,
      isFavorite: true,
      steps: [
        { id: 1, title: 'Peel fruit', isComplete: true },
        { id: 2, title: 'Cut fruit', isComplete: false },
      ],
      remindMe: null,
      dueDate: null,
      repeat: null,
      files: [],
      Note: '',
    },
    {
      id: 2,
      title: 'Buy groceries',
      isComplete: true,
      isFavorite: true,
      steps: [
        { id: 3, title: 'Buy apples', isComplete: true },
        { id: 4, title: 'Buy Fish', isComplete: true },
      ],
      remindMe: null,
      dueDate: null,
      repeat: null,
      files: [],
      Note: '',
    },
    {
      id: 3,
      title: 'Finish todolist',
      isComplete: false,
      isFavorite: true,
      steps: [],
      remindMe: null,
      dueDate: null,
      repeat: null,
      files: [],
      Note: '',
    },
  ],
};

const customizeEmptyTodo = () => (
  <Result
    icon={<SmileOutlined />}
    title="Nothing todo"
    // extra={<Button type="primary">Next</Button>}
  />
);

function TodoList({ list, title = list.title }) {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(dummyList.showCompleted);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const hideDrawer = () => {
    setVisible(false);
  };

  function addTodo(newTodo) {
    setTodos((todos) => [...todos, newTodo]);
  }

  function modifyTodo(modifiedTodo) {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === modifiedTodo.id ? modifiedTodo : todo))
    );
  }

  function updateShowCompleted() {
    setShowCompleted((showCompleted) => !showCompleted);
  }

  function selectTodo(todo) {
    setSelectedTodo(todo);
    showDrawer();
  }

  useEffect(() => {
    setTodos(list && list.todos ? list.todos : []);
  }, [list]);

  const optionsDropdown = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={handleRename}>
        Rename List
      </Menu.Item>
      <Menu.Item icon={<SortAscendingOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Sort
        </a>
      </Menu.Item>
      <Menu.Item icon={<BgColorsOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Change Theme
        </a>
      </Menu.Item>
      <Menu.Item icon={<PrinterOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Print List
        </a>
      </Menu.Item>
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
      title: '“List title” will be permanently deleted.',
      icon: <ExclamationCircleOutlined />,
      content: "You won't be able to undo this action",
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleRename() {
    setEditingTitle(true);
  }

  function confirmRename() {
    setEditingTitle(false);
  }

  return !list ? (
    <p>loading</p>
  ) : (
    <Layout>
      <PageHeader
        title={
          editingTitle ? (
            <Input
              className="ant-typography"
              bordered={false}
              placeholder={'List Title'}
              onPressEnter={confirmRename}
              autoFocus
            />
          ) : (
            <Typography.Title level={3}>{title}</Typography.Title>
          )
        }
        extra={[
          <Button shape="circle">
            <ShareAltOutlined />
          </Button>,
          <Dropdown
            overlay={optionsDropdown}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button shape="circle">
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Content
      // style={{ padding: 24, display: 'flex', flexDirection: 'column',  }}
      >
        <ConfigProvider renderEmpty={customizeEmptyTodo}>
          <List
            bordered
            dataSource={todos.filter((todo) => !todo.isComplete)}
            renderItem={(todo) => (
              <TodoItem
                todo={todo}
                modifyTodo={modifyTodo}
                selectTodo={selectTodo}
              />
            )}
          />
        </ConfigProvider>
        {showCompleted && (
          // <Collapse>
          //   <Collapse.Panel>
          <CompletedList
            todos={todos}
            modifyTodo={modifyTodo}
            selectTodo={selectTodo}
          />
          //   </Collapse.Panel>
          // </Collapse>
        )}
      </Content>
      <Footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <AddTodo addTodo={addTodo} />
      </Footer>
      {/* <TodoMenu
        todo={selectedTodo}
        modifyTodo={modifyTodo}
        onClose={hideDrawer}
        visible={visible}
      /> */}
    </Layout>
  );
}

export default TodoList;
