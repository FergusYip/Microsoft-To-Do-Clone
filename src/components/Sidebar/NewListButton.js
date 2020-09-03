import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Menu, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const NewListButton = ({ onClick }) => {
  return (
    <Menu mode="inline" selectable={false}>
      <Menu.Item icon={<PlusOutlined />} onClick={onClick}>
        New List
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewListButton);
