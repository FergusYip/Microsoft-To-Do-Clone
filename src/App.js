import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';

const { Sider, Content } = Layout;

function App() {
  const [contentMargin, setContentMargin] = useState(0);

  function switchMargin() {
    setContentMargin((oldMargin) => (oldMargin === 0 ? 200 : 0));
  }

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
          onBreakpoint={switchMargin}
        >
          <Sidebar />
        </Sider>
        <Layout style={{ marginLeft: contentMargin }}>
          <Content>
            <TodoList todoListId={null} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
