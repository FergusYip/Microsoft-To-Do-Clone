import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';

const { Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Sider breakpoint="sm" collapsedWidth="0" trigger={null}>
          <Sidebar />
        </Sider>
        <Content>
          <TodoList todoListId={null} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
