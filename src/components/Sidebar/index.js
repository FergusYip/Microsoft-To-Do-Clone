import React, { useState, useEffect } from 'react';
import { Menu, Input, Typography, List, Layout, PageHeader } from 'antd';
import {
  CoffeeOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createList } from '../../store/actions/listActions';
import { firestoreConnect } from 'react-redux-firebase';

import { useHistory } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import NewListButton from './NewListButton';
import NewListModal from './NewListModal';

const { Search } = Input;
const { Content, Footer } = Layout;

function Sidebar({ lists, createList }) {
  const history = useHistory();
  // const [lists, setLists] = useState(lists);

  // useEffect(() => {
  //   setLists(dummyLists);
  // }, []);

  function handleMenuSelect({ item, key, keyPath, domEvent }) {
    console.log(item, key, keyPath, domEvent);
  }

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setIsVisible(false);
    createList(e);
  };

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  return (
    <Layout>
      <SidebarHeader />
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
          <Menu.Item
            icon={<CoffeeOutlined />}
            onClick={() => history.push('/myday')}
            title="My Day"
          >
            My Day
          </Menu.Item>
          <Menu.Item
            icon={<StarOutlined />}
            onClick={() => history.push('/important')}
            title="Important"
          >
            Important
          </Menu.Item>
          <Menu.Item
            icon={<CalendarOutlined />}
            onClick={() => history.push('/planned')}
            title="Planned"
          >
            Planned
          </Menu.Item>
          <Menu.Item
            icon={<CheckCircleOutlined />}
            onClick={() => history.push('/tasks')}
            title="Tasks"
          >
            Tasks
          </Menu.Item>
          <Menu.Divider />
          {lists.map((list) => (
            <Menu.Item
              key={list.id}
              icon={<UnorderedListOutlined />}
              onClick={() => history.push(`/list/${list.id}`)}
              title={list.title}
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
      <Footer style={{ position: 'fixed', bottom: 0, padding: 0, width: 200 }}>
        <NewListButton onClick={showModal} />
        <NewListModal
          visible={isVisible}
          onCreate={handleOk}
          onCancel={handleCancel}
        />
      </Footer>
    </Layout>
  );
}

const mapToState = (state) => {
  return {
    lists: state.firestore.ordered.lists || state.list.lists,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
  };
};

export default compose(
  connect(mapToState, mapDispatchToProps),
  firestoreConnect(({ auth: { uid } }) =>
    uid ? [{ collection: 'lists', where: ['ownerId', '==', uid] }] : []
  )
)(Sidebar);
