import React from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const NewListButton = ({ onClick }) => {
  return (
    <Menu mode="inline" selectable={false} style={{ border: 0 }}>
      <Menu.Item
        icon={<PlusOutlined />}
        onClick={onClick}
        style={{ width: 200 }}
      >
        New List
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewListButton);
