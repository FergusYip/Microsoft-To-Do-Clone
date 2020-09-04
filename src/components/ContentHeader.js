import React, { useState, useEffect } from 'react';
import {
  List,
  Button,
  ConfigProvider,
  Typography,
  Space,
  Layout,
  Menu,
  Dropdown,
  PageHeader,
  Collapse,
  Modal,
  Input,
  Result,
} from 'antd';
import {
  SmileOutlined,
  EllipsisOutlined,
  EditOutlined,
  SortAscendingOutlined,
  BgColorsOutlined,
  PrinterOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { deleteList } from '../store/actions/listActions';
import { connect } from 'react-redux';
const { confirm } = Modal;

const ContentHeader = ({ title, isRenaming, onRenamed, children }) => {
  const confirmRename = (e) => {
    onRenamed(e.target.value);
  };

  return (
    <PageHeader
      title={
        isRenaming ? (
          <Input
            className="ant-typography"
            bordered={false}
            placeholder={title}
            onPressEnter={confirmRename}
            autoFocus
            style={{
              marginBottom: '0.5em',
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: 600,
              fontSize: '24px',
              lineHeight: 1.35,
              padding: 0,
            }}
          />
        ) : (
          <Typography.Title level={3}>{title}</Typography.Title>
        )
      }
      extra={children}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
