import React, { useState, useEffect } from 'react';
import { Menu, Input, Typography, List, Layout, PageHeader } from 'antd';
import {
  CoffeeOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { Content, Footer } = Layout;

const dummyLists = [
  { id: 1, title: 'Groceries', numTodo: 5 },
  { id: 2, title: 'Homework', numTodo: 2 },
  { id: 3, title: 'Movie Watchlist', numTodo: 0 },
];

export default function Sidebar() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setLists(dummyLists);
  }, []);

  function newList() {
    console.log('new list');
    setLists((lists) => [
      ...lists,
      {
        id: Math.max(lists.map((list) => list.id)) + 1,
        title: 'Untitled list',
      },
    ]);
  }
  return (
    <Layout>
      <PageHeader
        title="Todo"
        backIcon={false}
        avatar={{ icon: <UserOutlined /> }} // TODO: User image
      />
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 16,
        }}
      >
        <Search
          placeholder="Search"
          onSearch={(value) => console.log(value)}
          style={{ width: '80%' }}
        />
      </span>
      <Content>
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item icon={<CoffeeOutlined />}>My Day</Menu.Item>
          <Menu.Item icon={<StarOutlined />}>Important</Menu.Item>
          <Menu.Item icon={<CalendarOutlined />}>Planned</Menu.Item>
          <Menu.Item icon={<CheckCircleOutlined />}>Tasks</Menu.Item>
          <Menu.Divider />
          {lists.map((list) => (
            <Menu.Item key={list.id} icon={<UnorderedListOutlined />}>
              {list.title}
              <List.Item>
                <List.Item.Meta title={list.title}></List.Item.Meta>
                <Typography.Text>
                  {list.numTodo > 0 ? list.numTodo : ''}
                </Typography.Text>
              </List.Item>
            </Menu.Item>
          ))}
        </Menu>
      </Content>
      <Footer style={{ padding: 0, width: '100%' }}>
        <Menu
          mode="inline"
          selectable={false}
          style={{ position: 'fixed', bottom: 0, width: '100%' }}
        >
          <Menu.Item icon={<PlusOutlined />} onClick={newList}>
            New List
          </Menu.Item>
        </Menu>
      </Footer>
    </Layout>
  );
}
