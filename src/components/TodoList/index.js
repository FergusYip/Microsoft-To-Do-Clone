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
  Row,
  Col,
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
} from '@ant-design/icons';

import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import CompletedList from './CompletedList';
import TodoMenu from '../TodoMenu/index';
import { deleteList } from '../../store/actions/listActions';
import { connect } from 'react-redux';
import { selectTodo, deselectTodo } from '../../store/actions/selectionAction';

const { Header, Content, Sider, Footer } = Layout;
const { confirm } = Modal;

/*
Todo:
id
title
isComplete
isImportant
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
      isImportant: true,
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
      isImportant: true,
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
      isImportant: true,
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

function TodoList({
  list,
  listID = list.id,
  title = list.title,
  selectTodo,
  deselectTodo,
}) {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(dummyList.showCompleted);
  const [selectedTodo, setSelectedTodo] = useState(null);

  function addTodo(newTodo) {
    setTodos((todos) => [...todos, newTodo]);
  }

  useEffect(() => {
    setTodos(list && list.todos ? list.todos : []);
  }, [list]);

  return !list ? (
    <p>loading</p>
  ) : (
    <Layout>
      <Content
      // style={{ padding: 24, display: 'flex', flexDirection: 'column',  }}
      >
        <ConfigProvider renderEmpty={customizeEmptyTodo}>
          <List
            bordered
            dataSource={todos.filter((todo) => !todo.isComplete)}
            renderItem={(todo) => <TodoItem todo={todo} onClick={selectTodo} />}
          />
        </ConfigProvider>
        {showCompleted && (
          // <Collapse>
          //   <Collapse.Panel>
          <CompletedList todos={todos} onClick={selectTodo} listID={listID} />
          //   </Collapse.Panel>
          // </Collapse>
        )}
      </Content>
      <AddTodo addTodo={addTodo} listID={listID} />
      <TodoMenu onClose={deselectTodo} />
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (list) => dispatch(deleteList(list)),
    selectTodo: (listID, todoID) => dispatch(selectTodo(listID, todoID)),
    deselectTodo: () => dispatch(deselectTodo()),
  };
};

export default connect(null, mapDispatchToProps)(TodoList);
