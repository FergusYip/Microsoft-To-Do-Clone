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
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createList } from '../../store/actions/listActions';
import { firestoreConnect } from 'react-redux-firebase';

import { useHistory } from 'react-router-dom';

const { Search } = Input;
const { Content, Footer } = Layout;

function Sidebar({ lists, createList }) {
  const history = useHistory();
  // const [lists, setLists] = useState(lists);

  // useEffect(() => {
  //   setLists(dummyLists);
  // }, []);

  function newList() {
    console.log('new list');
    createList(null); // TODO
    // setLists((lists) => [
    //   ...lists,
    //   {
    //     id: Math.max(lists.map((list) => list.id)) + 1,
    //     title: 'Untitled list',
    //   },
    // ]);
  }

  function handleMenuSelect({ item, key, keyPath, domEvent }) {
    console.log(item, key, keyPath, domEvent);
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
          <Menu.Item
            icon={<CheckCircleOutlined />}
            onClick={() => console.log('tasks')}
          >
            Tasks
          </Menu.Item>
          <Menu.Divider />
          {lists.map((list) => (
            <Menu.Item
              key={list.id}
              icon={<UnorderedListOutlined />}
              onClick={() => history.push(`/list/${list.id}`)}
            >
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

const mapToState = (state) => {
  console.log(state);
  return {
    lists: state.firestore.ordered.lists || state.list.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
  };
};

export default compose(
  connect(mapToState, mapDispatchToProps),
  firestoreConnect([{ collection: 'lists' }])
)(Sidebar);
