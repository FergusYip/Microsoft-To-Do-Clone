import React, { useState } from 'react';
import { Menu, Input, Typography, List, Layout } from 'antd';
import {
  CoffeeOutlined,
  StarOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createList } from '../../store/actions/listActions';

import { useHistory } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import NewListButton from './NewListButton';
import NewListModal from './NewListModal';

const { Search } = Input;

function Sidebar({ lists, createList, tasksID }) {
  const history = useHistory();

  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = (e) => {
    setIsVisible(false);
    const list = { title: e.title.trim() };
    createList(list);
  };

  const handleCancel = (e) => {
    setIsVisible(false);
  };

  return (
    <Layout
      style={{
        overflow: 0,
        height: '100vh',
      }}
    >
      <SidebarHeader style={{ flex: 0 }} />
      <div style={{ flex: 0 }}>
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
            disabled
          />
        </span>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        selectable={false}
        style={{
          border: 0,
          width: 200,
        }}
      >
        <Menu.Item
          icon={<CoffeeOutlined />}
          onClick={() => history.push('/myday')}
          title="My Day"
          style={{ width: 200 }}
        >
          My Day
        </Menu.Item>
        <Menu.Item
          icon={<StarOutlined />}
          onClick={() => history.push('/important')}
          title="Important"
          style={{ width: 200 }}
        >
          Important
        </Menu.Item>
        <Menu.Item
          icon={<CalendarOutlined />}
          onClick={() => history.push('/planned')}
          title="Planned"
          style={{ width: 200 }}
          disabled
        >
          Planned
        </Menu.Item>
        <Menu.Item
          icon={<CheckCircleOutlined />}
          onClick={() => history.push('/tasks')}
          title="Tasks"
          style={{ width: 200 }}
        >
          Tasks
        </Menu.Item>
      </Menu>
      <Menu
        mode="inline"
        selectable={false}
        style={{
          border: 0,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {lists &&
          lists
            .filter((list) => list.id !== tasksID)
            .map((list) => (
              <Menu.Item
                key={list.id}
                icon={<UnorderedListOutlined />}
                onClick={() => history.push(`/list/${list.id}`)}
                title={list.title}
                style={{ width: 200 }}
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
      <NewListButton onClick={showModal} />
      <NewListModal
        visible={isVisible}
        onCreate={handleOk}
        onCancel={handleCancel}
      />
    </Layout>
  );
}

const mapToState = (state) => {
  return {
    tasksID: state.firebase.profile.tasks,
    lists: state.firestore.ordered.lists || [],
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
  };
};

export default connect(mapToState, mapDispatchToProps)(Sidebar);
