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
        <Sider
          theme="light"
          breakpoint="sm"
          collapsedWidth="0"
          trigger={null}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ overflow: 'initial' }}>
            <TodoList todoListId={null} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
