import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip, Typography } from 'antd';
import SearchInput from './SearchInput';

export const NavHeader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: 48,
        backgroundColor: '#0078D7',
      }}
    >
      <Typography.Title
        style={{ fontSize: 16, lineHeight: '48px', color: 'white' }}
      >
        To Do
      </Typography.Title>
      <SearchInput />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
