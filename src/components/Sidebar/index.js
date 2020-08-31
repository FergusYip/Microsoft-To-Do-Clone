import React, { useState, useEffect } from 'react';
import { Menu, Input, Divider, Typography, Space, List } from 'antd';
import {
  CoffeeOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const { Search } = Input;

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
    <div>
      <Search
        placeholder="input search text"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
      />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
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
            {/* {list.title} */}
          </Menu.Item>
        ))}
        {/* <Menu.Item>
          <List
            dataSource={lists}
            renderItem={(list) => (
              <List.Item
                actions={
                  <Typography.Text>
                    {list.numTodo > 0 && list.numTodo}
                  </Typography.Text>
                }
              >
                <List.Item.Meta
                  avatar={<UnorderedListOutlined />}
                  title={list.title}
                ></List.Item.Meta>
              </List.Item>
            )}
          />
        </Menu.Item> */}
      </Menu>
      {/* <List
        dataSource={lists}
        renderItem={(list) => (
          <List.Item key={list.id}>
            <List.Item.Meta
              avatar={<UnorderedListOutlined />}
              title={list.title}
            ></List.Item.Meta>
            <Typography.Text>
              {list.numTodo > 0 ? list.numTodo : ''}
            </Typography.Text>
          </List.Item>
        )}
      /> */}
      <Divider />
      <Menu
        theme="dark"
        mode="inline"
        selectable={false}
        style={{ position: 'fixed', bottom: 0 }}
      >
        <Menu.Item icon={<PlusOutlined />} onClick={newList}>
          New List
        </Menu.Item>
      </Menu>
    </div>
  );
}
