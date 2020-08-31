import React, { useState } from 'react';
import {
  List,
  Button,
  ConfigProvider,
  Typography,
  Space,
  Layout,
  Menu,
  Dropdown,
  Row,
  Col,
  Drawer,
  PageHeader,
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
} from '@ant-design/icons';

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import CompletedList from './CompletedList';
import TodoMenu from '../TodoMenu/index';

const { Header, Content, Sider, Footer } = Layout;
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
  <div style={{ textAlign: 'center' }}>
    <Space direction="vertical">
      <SmileOutlined style={{ fontSize: 32 }} />
      <Typography.Text>Nothing left todo</Typography.Text>
    </Space>
  </div>
);

export default function TodoList({ todoListID }) {
  const [todos, setTodos] = useState(dummyList.todos);
  const [showCompleted, setShowCompleted] = useState(dummyList.showCompleted);
  const [selectedTodo, setSelectedTodo] = useState(null);

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

  const optionsDropdown = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Rename List
        </a>
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
      <Menu.Item icon={<DeleteOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Delete List
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <PageHeader
        className="site-page-header"
        title="List Title"
        extra={[
          <Button shape="round">
            <ShareAltOutlined />
          </Button>,
          <Dropdown
            overlay={optionsDropdown}
            placement="bottomRight"
            trigger={['click']}
          >
            <Button shape="round">
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Content>
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
          <CompletedList
            todos={todos}
            modifyTodo={modifyTodo}
            selectTodo={selectTodo}
          />
        )}
      </Content>
      <Footer>
        <AddTodo addTodo={addTodo} />
      </Footer>
      <TodoMenu
        todo={selectedTodo}
        modifyTodo={modifyTodo}
        onClose={hideDrawer}
        visible={visible}
      />
    </Layout>
  );
}
