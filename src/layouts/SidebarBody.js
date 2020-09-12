import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';

const { Sider, Content } = Layout;

export default function SidebarBody({ children }) {
  const [contentMargin, setContentMargin] = useState(0);

  function switchMargin() {
    setContentMargin((oldMargin) => (oldMargin === 0 ? 200 : 0));
  }

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="sm"
        collapsedWidth="0"
        trigger={null}
        style={{
          overflow: 'hidden',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        onBreakpoint={switchMargin}
      >
        <Sidebar />
      </Sider>
      <Layout style={{ marginLeft: contentMargin }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
